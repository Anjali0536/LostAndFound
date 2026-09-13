const express = require('express');
const router = express.Router();
const {
  createClaim,
  getClaimsForPost,
  getMyClaims,
  getClaimById,
} = require('../controllers/claim.controller');
const { protect } = require('../middleware/auth.middleware');

// All claim routes are private — JWT required for every endpoint.

// POST /api/claims           — submit a new claim
// GET  /api/claims/my        — view all claims submitted by the logged-in user
router.route('/').post(protect, createClaim);
router.route('/my').get(protect, getMyClaims);

// GET /api/claims/post/:foundPostId — view all claims on a specific post (finder only)
router.route('/post/:foundPostId').get(protect, getClaimsForPost);

// GET /api/claims/:id        — view a single claim (claimant or finder only)
router.route('/:id').get(protect, getClaimById);

module.exports = router;
