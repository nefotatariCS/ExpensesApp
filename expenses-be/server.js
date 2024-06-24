const http = require("http");
const app = require("./app");
const port = process.env.PORT || 3000;

const server = http.createServer(app);

// Database
const db = require("./app/models");

//Create Database
db.sequelize.sync().then(() => {
  console.log("Database synced.");
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
