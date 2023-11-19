const dbService = require("../../services/db.service");
const ObjectId = require("mongodb").ObjectId;

const COLLECTION_NAME = "chats";
async function query() {
  try {
    const collection = await dbService.getCollection(COLLECTION_NAME);
    return await collection.find().toArray();
  } catch (err) {
    console.log("Error, cannot find chats", err);
    throw err;
  }
}
async function getById(id) {
  try {
    const collection = await dbService.getCollection(COLLECTION_NAME);
    const chat = await collection.findOne({
      _id: ObjectId(id),
    });
    return chat;
  } catch (err) {
    console.log("Error, cannot find chat", err);
    throw err;
  }
}
async function add(chat) {
  chat.createdAt = Date.now();
  chat.msgs = [];
  try {
    const collection = await dbService.getCollection(COLLECTION_NAME);
    await collection.insertOne(chat);
    return chat;
  } catch (err) {
    console.log("Error, cannot create chat", err);
    throw err;
  }
}
async function addMsg(chat, msg) {
  try {
    const collection = await dbService.getCollection(COLLECTION_NAME);
    const _chat = await collection.updateOne(
      { _id: ObjectId(chat._id) },
      { $set: { ...chat, msgs: [...chat.msgs, msg] } }
    );

    return _chat;
  } catch (err) {
    console.log("Error, cannot add msg to chat", err);
    throw err;
  }
}

module.exports = {
  add,
  query,
  getById,
  addMsg,
};
