const mongoose = require("mongoose");

mongoose.set('strictQuery', false);

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb+srv://GanDev:IronHack@cluster0.i9d9zql.mongodb.net/";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const databaseName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${databaseName}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
