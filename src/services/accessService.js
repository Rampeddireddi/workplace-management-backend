/**
 * accessService.js
 * Determines which employee IDs a given user is authorized to access.
 *
 * Rules:
 *   - hr: can access all employees
 *   - manager: can access themselves + all descendants in the reporting hierarchy
 *   - employee: can access only themselves
 */

import { employees } from '../data/employees.js';

/**
 * Build a map: managerId → [directReportIds]
 */
function buildReportingTree() {
  const tree = {};
  for (const emp of employees) {
    if (emp.managerId) {
      if (!tree[emp.managerId]) tree[emp.managerId] = [];
      tree[emp.managerId].push(emp.id);
    }
  }
  return tree;
}

/**
 * Collect all descendant IDs (BFS) for a given root ID.
 */
function getAllDescendants(rootId, tree) {
  const result = new Set();
  const queue = [rootId];
  while (queue.length > 0) {
    const current = queue.shift();
    const reports = tree[current] || [];
    for (const reportId of reports) {
      if (!result.has(reportId)) {
        result.add(reportId);
        queue.push(reportId);
      }
    }
  }
  return result;
}

/**
 * Returns the set of employee IDs the session user is authorized to view.
 * @param {object} sessionUser – the authenticated user object from session
 * @returns {Set<string>} – authorized employee IDs
 */
export function getAuthorizedEmployeeIds(sessionUser) {
  if (!sessionUser) return new Set();

  if (sessionUser.role === 'hr') {
    return new Set(employees.map((e) => e.id));
  }

  if (sessionUser.role === 'manager') {
    const tree = buildReportingTree();
    const descendants = getAllDescendants(sessionUser.id, tree);
    descendants.add(sessionUser.id);
    return descendants;
  }

  // employee
  return new Set([sessionUser.id]);
}

/**
 * Check whether the session user is authorized to access a specific employee.
 */
export function canAccessEmployee(sessionUser, targetEmployeeId) {
  const authorized = getAuthorizedEmployeeIds(sessionUser);
  return authorized.has(targetEmployeeId);
}

/**
 * Returns the full employee records the session user can access.
 */
export function getAuthorizedEmployees(sessionUser) {
  const ids = getAuthorizedEmployeeIds(sessionUser);
  return employees.filter((e) => ids.has(e.id));
}
