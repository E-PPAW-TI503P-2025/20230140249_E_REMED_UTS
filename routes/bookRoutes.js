// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { checkRole } = require('../middleware/authMiddleware');

// Public routes
router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

// Admin routes
router.post('/', checkRole('admin'), bookController.createBook);
router.put('/:id', checkRole('admin'), bookController.updateBook);
router.delete('/:id', checkRole('admin'), bookController.deleteBook);

module.exports = router;