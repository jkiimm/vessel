'use strict';

var mongoose = require('mongoose'),
  timestamps = require('mongoose-timestamp'),
  Schema = mongoose.Schema;

var VocaSchema = new Schema({
  pair: [],
});
VocaSchema.plugin(timestamps);

module.exports = mongoose.model('Voca', VocaSchema);
