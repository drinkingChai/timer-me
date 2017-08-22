const Sequelize = require('sequelize');
const conn = require('./_db');
const db = require('./timer');

const sync = ()=> {
  return conn.sync();
}

module.exports = {
  sync,
  models: {
    db
  }
};