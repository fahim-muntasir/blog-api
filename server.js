require("dotenv").config();
const http = require("http");

const app = require("./app");
const { dbConnection } = require("./src/db/dbConnection");

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

// server will run after connect db
dbConnection()
  .then(() => {
    server.listen(PORT, () => console.log(`Server is running on ${PORT} port`));
  })
  .catch((err) => console.log(err));
