const dotenv = require("dotenv");
dotenv.config();

const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const config = {
  server: {
    port: SERVER_PORT,
  },
};

module.exports = config;
