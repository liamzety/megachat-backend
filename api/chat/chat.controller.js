const chatService = require("./chat.service");

async function getChats(req, res) {
  const chats = await chatService.query();
  res.send(chats);
}
async function getChat(req, res) {
  const chat = await chatService.getById(req.params.id);
  res.send(chat);
}
async function createChat(req, res) {
  const chat = await chatService.add(req.body);
  res.send(chat);
}
async function createChatMsg(req, res) {
  const chatId = req.params.id;
  const chat = await chatService.getById(chatId);
  await chatService.addMsg(chat, req.body);
  res.send(chat);
}

module.exports = {
  getChats,
  createChat,
  getChat,
  createChatMsg,
};
