const MongoClient = require("mongodb").MongoClient;

// Database Name
var dbConn = null;

async function connect() {
  const DATABASE_URL = process.env.DATABASE_URL;
  const DATABASE_NAME = process.env.DATABASE_NAME;
  if (dbConn) return dbConn;
  try {
    const client = await MongoClient.connect(DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = client.db(DATABASE_NAME);
    dbConn = db;
    return db;
  } catch (err) {
    console.log("Cannot Connect to DB", err);
    throw err;
  }
}

async function getCollection(collectionName) {
  const db = await connect();
  return db.collection(collectionName);
}

module.exports = {
  getCollection,
};
