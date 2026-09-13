const Claim = require('../models/Claim');
const FoundPost = require('../models/FoundPost');

// @desc    Submit a claim for a found post
// @route   POST /api/claims
// @access  Private (JWT required)
const createClaim = async (req, res) => {
  try {
    const { foundPostId, identifyingDetails, lostLocation, additionalDetails } = req.body;

    // --- 1. Validate required fields ---
    if (!foundPostId || !identifyingDetails || !lostLocation) {
      return res.status(400).json({
        success: false,
        message: 'foundPostId, identifyingDetails, and lostLocation are required.',
      });
    }

    // --- 2. Verify the FoundPost exists ---
    const foundPost = await FoundPost.findById(foundPostId);
    if (!foundPost) {
      return res.status(404).json({
        success: false,
        message: 'Found post not found.',
      });
    }

    // --- 3. Only ACTIVE posts can be claimed ---
    if (foundPost.status !== 'ACTIVE') {
      return res.status(400).json({
        success: false,
        message: `This post is ${foundPost.status.toLowerCase()} and can no longer be claimed.`,
      });
    }

    // --- 4. A user cannot claim their own found post ---
    if (foundPost.postedBy.toString() === req.user._id.toString()) {
      return res.status(400).json({
        success: false,
        message: 'You cannot claim an item you reported yourself.',
      });
    }

    // --- 5. Prevent duplicate PENDING claims from the same user for the same post ---
    const existingPendingClaim = await Claim.findOne({
      foundPost: foundPostId,
      claimant: req.user._id,
      status: 'PENDING',
    });

    if (existingPendingClaim) {
      return res.status(409).json({
        success: false,
        message: 'You already have a pending claim for this item. Wait for a response before submitting another.',
      });
    }

    // --- 6. Create the claim ---
    // Note: claimant is taken from req.user (set by auth middleware), never from req.body.
    // This prevents users from submitting claims on behalf of others.
    const claim = await Claim.create({
      foundPost: foundPostId,
      claimant: req.user._id,
      identifyingDetails,
      lostLocation,
      additionalDetails,
    });

    // Populate for the response so the client gets readable data immediately
    await claim.populate([
      { path: 'foundPost', select: 'title location status' },
      { path: 'claimant', select: 'name collegeEmail' },
    ]);

    res.status(201).json({
      success: true,
      data: claim,
    });
  } catch (error) {
    // Handle malformed ObjectId (e.g. foundPostId is not a valid Mongo ID)
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid post ID format.' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all claims for a specific found post (finder view)
// @route   GET /api/claims/post/:foundPostId
// @access  Private (JWT required — only the post's owner should call this in practice)
const getClaimsForPost = async (req, res) => {
  try {
    const foundPost = await FoundPost.findById(req.params.foundPostId);

    if (!foundPost) {
      return res.status(404).json({ success: false, message: 'Found post not found.' });
    }

    // Only the finder (poster) may view all claims on their post
    if (foundPost.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorised. Only the finder can view all claims on this post.',
      });
    }

    const claims = await Claim.find({ foundPost: req.params.foundPostId })
      .populate('claimant', 'name collegeEmail enrollmentNumber')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: claims.length,
      data: claims,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid post ID format.' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all claims submitted by the logged-in user
// @route   GET /api/claims/my
// @access  Private
const getMyClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ claimant: req.user._id })
      .populate('foundPost', 'title location status image category')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: claims.length,
      data: claims,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get a single claim by its own ID
// @route   GET /api/claims/:id
// @access  Private (claimant or finder only)
const getClaimById = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id)
      .populate('foundPost', 'title location status postedBy image category')
      .populate('claimant', 'name collegeEmail enrollmentNumber');

    if (!claim) {
      return res.status(404).json({ success: false, message: 'Claim not found.' });
    }

    // Authorisation: only the claimant or the finder of the related post may view this claim
    const isClaimant = claim.claimant._id.toString() === req.user._id.toString();
    const isFinder   = claim.foundPost.postedBy.toString() === req.user._id.toString();

    if (!isClaimant && !isFinder) {
      return res.status(403).json({
        success: false,
        message: 'Not authorised to view this claim.',
      });
    }

    res.status(200).json({
      success: true,
      data: claim,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ success: false, message: 'Invalid claim ID format.' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createClaim,
  getClaimsForPost,
  getMyClaims,
  getClaimById,
};
