'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var VocaSchema = new Schema({
  pair: []
});

module.exports = mongoose.model('Voca', VocaSchema);
