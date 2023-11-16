const roomService = require("./room.service");

async function getRooms(req, res) {
  const rooms = await roomService.query();
  res.send(rooms);
}
async function getRoom(req, res) {
  const room = await roomService.getById(req.params.id);
  res.send(room);
}
async function createRoom(req, res) {
  const room = await roomService.add(req.body);
  res.send(room);
}

module.exports = {
  getRooms,
  createRoom,
  getRoom,
};
