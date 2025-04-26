// middleware/auth.js
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const protectRoute = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];  // Bearer token

  if (!token) {
    return res.status(401).json({ message: 'No token provided, access denied.' });
  }

  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.user = decoded; // Attach user info to request object
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token, access denied.' });
  }
};

// Middleware to check for Admin role
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ message: 'Admin access required.' });
  }
  next();
};

module.exports = { protectRoute, isAdmin };
