const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const OrdersController = require('../controllers/orders');

const Order = require('../models/order');

router.get('/', checkAuth, OrdersController.getAllOrders);

router.post('/', checkAuth, OrdersController.createOrder);

router.get('/:orderId', checkAuth, OrdersController.getOrder);

router.delete('/:orderId', checkAuth, OrdersController.deleteOrder);

router.delete('/', checkAuth, OrdersController.deleteAllOrders);

module.exports = router;