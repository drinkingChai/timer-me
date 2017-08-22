const Sequelize = require('sequelize');
const conn = require('./_db');
const Timer = require('./timer');

const sync = ()=> {
  return conn.sync({ force: true });
}

module.exports = {
  sync,
  models: {
    Timer
  }
};