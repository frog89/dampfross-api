const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const BoardController = require('../controllers/boards');

router.get('/', BoardController.getAllBoardNames);

router.get('/:boardName', BoardController.getBoard);

router.post('/', BoardController.createBoard);

router.patch('/:boardName', BoardController.updateBoard);

// router.delete('/:productId', checkAuth, ProductsController.deleteProduct);

// router.delete('/', checkAuth, ProductsController.deleteAllProducts);

module.exports = router;