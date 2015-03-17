/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var voca = require('./voca.model');

exports.register = function(socket) {
  voca.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  voca.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('voca:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('voca:remove', doc);
}
