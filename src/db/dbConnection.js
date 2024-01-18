const mongoose = require("mongoose");

const dbConnection = () => {
  const options = {
    autoIndex: false,
    dbName: process.env.DB_NAME,
    // serverSelectionTimeoutMS: 5000,
  };

  return mongoose.connect(process.env.DB_URL, options);
};

mongoose.connection.on("connected", () =>
  console.log("Database connection successful")
);

module.exports = {
  dbConnection,
};
