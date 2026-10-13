/**
 * authController.js
 * Handles mock authentication for the demo prototype.
 *
 * IMPORTANT: This is a demonstration-only authentication implementation.
 * It uses a predefined list of demo accounts with simple password matching.
 * This is NOT suitable for production use. In production, replace with a
 * proper identity provider (OAuth2, SAML, etc.) and bcrypt password hashing.
 */

import { employees, DEMO_ACCOUNTS } from '../data/employees.js';

/**
 * POST /api/auth/login
 * Body: { employeeId, password }
 */
export function login(req, res) {
  const { employeeId, password } = req.body;

  if (!employeeId || !password) {
    return res.status(400).json({ error: 'employeeId and password are required.' });
  }

  // Validate against demo accounts
  const demoAccount = DEMO_ACCOUNTS.find(
    (a) => a.employeeId === employeeId && a.password === password
  );

  if (!demoAccount) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }

  const employee = employees.find((e) => e.id === employeeId);
  if (!employee) {
    return res.status(401).json({ error: 'Employee not found.' });
  }

  // Establish session — only store minimal, trusted data
  req.session.user = {
    id: employee.id,
    name: employee.name,
    email: employee.email,
    role: employee.role,
    department: employee.department,
    jobTitle: employee.jobTitle,
    managerId: employee.managerId,
    location: employee.location,
  };

  return res.json({
    user: req.session.user,
    message: 'Login successful.',
  });
}

/**
 * POST /api/auth/logout
 */
export function logout(req, res) {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed.' });
    }
    res.clearCookie('connect.sid');
    return res.json({ message: 'Logged out successfully.' });
  });
}

/**
 * GET /api/auth/me
 * Returns the authenticated user's session data.
 */
export function me(req, res) {
  if (!req.session?.user) {
    return res.status(401).json({ error: 'Not authenticated.' });
  }
  return res.json({ user: req.session.user });
}

/**
 * Returns public demo account list (labels only, no passwords).
 * GET /api/auth/demo-accounts
 */
export function getDemoAccounts(req, res) {
  const safe = DEMO_ACCOUNTS.map((a) => ({
    employeeId: a.employeeId,
    password: a.password, // intentionally exposed for demo UX
    label: a.label,
  }));
  return res.json({ accounts: safe });
}
