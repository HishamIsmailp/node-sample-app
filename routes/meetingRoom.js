const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/auth.js")
const { getAllMeetingRooms, createMeetingRoom, updateMeetingRoom, deleteMeetingRoom, getMeetingRoom } = require("../controllers/meetingRoom")

router.get("/", verifyToken, getAllMeetingRooms);

router.post("/", verifyToken, createMeetingRoom);

router.put("/:id", verifyToken, updateMeetingRoom);

router.delete("/:id", verifyToken, deleteMeetingRoom);

router.get("/:id", verifyToken, getMeetingRoom);

module.exports = router;