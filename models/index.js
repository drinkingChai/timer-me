const Sequelize = require('sequelize');
const conn = require('./_db');
const Timer = require('./timer');

const sync = ()=> {
  return conn.sync();
}

module.exports = {
  sync,
  models: {
    Timer
  }
};
