// middleware/authMiddleware.js
const checkRole = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.headers['x-user-role'];
    
    if (!userRole) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing x-user-role header'
      });
    }
    
    if (userRole !== requiredRole) {
      return res.status(403).json({
        error: 'Forbidden',
        message: `Access denied. Required role: ${requiredRole}`
      });
    }
    
    next();
  };
};

const checkUserId = (req, res, next) => {
  const userId = req.headers['x-user-id'];
  
  if (!userId) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Missing x-user-id header'
    });
  }
  
  req.userId = parseInt(userId);
  next();
};

module.exports = { checkRole, checkUserId };