const dbService = require("../../services/db.service");
const ObjectId = require("mongodb").ObjectId;

const COLLECTION_NAME = "rooms";
async function query() {
  try {
    const collection = await dbService.getCollection(COLLECTION_NAME);
    return await collection.find().toArray();
  } catch (err) {
    console.log("Error, cannot find rooms", err);
    throw err;
  }
}
async function getById(id) {
  try {
    const collection = await dbService.getCollection(COLLECTION_NAME);
    const room = await collection.findOne({
      _id: ObjectId(id),
    });
    return room;
  } catch (err) {
    console.log("Error, cannot find room", err);
    throw err;
  }
}
async function add(user) {
  user.createdAt = Date.now();
  try {
    const collection = await dbService.getCollection(COLLECTION_NAME);
    await collection.insertOne(user);
    return user;
  } catch (err) {
    console.log("Error, cannot create user", err);
    throw err;
  }
}

module.exports = {
  add,
  query,
  getById,
};
