/**
 * authenticate.js
 * Express middleware that reads the session and attaches the authenticated user
 * to req.user. Returns 401 if no valid session exists.
 */

export function authenticate(req, res, next) {
  const sessionUser = req.session?.user;
  if (!sessionUser) {
    return res.status(401).json({ error: 'Authentication required.' });
  }
  req.user = sessionUser;
  next();
}
