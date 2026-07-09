const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().min(1).max(255).required().trim(),
  description: Joi.string().max(2000).allow('').optional(),
  price: Joi.number().min(0).required(),
  categoryId: Joi.number().integer().positive().optional().allow(null),
  tags: Joi.array().items(Joi.string().trim()).optional(),
  inStock: Joi.boolean().optional(),
  sku: Joi.string().max(100).optional().allow(null),
  quantity: Joi.number().integer().min(0).optional()
});

const productUpdateSchema = Joi.object({
  name: Joi.string().min(1).max(255).optional().trim(),
  description: Joi.string().max(2000).allow('').optional(),
  price: Joi.number().min(0).optional(),
  categoryId: Joi.number().integer().positive().optional().allow(null),
  tags: Joi.array().items(Joi.string().trim()).optional(),
  inStock: Joi.boolean().optional(),
  sku: Joi.string().max(100).optional().allow(null),
  quantity: Joi.number().integer().min(0).optional()
});

function validateProduct(req, res, next) {
  const { error, value } = productSchema.validate(req.body, {
    stripUnknown: true,
    abortEarly: false
  });

  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details.map(d => ({ field: d.path.join('.'), message: d.message }))
    });
  }

  req.body = value;
  next();
}

function validateProductUpdate(req, res, next) {
  const { error, value } = productUpdateSchema.validate(req.body, {
    stripUnknown: true,
    abortEarly: false
  });

  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details.map(d => ({ field: d.path.join('.'), message: d.message }))
    });
  }

  req.body = value;
  next();
}

module.exports = { validateProduct, validateProductUpdate };
