const mongoose = require('mongoose');

const Product = require('../models/product');

exports.getAllProducts = (req, res, next) => {
  Product.find()
    .select('_id name price productImage')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            _id: doc._id,  
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
            request: {
              type: 'GET',
              url: 'http://localhost:5000/products/' + doc._id
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
    })
}

exports.createProduct = (req, res, next) => {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });
  product.
    save().
    then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Created product',
        createdProduct: {
          _id: result._id,
          name: result.name,
          price: result.price,
          productImage: result.productImage,
          request: {
            type: 'GET',
            url: 'http://localhost:5000/' + result._id
          }
        }
      });
    }).
    catch(err => {
      console.log(err);
      res.status(200).json({ 
        error: err 
      });
    });
}

exports.getProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select('_id name price productImage')
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: 'Product not found!',
          productId: id 
        });
      }
      
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: err });
    });
}

exports.updateProduct = (req, res, next) => {
  const id = req.params.productId;

  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }

  Product.update({ _id: id}, { $set: updateOps }).exec()
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

exports.deleteProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({
      _id: id
    }).exec()
    .then(result => {
      console.log('Deleted product ID ' + id);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

exports.deleteAllProducts = (req, res, next) => {
  Product.deleteMany()
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