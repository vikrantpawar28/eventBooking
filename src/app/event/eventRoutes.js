const router = require("express").Router();
const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require("./eventController");
const { verifyToken, isAdmin } = require("../../shared/middleware/authMiddleware");

router.post("/", verifyToken, isAdmin, createEvent);
router.get("/", getAllEvents); 
router.get("/:id", getEventById);
router.put("/:id", verifyToken, isAdmin, updateEvent);
router.delete("/:id", verifyToken, isAdmin, deleteEvent);

module.exports = router;