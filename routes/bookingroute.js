const express = require('express');
const router = express.Router();
const { bookEvent, getMyBookings } = require('../controllers/bookingController');
const protect = require('../middleware/authMiddleware');

router.route('/:eventId').post(protect, bookEvent);

router.route('/my').get(protect, getMyBookings);

module.exports = router;
