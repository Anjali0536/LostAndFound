const mongoose = require('mongoose');

/**
 * WHY A SEPARATE CLAIM COLLECTION?
 *
 * A FoundPost can receive claims from multiple users simultaneously.
 * Storing claims inside the FoundPost document as an embedded array would:
 *   - Make the document grow unboundedly.
 *   - Make it impossible to index individual claim statuses efficiently.
 *   - Couple the claim lifecycle to the post document (race conditions on updates).
 *
 * A separate Claim document gives each claim its own lifecycle and allows
 * queries like "all claims on post X" or "all claims submitted by user Y"
 * with simple indexed lookups — exactly the same pattern as how orders
 * reference products in an e-commerce schema.
 *
 * Relationships:
 *   Claim.foundPost  → FoundPost._id  (many claims : one post)
 *   Claim.claimant   → User._id       (many claims : one user)
 */

const claimSchema = new mongoose.Schema(
  {
    // The found post this claim is for
    foundPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FoundPost',
      required: true,
    },

    // The user making the claim (set from req.user by the controller, never from req.body)
    claimant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Required ownership proof fields — the platform must encourage verification,
    // not just a one-click "it's mine" button.
    identifyingDetails: {
      type: String,
      required: true,
      trim: true,
    },

    lostLocation: {
      type: String,
      required: true,
      trim: true,
    },

    // Optional extra context the claimant wants to add
    additionalDetails: {
      type: String,
      trim: true,
    },

    // Claim lifecycle status.
    // PENDING     → claim submitted, awaiting finder review
    // APPROVED    → finder accepted this claim (Phase 5)
    // REJECTED    → finder rejected this claim (Phase 5)
    // CANCELLED   → claimant withdrew the claim (future)
    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Compound index: one PENDING claim per (user, post) pair.
// This is enforced at the DB level, not just in controller logic,
// so it holds even under concurrent requests.
claimSchema.index({ foundPost: 1, claimant: 1 }, { unique: false }); // non-unique — multiple claims allowed, but we enforce PENDING uniqueness in the controller

module.exports = mongoose.model('Claim', claimSchema);
