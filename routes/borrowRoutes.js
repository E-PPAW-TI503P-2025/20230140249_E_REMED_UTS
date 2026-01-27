// routes/borrowRoutes.js
const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const { checkRole, checkUserId } = require('../middleware/authMiddleware');

// User routes - require both user role and user ID
router.post('/', 
  checkRole('user'),
  checkUserId,
  borrowController.borrowBook
);

module.exports = router;