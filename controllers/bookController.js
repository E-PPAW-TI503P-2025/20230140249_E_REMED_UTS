// controllers/bookController.js
const Book = require('../models/Book');

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json({
      success: true,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get book by ID
const getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }
    
    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create new book (Admin only)
const createBook = async (req, res) => {
  try {
    const { title, author, stock } = req.body;
    
    // Validation
    if (!title || !author) {
      return res.status(400).json({
        success: false,
        error: 'Title and author are required'
      });
    }
    
    const book = await Book.create({
      title,
      author,
      stock: stock || 0
    });
    
    res.status(201).json({
      success: true,
      data: book,
      message: 'Book created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update book (Admin only)
const updateBook = async (req, res) => {
  try {
    const { title, author, stock } = req.body;
    const book = await Book.findByPk(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }
    
    await book.update({
      title: title || book.title,
      author: author || book.author,
      stock: stock !== undefined ? stock : book.stock
    });
    
    res.json({
      success: true,
      data: book,
      message: 'Book updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Delete book (Admin only)
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    
    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }
    
    await book.destroy();
    
    res.json({
      success: true,
      message: 'Book deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};