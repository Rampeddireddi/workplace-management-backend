/**
 * authorize.js
 * Role-based authorization middleware factory.
 * Usage: authorize(['hr']) or authorize(['hr', 'manager'])
 */

export function authorize(allowedRoles) {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
}
