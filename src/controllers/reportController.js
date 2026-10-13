/**
 * reportController.js
 * Handles all KPI report and sustainability endpoints.
 * All endpoints enforce backend authorization via req.user.
 */

import { getAuthorizedEmployeeIds } from '../services/accessService.js';
import {
  getMeetingsReport,
  getOfficeReport,
  getEngagementReport,
  getLearningReport,
  getHybridReport,
  getSustainabilityReport,
} from '../services/reportService.js';
import { employees } from '../data/employees.js';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function parseCommonFilters(query) {
  const { startDate, endDate, employeeId, department } = query;
  if (startDate && !DATE_REGEX.test(startDate)) {
    return { error: 'startDate must be in YYYY-MM-DD format.' };
  }
  if (endDate && !DATE_REGEX.test(endDate)) {
    return { error: 'endDate must be in YYYY-MM-DD format.' };
  }
  return {
    startDate: startDate || '2024-09-02',
    endDate: endDate || '2024-10-11',
    employeeId: employeeId || null,
    department: department || null,
  };
}

function filterIdsByDept(authorizedIds, department) {
  if (!department) return [...authorizedIds];
  const deptSet = new Set(
    employees.filter((e) => e.department === department).map((e) => e.id)
  );
  return [...authorizedIds].filter((id) => deptSet.has(id));
}

function getEmployeeIds(user, filters) {
  const authorized = getAuthorizedEmployeeIds(user);

  if (filters.employeeId) {
    if (!authorized.has(filters.employeeId)) {
      return { error: 403, message: 'Access denied to this employee.' };
    }
    return { ids: [filters.employeeId] };
  }

  const ids = filterIdsByDept(authorized, filters.department);
  return { ids };
}

// ── Meetings ──────────────────────────────────────────────────────────────────

export function getMeetings(req, res) {
  const filters = parseCommonFilters(req.query);
  if (filters.error) return res.status(400).json({ error: filters.error });

  const { ids, error, message } = getEmployeeIds(req.user, filters);
  if (error) return res.status(error).json({ error: message });
  if (ids.length === 0) return res.json({ empty: true, message: 'No records in scope.' });

  const report = getMeetingsReport({ employeeIds: ids, startDate: filters.startDate, endDate: filters.endDate });
  return res.json(report);
}

// ── Office ────────────────────────────────────────────────────────────────────

export function getOffice(req, res) {
  const filters = parseCommonFilters(req.query);
  if (filters.error) return res.status(400).json({ error: filters.error });

  const { ids, error, message } = getEmployeeIds(req.user, filters);
  if (error) return res.status(error).json({ error: message });
  if (ids.length === 0) return res.json({ empty: true, message: 'No records in scope.' });

  const report = getOfficeReport({ employeeIds: ids, startDate: filters.startDate, endDate: filters.endDate });
  return res.json(report);
}

// ── Engagement ────────────────────────────────────────────────────────────────

export function getEngagement(req, res) {
  const filters = parseCommonFilters(req.query);
  if (filters.error) return res.status(400).json({ error: filters.error });

  const { ids, error, message } = getEmployeeIds(req.user, filters);
  if (error) return res.status(error).json({ error: message });
  if (ids.length === 0) return res.json({ empty: true, message: 'No records in scope.' });

  const report = getEngagementReport({ employeeIds: ids, startDate: filters.startDate, endDate: filters.endDate });
  return res.json(report);
}

// ── Learning ──────────────────────────────────────────────────────────────────

export function getLearning(req, res) {
  const filters = parseCommonFilters(req.query);
  if (filters.error) return res.status(400).json({ error: filters.error });

  const { ids, error, message } = getEmployeeIds(req.user, filters);
  if (error) return res.status(error).json({ error: message });
  if (ids.length === 0) return res.json({ empty: true, message: 'No records in scope.' });

  const report = getLearningReport({
    employeeIds: ids,
    startDate: filters.startDate,
    endDate: filters.endDate,
    category: req.query.category || null,
  });
  return res.json(report);
}

// ── Hybrid ────────────────────────────────────────────────────────────────────

export function getHybrid(req, res) {
  const filters = parseCommonFilters(req.query);
  if (filters.error) return res.status(400).json({ error: filters.error });

  const { ids, error, message } = getEmployeeIds(req.user, filters);
  if (error) return res.status(error).json({ error: message });
  if (ids.length === 0) return res.json({ empty: true, message: 'No records in scope.' });

  const report = getHybridReport({ employeeIds: ids, startDate: filters.startDate, endDate: filters.endDate });
  return res.json(report);
}

// ── Sustainability ────────────────────────────────────────────────────────────

export function getSustainability(req, res) {
  const { startDate, endDate, department } = req.query;

  if (startDate && !DATE_REGEX.test(startDate)) {
    return res.status(400).json({ error: 'startDate must be in YYYY-MM-DD format.' });
  }
  if (endDate && !DATE_REGEX.test(endDate)) {
    return res.status(400).json({ error: 'endDate must be in YYYY-MM-DD format.' });
  }

  const departments = department ? department.split(',').map((d) => d.trim()) : [];
  const report = getSustainabilityReport({
    departments,
    startDate: startDate || '2024-09-02',
    endDate: endDate || '2024-10-11',
  });
  return res.json(report);
}
