const Booking = require('../models/bookingModel');
const Event = require('../models/eventModel');

//Book  event
// /api/bookings/:eventId

const bookEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not exists' });
    }

    const alreadyBooked = await Booking.findOne({
      user: req.user._id,
      event: event._id
    });

    if (alreadyBooked) {
      return res.status(400).json({ message: 'already booking' });
    }

    const booking = await Booking.create({
      event: event._id,
      user: req.user._id
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get my bookings
// /api/bookings/my
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('event');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { bookEvent, getMyBookings };
