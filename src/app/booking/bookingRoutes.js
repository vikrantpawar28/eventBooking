const router = require("express").Router();
const { bookEvent, getAllBookings, getBookingById, getBookingByUserId } = require("./bookingController");
const { verifyToken, isUser, isAdmin } = require("../../shared/middleware/authMiddleware");

router.post("/:id/book", verifyToken, isUser, bookEvent);
router.get("/getAllBookings", verifyToken, isAdmin, getAllBookings);
router.get("/:id", verifyToken, getBookingById);
router.get("/getBookingByUserId/:id", verifyToken, isUser, getBookingByUserId);

module.exports = router;