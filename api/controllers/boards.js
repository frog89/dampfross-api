'use strict';
const mongoose = require('mongoose');

const Board = require('../models/board');
const Utils = require('./utils');

exports.getAllBoardNames = (req, res, next) => {
  Board.find()
  .select('name')
  .exec()
  .then(docs => {
    const response = {
      boards: docs.map(doc => {
        return {
          _id: doc._id,
          name: doc.name,
        }
      })
    }
    res.status(200).json(response);
  })
  .catch(err => Utils.handleError('getAllBoardNames', res, err));
}

exports.getById = (req, res, next) => {
  const id = req.params.id;
  Board.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: 'Board not found!',
          productId: id 
        });
      }
    })
    .catch(err => Utils.handleError('getById', res, err));
}

exports.getByName = (req, res, next) => {
  const name = req.params.name;
  Board.find({ name: name })
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: 'Board not found!',
          productId: id 
        });
      }
    })
    .catch(err => Utils.handleError('getByName', res, err));
}

const doCreateBoard = (req, res, next) => {
  let { name, width, height, combs, borders, rivers, textObjects, townTexts} = req.body;
    const board = new Board({
      _id: mongoose.Types.ObjectId(),
      name, width, height, combs, borders, rivers, textObjects, townTexts
    });
    board.save()
      .then(result => {
        console.log('doCreateBoard', result);
        res.status(201).json(result);
      })
      .catch(err => Utils.handleError(`doCreateBoard ${name}`, res, err));
  }
    
  exports.createBoard = (req, res, next) => {
    Board.find({ name: req.body.name })
      .then(board => {
        if (board.length === 0) {
          doCreateBoard(req, res, next);
        } else {
          res.status(404).json({
            message: 'Board already exists'
          })  
        }
      })
      .catch(err => Utils.handleError(`createBoard ${req.body.name}`, res, err));
  }

exports.updateBoard = (req, res, next) => {
  const boardName = req.params.boardName;
  Board.findOneAndUpdate({name: boardName}, req.body, {new: true, upsert: false}, function(err, doc) { 
    if (err) {
      return Utils.handleError(`updateBoard ${boardName}`, res, err);
    }
    return res.status(201).json(`updateBoard ${boardName}: ${doc}`);
  });
}

// exports.updateProduct = (req, res, next) => {
//   const id = req.params.productId;

//   const updateOps = {};
//   for (const ops of req.body) {
//     updateOps[ops.propName] = ops.value;
//   }

//   Product.update({ _id: id}, { $set: updateOps }).exec()
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

// exports.deleteProduct = (req, res, next) => {
//   const id = req.params.productId;
//   Product.remove({
//       _id: id
//     }).exec()
//     .then(result => {
//       console.log('Deleted product ID ' + id);
//       res.status(200).json(result);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// }

// exports.deleteAllProducts = (req, res, next) => {
//   Product.deleteMany()
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