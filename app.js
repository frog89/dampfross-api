'use strict';

const express = require('express');
const app = express();
const morganLogger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

const connectionString = 'mongodb+srv://dampfross:' + process.env.MONGO_ATLAS_PW + 
  '@cluster0-s5ujy.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(connectionString, { 
  useUnifiedTopology: true,
  useNewUrlParser: true
})
.then(() => console.log('DB Connected!'))
.catch(err => {
  console.log('Error', err.message);
});

app.use(morganLogger('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);

app.use((req, res, next) => {
  const error = new Error('not found: ' + req.path);
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;