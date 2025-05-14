const express = require('express');
const router = express.Router();
const { createEvent, getEvents } = require('../controllers/eventController');
const protect = require('../middleware/authMiddleware');

router.route('/').get(getEvents);

router.route('/').post(protect, createEvent);

module.exports = router;
