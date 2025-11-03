const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss');

// Sanitize user input against NoSQL injection attacks
const sanitizeInput = mongoSanitize();

// XSS protection
const sanitizeXSS = (req, res, next) => {
  if (req.body) {
    Object.keys(req.body).forEach(key => {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    });
  }
  next();
};

module.exports = { sanitizeInput, sanitizeXSS };