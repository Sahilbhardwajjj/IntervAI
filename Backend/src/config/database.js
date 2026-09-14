const mongoose = require("mongoose");
const userModel = require("../models/user.model");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await mongoose.connection
      .collection("users")
      .updateMany(
        { email: { $in: [null, ""] }, emailID: { $type: "string" } },
        [{ $set: { email: "$emailID" } }],
      );

    await userModel.syncIndexes();

    console.log("Connected to Database");
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
}

module.exports = connectToDB;
