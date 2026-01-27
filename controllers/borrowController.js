// controllers/borrowController.js
const Book = require('../models/Books');
const BorrowLog = require('../models/BorrowLog');

// Borrow a book
const borrowBook = async (req, res) => {
  try {
    const { bookId, latitude, longitude } = req.body;
    const userId = req.userId;
    
    // Validation
    if (!bookId || latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        success: false,
        error: 'bookId, latitude, and longitude are required'
      });
    }
    
    // Check if book exists and has stock
    const book = await Book.findByPk(bookId);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }
    
    if (book.stock <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Book is out of stock'
      });
    }
    
    // Create borrow log
    const borrowLog = await BorrowLog.create({
      userId,
      bookId,
      latitude,
      longitude
    });
    
    // Decrease book stock
    await book.decrement('stock', { by: 1 });
    
    res.status(201).json({
      success: true,
      data: {
        borrowLog,
        remainingStock: book.stock - 1
      },
      message: 'Book borrowed successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = { borrowBook };