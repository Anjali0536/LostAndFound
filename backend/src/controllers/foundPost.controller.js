const FoundPost = require('../models/FoundPost');

// @desc    Create a found post
// @route   POST /api/found-posts
// @access  Private
const createFoundPost = async (req, res) => {
  try {
    const { title, description, category, location, image, dateFound } = req.body;

    if (!title || !category || !location || !image) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const foundPost = await FoundPost.create({
      title,
      description,
      category,
      location,
      image,
      dateFound: dateFound || Date.now(),
      postedBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: foundPost,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all found posts
// @route   GET /api/found-posts
// @access  Public
const getFoundPosts = async (req, res) => {
  try {
    const foundPosts = await FoundPost.find({ status: 'ACTIVE' })
      .populate('postedBy', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: foundPosts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get a single found post
// @route   GET /api/found-posts/:id
// @access  Public
const getFoundPostById = async (req, res) => {
  try {
    const foundPost = await FoundPost.findById(req.params.id)
      .populate('postedBy', 'name');

    if (!foundPost) {
      return res.status(404).json({ success: false, message: 'Found post not found' });
    }

    res.status(200).json({
      success: true,
      data: foundPost,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createFoundPost,
  getFoundPosts,
  getFoundPostById,
};
