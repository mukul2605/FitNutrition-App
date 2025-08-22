const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   PUT /api/profile
// @desc    Update user profile
// @access  Private
router.put('/', protect, [
  body('age').optional().isInt({ min: 1, max: 120 }).withMessage('Age must be between 1 and 120'),
  body('weight').optional().isFloat({ min: 1 }).withMessage('Weight must be a positive number'),
  body('height').optional().isFloat({ min: 1 }).withMessage('Height must be a positive number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, age, gender, weight, height, activityLevel, goal } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, age, gender, weight, height, activityLevel, goal },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;