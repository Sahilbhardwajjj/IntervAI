const mongoose = require("mongoose");
const userModel = require("../models/user.model");

let connectionPromise;

async function connectToDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not configured");
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URI)
      .then(async () => {
        await mongoose.connection
          .collection("users")
          .updateMany(
            { email: { $in: [null, ""] }, emailID: { $type: "string" } },
            [{ $set: { email: "$emailID" } }],
          );

        await userModel.syncIndexes();
        console.log("Connected to Database");
      })
      .catch((err) => {
        connectionPromise = undefined;
        console.error("Database connection failed:", err);
        throw err;
      });
  }

  await connectionPromise;
}

module.exports = connectToDB;
