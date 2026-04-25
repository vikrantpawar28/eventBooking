const Event = require("./eventModel");
exports.createEvent = async (req, res, next) => {
    try {
        const { title, description, date, location, availableTickets } = req.body;
        const event = await Event.create({ title, description, date, location, availableTickets });
        res.status(201).json({ message: "Event created successfully", event });
    }
    catch (error) { next(error); }
};



exports.getAllEvents = async (req, res, next) => {
    try {
        const events = await Event.find().sort({ createdAt: -1 });
        res.status(200).json({ count: events.length, events });
    }
    catch (error) { next(error); }
};

exports.getEventById = async (req, res, next) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) { return res.status(404).json({ message: "Event not found" }); }
        res.status(200).json(event);
    } catch (error) { next(error); }
};



exports.updateEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }

        );
        if (!event) { return res.status(404).json({ message: "Event not found" }); }
        res.status(200).json({ message: "Event updated successfully", event });
    }
    catch (error) { next(error); }
};



exports.deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (!event) { return res.status(404).json({ message: "Event not found" }); }
        res.status(200).json({ message: "Event deleted successfully" });
    }
    catch (error) { next(error); }
};