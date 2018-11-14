'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
require('dotenv').config();
const env = process.env.NODE_ENV || 'development';
const pgURI = process.env.pgURI;
const config = require('../config/config.js')[env];
const db = {};

let sequelize;
if (env === 'development') {
  sequelize = new Sequelize(pgURI, {
    dialect: 'postgres'
  });
}
else {
  sequelize = new Sequelize(config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
