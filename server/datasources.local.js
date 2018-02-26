
var config = require('./config.local.js')

module.exports = {
  mysqlDs: {
    connector: config.db_connector,
    hostname: config.db_host,
    port: config.db_port,
    user: config.db_user,
    password: config.db_password,
    database: config.db_database
  }
};