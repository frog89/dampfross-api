const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products');

const storageStrategy = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/[\.:]/g, '_') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file:
  // cb(null, false);
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('invalid mimetype'), false);
  }
};

const upload = multer({ 
  storage: storageStrategy,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5 MByte
  },
  filefilter: fileFilter
});

router.get('/', ProductsController.getAllProducts);

router.post('/', checkAuth, upload.single('productImage'), ProductsController.createProduct);

router.get('/:productId', ProductsController.getProduct);

router.patch('/:productId', checkAuth, ProductsController.updateProduct);

router.delete('/:productId', checkAuth, ProductsController.deleteProduct);

router.delete('/', checkAuth, ProductsController.deleteAllProducts);

module.exports = router;