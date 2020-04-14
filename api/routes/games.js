const express = require('express');
const router = express.Router();
const GameController = require('../controllers/games');

router.get('/', GameController.getAllGameNames);

router.get('/:id', GameController.getById);

router.get('/getByName/:name', GameController.getByName);

router.post('/', GameController.createGame);

router.patch('/:gameName', GameController.updateGame);

// router.delete('/:orderId', checkAuth, OrdersController.deleteOrder);

// router.delete('/', checkAuth, OrdersController.deleteAllOrders);

module.exports = router;