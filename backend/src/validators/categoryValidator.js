const Joi = require('joi');

const categorySchema = Joi.object({
  name: Joi.string().min(1).max(100).required().trim(),
  description: Joi.string().max(500).allow('').optional(),
  slug: Joi.string().min(1).max(100).optional().trim()
});

function validateCategory(req, res, next) {
  const { error, value } = categorySchema.validate(req.body, {
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

module.exports = { validateCategory };
