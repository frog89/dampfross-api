'use strict';
const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

exports.getAllOrders = (req, res, next) => {
  Order.find()
  .select('_id product quantity')
  .populate('product')
  .exec()
  .then(docs => {
    const response = {
      count: docs.length,
      orders: docs.map(doc => {
        return {
          _id: doc._id,  
          product: doc.product,
          quantity: doc.quantity,
          request: {
            type: 'GET',
            url: 'http://localhost:5000/orders/' + doc._id
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

const saveOrder = (req, res, next) => {
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    product: req.body.product,
  });
  order.save()
    .then(result => {
      //console.log(result);
      res.status(201).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.createOrder = (req, res, next) => {
  Product.findById(req.body.product)
    .then(product => {
      if (product != null) {
        saveOrder(req, res, next);
      } else {
        res.status(404).json({
          message: 'Product not found'
        })  
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'Invalid product',
        error: err
      })
    });  
}

exports.getOrder = (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .exec()
    .then(doc => {
      //console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: 'Order not found!',
          orderId: id 
        });
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err });
    });
}

exports.deleteOrder = (req, res, next) => {
  const id = req.params.orderId;
  Order.remove({ _id: id }).exec()
    .then(result => {
      console.log('Deleted order ID ' + id);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
    });
  });
}

exports.deleteAllOrders = (req, res, next) => {
  Order.deleteMany()
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}