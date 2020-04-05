const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utils = require('./utils');

const User = require('../models/user');

const saveUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return Utils.handleError(err);
    }
    const user = new User({
      _id: mongoose.Types.ObjectId(),
      email: req.body.email,
      password: hash      
    });
    console.log(user);
    user.save()
      .then(result => {
        res.status(201).json({
          message: 'User created!',
          _id: user._id,
          email: user.email
        });
      })
      .catch(err => Utils.handleError(err));
  });
}

exports.login = (req, res, next) => {
  User.find({email: req.body.email}).exec()
    .then(users => {
      if (users.length > 1) {
        return Utils.handleError(res, `More than one user found with email ${req.body.email}`);
      } else if (users.length < 1) {
        return Utils.handleStatusError(res, 401, 'Auth failed', 'unknown email');
      } else if (!users[0].isAuthorized) {
        return Utils.handleStatusError(res, 401, 'Auth failed', 'not authorized');
      }
      bcrypt.compare(req.body.password, users[0].password, (err, result) => {
        if (err) {
          console.log('err', err);
          return Utils.handleStatusError(res, 401, 'Auth failed', err);
        }
        if (result) {
          const jwtToken = jwt.sign({
              email: users[0].email,
              userId: users[0]._id
            }, 
            process.env.JWT_KEY, 
            {
              expiresIn: "1h"
            });
          return res.status(200).json({
            message: 'auth successful',
            token: jwtToken
          });
        }
        Utils.handleStatusError(res, 401, 'Auth failed', 'invalid login');
      });
    })
    .catch(err => Utils.handleError(res, err));  
}

exports.signUp = (req, res, next) => {
  User.find({email: req.body.email}).exec()
    .then(users => {
      if (users.length >= 1) {
        return res.status(409).json({
          message: 'Mail exists already. User has not been created!'
        });
      }
      saveUser(req, res, next);
    });
}

exports.getAllUsers = (req, res, next) => {
  User.find()
  .select('_id email isAuthorized')
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      users: docs.map(doc => {
        return {
          _id: doc._id,  
          email: doc.email,
          isAuthorized: doc.isAuthorized,
          request: {
            type: 'GET',
            url: 'http://localhost:5000/user/' + doc._id
          }
        }
      })
    }
    res.status(200).json(response);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}

exports.getUser = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        return res.status(200).json({
          _id : doc._id,
          email: doc.email,
          isAuthorized: doc.isAuthorized
        });
      } else {
        return res.status(404).json({
          message: 'User not found!'
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err });
    });
}

exports.deleteUser = (req, res, next) => {
  const id = req.params.userId;
  User.remove({ _id: id}).exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
