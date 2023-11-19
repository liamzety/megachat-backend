const express = require("express");
const {
  getChats,
  getChat,
  createChat,
  createChatMsg,
} = require("./chat.controller");
const router = express.Router();

router.get("/", getChats);
router.get("/:id", getChat);
router.post("/", createChat);
router.post("/:id", createChatMsg);

module.exports = router;
