const { Op } = require('sequelize');
const Product = require('../models/product');
const Category = require('../models/category');

async function listProducts({
  search,
  categoryId,
  minPrice,
  maxPrice,
  tags,
  inStock,
  page = 1,
  limit = 12,
  sort = 'createdAt',
  order = 'DESC'
}) {
  const where = {};

  // Search in name and description
  if (search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { description: { [Op.like]: `%${search}%` } }
    ];
  }

  // Filter by category
  if (categoryId) {
    where.categoryId = categoryId;
  }

  // Filter by price range
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) {
      where.price[Op.gte] = Number(minPrice);
    }
    if (maxPrice !== undefined) {
      where.price[Op.lte] = Number(maxPrice);
    }
  }

  // Filter by stock status
  if (inStock !== undefined) {
    where.inStock = inStock === 'true' || inStock === true;
  }

  // Filter by tags (if any tag matches)
  if (tags) {
    const tagsArray = Array.isArray(tags) ? tags : String(tags).split(',').map(t => t.trim());
    // Search for products that have any of the specified tags
    where[Op.or] = (where[Op.or] || []).concat(
      tagsArray.map(tag => ({ tags: { [Op.substring]: tag } }))
    );
  }

  const offset = (Number(page) - 1) * Number(limit);

  const { rows, count } = await Product.findAndCountAll({
    where,
    include: [{ model: Category, attributes: ['id', 'name', 'slug'] }],
    limit: Number(limit),
    offset,
    order: [[sort, order.toUpperCase()]],
    subQuery: false
  });

  return {
    items: rows,
    total: count,
    page: Number(page),
    limit: Number(limit),
    pages: Math.ceil(count / Number(limit))
  };
}

async function createProduct(data) {
  return Product.create(data);
}

async function getProductById(id) {
  return Product.findByPk(id, {
    include: [{ model: Category, attributes: ['id', 'name', 'slug'] }]
  });
}

async function updateProduct(id, data) {
  const product = await Product.findByPk(id);
  if (!product) return null;
  return product.update(data);
}

async function deleteProduct(id) {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.destroy();
  return true;
}

module.exports = { listProducts, createProduct, getProductById, updateProduct, deleteProduct };
