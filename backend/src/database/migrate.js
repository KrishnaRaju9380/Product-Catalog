require('dotenv').config();
const { sequelize } = require('../config/db');
const Product = require('../models/product');
const Category = require('../models/category');

const sampleCategories = [
  { name: 'Electronics', slug: 'electronics', description: 'Electronic devices and accessories' },
  { name: 'Clothing', slug: 'clothing', description: 'Apparel and fashion items' },
  { name: 'Books', slug: 'books', description: 'Books and reading materials' },
  { name: 'Home & Garden', slug: 'home-garden', description: 'Home and garden products' },
  { name: 'Sports', slug: 'sports', description: 'Sports equipment and gear' }
];

const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with active noise cancellation',
    price: 129.99,
    categoryId: 1,
    tags: ['audio', 'wireless', 'premium'],
    inStock: true,
    sku: 'WH-1001',
    quantity: 50
  },
  {
    name: 'USB-C Cable',
    description: 'Durable USB-C charging cable for all your devices',
    price: 12.99,
    categoryId: 1,
    tags: ['cable', 'charging'],
    inStock: true,
    sku: 'UC-1002',
    quantity: 200
  },
  {
    name: 'Cotton T-Shirt',
    description: 'Comfortable 100% cotton t-shirt available in multiple colors',
    price: 24.99,
    categoryId: 2,
    tags: ['casual', 'cotton'],
    inStock: true,
    sku: 'CT-2001',
    quantity: 150
  },
  {
    name: 'JavaScript Guide',
    description: 'Comprehensive guide to modern JavaScript programming',
    price: 39.99,
    categoryId: 3,
    tags: ['programming', 'javascript'],
    inStock: true,
    sku: 'BK-3001',
    quantity: 30
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat perfect for home workouts',
    price: 34.99,
    categoryId: 5,
    tags: ['fitness', 'yoga'],
    inStock: true,
    sku: 'YM-5001',
    quantity: 45
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe',
    price: 89.99,
    categoryId: 4,
    tags: ['kitchen', 'coffee'],
    inStock: true,
    sku: 'CM-4001',
    quantity: 25
  },
  {
    name: 'Desk Lamp',
    description: 'LED desk lamp with adjustable brightness',
    price: 44.99,
    categoryId: 4,
    tags: ['lighting', 'desk'],
    inStock: true,
    sku: 'DL-4002',
    quantity: 60
  },
  {
    name: 'Running Shoes',
    description: 'Professional running shoes with cushioned sole',
    price: 119.99,
    categoryId: 5,
    tags: ['sports', 'running'],
    inStock: false,
    sku: 'RS-5002',
    quantity: 0
  },
  {
    name: 'Novel Collection',
    description: 'Set of 3 bestselling novels',
    price: 45.99,
    categoryId: 3,
    tags: ['books', 'fiction'],
    inStock: true,
    sku: 'NC-3002',
    quantity: 20
  },
  {
    name: 'Webcam HD',
    description: '1080p HD webcam for video conferencing',
    price: 59.99,
    categoryId: 1,
    tags: ['video', 'webcam'],
    inStock: true,
    sku: 'WC-1003',
    quantity: 40
  }
];

async function migrateDatabase() {
  try {
    console.log('\n🔄 Starting database migration...');
    console.log('📊 Database:', process.env.DB_NAME || 'product_catalog');
    console.log('🖥️  Host:', process.env.DB_HOST || 'localhost\n');

    // Setup associations
    Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'Category' });
    Category.hasMany(Product, { foreignKey: 'categoryId', as: 'products' });

    // Sync database
    console.log('⏳ Syncing database tables...');
    await sequelize.sync({ alter: true, logging: false });
    console.log('✅ Database tables synced');

    // Check if data already exists
    const categoriesCount = await Category.count();
    if (categoriesCount > 0) {
      console.log(`\n⚠️  Database already has ${categoriesCount} categories`);
      console.log('🔄 Clearing existing data and re-seeding...\n');
      await sequelize.truncate({ cascade: true, logging: false });
    }

    // Seed categories
    console.log('📝 Seeding categories...');
    const categories = await Category.bulkCreate(sampleCategories);
    console.log(`✅ Created ${categories.length} categories:\n   ${categories.map(c => c.name).join(', ')}`);

    // Seed products with correct category IDs
    console.log('\n📝 Seeding products...');
    await Product.bulkCreate(sampleProducts);
    console.log(`✅ Created ${sampleProducts.length} products`);

    // Verify data
    const productCount = await Product.count();
    const catCount = await Category.count();
    console.log(`\n✨ Database verification:`);
    console.log(`   ✓ ${catCount} categories`);
    console.log(`   ✓ ${productCount} products`);
    
    console.log('\n✨ Database migration completed successfully!');
    console.log('🚀 You can now start the server with: npm run dev\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Database migration failed!');
    console.error('Error:', error.message);
    
    if (error.original) {
      console.error('Details:', error.original.message);
      if (error.original.errno) {
        if (error.original.errno === 'PROTOCOL_CONNECTION_LOST') {
          console.error('\n💡 MySQL connection error. Make sure:');
          console.error('   1. MySQL server is running');
          console.error('   2. DB_HOST, DB_USER, DB_PASSWORD are correct in .env');
        } else if (error.original.errno === 1045) {
          console.error('\n💡 Authentication error. Check DB_USER and DB_PASSWORD in .env');
        }
      }
    }
    
    console.error('\nStack:', error.stack);
    process.exit(1);
  }
}

// Run migration
migrateDatabase();
