import mongoose = require("mongoose");

// TODO: env var
mongoose.connect("mongodb://localhost:27017/tvmazeapi");
mongoose.Promise = global.Promise;
mongoose.connection.on("connected", () => {
  console.log("Mongoose default connection open");
});

export default mongoose;
