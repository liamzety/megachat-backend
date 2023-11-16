const express = require("express");
const { getRooms, getRoom, createRoom } = require("./room.controller");
const router = express.Router();

router.get("/", getRooms);
router.get("/:id", getRoom);
router.post("/", createRoom);

module.exports = router;
