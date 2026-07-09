const { Sequelize } = require('sequelize');
const path = require('path');
const logger = console;

let sequelize;

// Use SQLite for local development (no separate DB server needed)
// Use MySQL if DB_HOST is configured
if (process.env.DB_HOST) {
  // MySQL connection
  sequelize = new Sequelize(
    process.env.DB_NAME || 'product_catalog',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'password',
    {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: process.env.NODE_ENV === 'development' ? false : false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  );
} else {
  // SQLite connection for development (file-based, no server required)
  const dbPath = path.join(__dirname, '../../data/database.sqlite');
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  });
  logger.log(`📁 Using SQLite database at: ${dbPath}`);
}

async function connect() {
  try {
    await sequelize.authenticate();
    logger.log('✅ Database connected successfully');
    await sequelize.sync({ alter: false });
    logger.log('✅ Database synchronized');
  } catch (err) {
    logger.error('❌ Database connection error:', err.message);
    process.exit(1);
  }
}

module.exports = { sequelize, connect };
