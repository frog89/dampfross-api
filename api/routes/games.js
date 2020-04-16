const express = require('express');
const router = express.Router();
const GameController = require('../controllers/games');

router.get('/', GameController.getNamesOfAllGames);

router.get('/waiting', GameController.getNamesOfWaitingGames);

router.get('/:id', GameController.getById);

router.get('/getByName/:name', GameController.getByName);

router.post('/', GameController.createGame);

router.patch('/:id', GameController.updateGame);

router.delete('/', GameController.deleteAllGames);

// router.delete('/:orderId', checkAuth, OrdersController.deleteOrder);


module.exports = router;