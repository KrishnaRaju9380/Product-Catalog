const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryController');
const { validateCategory } = require('../validators/categoryValidator');

// List all categories
router.get('/', controller.list);

// Get category by ID
router.get('/:id', controller.getById);

// Create new category
router.post('/', validateCategory, controller.create);

// Update category
router.put('/:id', validateCategory, controller.update);

// Delete category
router.delete('/:id', controller.remove);

module.exports = router;
