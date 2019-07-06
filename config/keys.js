require('dotenv').config();

dbPassword =
  process.env.DB_USER +
  encodeURIComponent(process.env.DB_PASSWORD) +
  process.env.DB_NAME;

module.exports = {
  mongoURI: dbPassword
};
