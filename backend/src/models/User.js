const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    collegeEmail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    enrollmentNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    collegeId: {
      type: String,
      trim: true,
    },
    rollNumber: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    profileImage: {
      type: String,
      default: '',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent returning passwordHash by default when returning user doc
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.passwordHash;
  return user;
};

module.exports = mongoose.model('User', userSchema);
