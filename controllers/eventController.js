const Event = require('../models/eventModel');

// create event
// POST /api/events

const createEvent = async (req, res) => {
  try {
    const { title, date, location } = req.body;

    if (!title || !date || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const event = new Event({
      title,
      date,
      location,
      createdBy: req.user._id
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

//show all events
//GET /api/events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createEvent, getEvents };