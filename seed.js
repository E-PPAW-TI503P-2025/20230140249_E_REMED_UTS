// seed.js - Script untuk seed data awal
const sequelize = require('./config/database');
const Book = require('./models/Books');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    
    // Seed sample books
    await Book.bulkCreate([
      {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        stock: 5
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        stock: 3
      },
      {
        title: '1984',
        author: 'George Orwell',
        stock: 7
      },
      {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        stock: 4
      },
      {
        title: 'The Catcher in the Rye',
        author: 'J.D. Salinger',
        stock: 2
      }
    ]);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();