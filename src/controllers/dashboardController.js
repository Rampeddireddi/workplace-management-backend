/**
 * dashboardController.js
 * Returns role-scoped dashboard summary data.
 */

import { getAuthorizedEmployeeIds } from '../services/accessService.js';
import { getDashboardSummary } from '../services/reportService.js';

function parseFilters(query) {
  const { startDate, endDate } = query;
  // Validate date format YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (startDate && !dateRegex.test(startDate)) {
    return { error: 'startDate must be in YYYY-MM-DD format.' };
  }
  if (endDate && !dateRegex.test(endDate)) {
    return { error: 'endDate must be in YYYY-MM-DD format.' };
  }
  return {
    startDate: startDate || '2024-09-02',
    endDate: endDate || '2024-10-11',
  };
}

/**
 * GET /api/dashboard
 */
export function getDashboard(req, res) {
  const filters = parseFilters(req.query);
  if (filters.error) return res.status(400).json({ error: filters.error });

  const employeeIds = [...getAuthorizedEmployeeIds(req.user)];
  if (employeeIds.length === 0) {
    return res.json({ summary: null, message: 'No authorized employees in scope.' });
  }

  const data = getDashboardSummary({
    employeeIds,
    startDate: filters.startDate,
    endDate: filters.endDate,
  });

  return res.json(data);
}
