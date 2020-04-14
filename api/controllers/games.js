'use strict';
const mongoose = require('mongoose');

const Game = require('../models/game');
const Utils = require('./utils');

exports.getAllGameNames = (req, res, next) => {
  Game.find()
  .select('name')
  .exec()
  .then(docs => {
    const response = {
      games: docs.map(doc => {
        return doc.name;
      })
    }
    res.status(200).json(response);
  })
  .catch(err => Utils.handleError('getAllGameNames', res, err));
}

exports.getGame = (req, res, next) => {
  const gameName = req.params.gameName;
  Game.find({ name: gameName })
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
    .catch(err => Utils.handleError('getGame', res, err));
}

const doCreateGame = (req, res, next) => {
  let { name, password, players, dices, scoreTable, puppets, drawLines} = req.body;
  const game = new Game({
    _id: mongoose.Types.ObjectId(),
    name, password, players, dices, scoreTable, puppets, drawLines
  });
  game.save()
    .then(result => {
      //console.log('doCreateGame', result);
      res.status(201).json(result);
    })
    .catch(err => Utils.handleError(`doCreateGame ${req.body.name}`, res, err));
}

exports.createGame = (req, res, next) => {
  Game.find({ name: req.body.name })
    .then(game => {
      if (game.length === 0) {
        doCreateGame(req, res, next);
      } else {
        res.status(404).json({
          message: 'Game already exists'
        })  
      }
    })
    .catch(err => Utils.handleError(`createGame ${req.body.name}`, res, err));
}

exports.updateGame = (req, res, next) => {
  const gameName = req.params.gameName;
  Game.findOneAndUpdate({name: gameName}, req.body, {new: true, upsert: false}, function(err, doc) { 
    if (err) {
      return Utils.handleError(`updateGame ${gameName}`, res, err);
    }
    return res.status(201).json(`updateGame ${gameName}: ${doc}`);
  });
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

// exports.deleteAllOrders = (req, res, next) => {
//   Order.deleteMany()
//     .exec()
//     .then(result => {
//       console.log(result);
//       res.status(200).json(result);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// }