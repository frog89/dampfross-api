'use strict';
const mongoose = require('mongoose');

const Game = require('../models/game');
const Board = require('../models/board');
const Utils = require('./utils');

const findNamesOfGames = (req, res, next, findObject) => {
  Game.find(findObject)
  .select('name')
  .exec()
  .then(docs => {
    const response = {
      games: docs.map(doc => {
        return {
          _id: doc._id,
          name: doc.name,
        }
      })
    }
    res.status(200).json(response);
  })
  .catch(err => Utils.handleError('getAllGameNames', res, err));
}

exports.getNamesOfAllGames = (req, res, next) => {
  findNamesOfGames(req, res, next, {});
}

exports.getNamesOfWaitingGames = (req, res, next) => {
  findNamesOfGames(req, res, next, {status: 'W'});
}

exports.getById = (req, res, next) => {
  const id = req.params.id;
  Game.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: 'Game not found!'
        });
      }
    })
    .catch(err => Utils.handleError('getById', res, err));
}

exports.getByName = (req, res, next) => {
  const name = req.params.name;
  Game.find({ name: name })
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: 'Game not found!'
        });
      }
    })
    .catch(err => Utils.handleError('getByName', res, err));
}

const doCreateGame = (req, res, next) => {
  let { name, password, status, players, dices, scoreTable, puppets, drawLines, board} = req.body;
  console.log('doCreateGame', req.body);
  const game = new Game({
    _id: mongoose.Types.ObjectId(),
    name, password, status, players, dices, scoreTable, puppets, drawLines, board
  });
  game.save()
    .then(result => {
      //console.log('doCreateGame', result);
      res.status(201).json(result);
    })
    .catch(err => Utils.handleError(`doCreateGame ${req.body.name}`, res, err));
}

exports.createGame = (req, res, next) => {
  console.log('createGame', req.body);
  Game.find({ name: req.body.name })
    .then(game => {
      if (game.length === 0) {
        doCreateGame(req, res, next);
      } else {
        res.status(404).json({
          message: 'Game does already exist!'
        })  
      }
    })
    .catch(err => Utils.handleError(`createGame ${req.body.name}`, res, err));
}

exports.updateGame = (req, res, next) => {
  const id = req.params.id;
  Game.findOneAndUpdate({_id: id}, req.body, {new: true, upsert: false}, function(err, doc) { 
    if (err) {
      return Utils.handleError(`updateGame ${id}`, res, err);
    }
    return res.status(201).json(doc);
  });
}

exports.deleteAllGames = (req, res, next) => {
  Game.deleteMany()
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => Utils.handleError(`deleteAllGames`, res, err));
}

// exports.deleteOrder = (req, res, next) => {
//   const id = req.params.orderId;
//   Order.remove({ _id: id }).exec()
//     .then(result => {
//       console.log('Deleted order ID ' + id);
//       res.status(200).json(result);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//     });
//   });
// }

