/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /vocas              ->  index
 * POST    /vocas              ->  create
 * GET     /vocas/:id          ->  show
 * PUT     /vocas/:id          ->  update
 * DELETE  /vocas/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Voca = require('./voca.model');

// Get list of vocas
exports.index = function(req, res) {
//  Voca.find(function (err, vocas) {
//    if(err) { return handleError(res, err); }
//    return res.json(200, vocas);
//  });
  Voca.find().skip(req.query.begin).limit(req.query.limit).exec(function(err, vocas) {
    console.log(req.query, vocas);
    if(err) { return handleError(res, err); }
    return res.json(200, vocas);
  });
};

// Get a single voca
exports.show = function(req, res) {
  Voca.findById(req.params.id, function (err, voca) {
    if(err) { return handleError(res, err); }
    if(!voca) { return res.send(404); }
    return res.json(voca);
  });
};

// Creates a new voca in the DB.
exports.create = function(req, res) {
  Voca.create(req.body, function(err, voca) {
    if(err) { return handleError(res, err); }
    return res.json(201, voca);
  });
};

// Updates an existing voca in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Voca.findById(req.params.id, function (err, voca) {
    if (err) { return handleError(res, err); }
    if(!voca) { return res.send(404); }
    var updated = _.merge(voca, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, voca);
    });
  });
};

// Deletes a voca from the DB.
exports.destroy = function(req, res) {
  Voca.findById(req.params.id, function (err, voca) {
    if(err) { return handleError(res, err); }
    if(!voca) { return res.send(404); }
    voca.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
