const mongoose = require('mongoose');

//1- create schema 
const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: [true, 'name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6,'too short'],
    select: false, // exclude from query results by default
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    }
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
    });
      //2- create model
    const UserModel = mongoose.model("User", userSchema);

    module.exports = UserModel; 