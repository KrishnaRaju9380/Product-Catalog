const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const { validateProduct, validateProductUpdate } = require('../validators/productValidator');

// List products with search, filter, and pagination
router.get('/', controller.list);

// Get product by ID
router.get('/:id', controller.getById);

// Create new product
router.post('/', validateProduct, controller.create);

// Update product
router.put('/:id', validateProductUpdate, controller.update);

// Delete product
router.delete('/:id', controller.remove);

module.exports = router;
