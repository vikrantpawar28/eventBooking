const Booking = require("./bookingModel");
const Event = require("../event/eventModel");

exports.bookEvent = async (req, res, next) => {

  try {
    const eventId = req.params.id;

    const userId = req.user.id;
    const ticketsBooked = Number(req.body.ticketsBooked || 1);
    if (ticketsBooked <= 0) { return res.status(400).json({ message: "Invalid ticket quantity" }); }
    const event = await Event.findOneAndUpdate({ _id: eventId, availableTickets: { $gte: ticketsBooked } },
      { $inc: { availableTickets: -ticketsBooked } },
      { new: true });
    if (!event) { return res.status(400).json({ message: "Tickets sold out or insufficient tickets" }); }
    const booking = await Booking.create({ user: userId, event: eventId, ticketsBooked });
    res.status(201).json({ message: "Booking successful", booking });
  } catch (error) { next(error); }
};

exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email role")
      .populate("event", "title date location");

    res.status(200).json({
      count: bookings.length,
      bookings
    });
  } catch (error) {
    next(error);
  }
};

exports.getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "name email")
      .populate("event", "title date location");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (
      booking.user._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.status(200).json({ booking });
  } catch (error) {
    next(error);
  }
};

exports.getBookingByUserId = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const bookings = await Booking.find({ user: userId })
      .populate("event", "title date location")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: bookings.length,
      bookings
    });
  } catch (error) {
    next(error);
  }
};