require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const { connect, sequelize } = require('./config/db');
const Product = require('./models/product');
const Category = require('./models/category');
const productsRoute = require('./routes/products');
const categoriesRoute = require('./routes/categories');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 4000;

// Setup model associations
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Product, { foreignKey: 'categoryId' });

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  message: 'Too many requests from this IP, please try again later'
});
app.use(limiter);

// Input sanitization middleware
app.use((req, res, next) => {
  // Sanitize query strings
  if (req.query) {
    Object.keys(req.query).forEach(key => {
      if (typeof req.query[key] === 'string') {
        req.query[key] = req.query[key].replace(/[<>\"']/g, '');
      }
    });
  }
  next();
});

// Routes
app.use('/api/products', productsRoute);
app.use('/api/categories', categoriesRoute);

app.get('/health', (req, res) => res.json({ ok: true, timestamp: new Date() }));

// Error handling
app.use(errorHandler);

async function start() {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
