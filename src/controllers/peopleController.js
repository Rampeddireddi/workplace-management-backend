/**
 * peopleController.js
 * Endpoints for browsing employees within the user's authorized scope.
 */

import { getAuthorizedEmployees, canAccessEmployee } from '../services/accessService.js';
import { employees } from '../data/employees.js';
import {
  getMeetingsReport,
  getOfficeReport,
  getEngagementReport,
  getLearningReport,
  getHybridReport,
} from '../services/reportService.js';

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function percentBetterThanPeers(targetValue, peerValues) {
  if (targetValue == null || peerValues.length === 0) return null;
  const comparable = peerValues.filter((value) => value != null && !isNaN(value));
  if (comparable.length === 0) return null;
  const countBetter = comparable.filter((value) => value < targetValue).length;
  return Math.min(99, Math.max(1, Math.round((countBetter / comparable.length) * 100)));
}

function buildComparisonSummary(employeeId, peerIds, startDate, endDate) {
  const comparison = {};

  const meetingScore = getMeetingsReport({ employeeIds: [employeeId], startDate, endDate }).summary.meetingEffectivenessScore;
  const officeScore = getOfficeReport({ employeeIds: [employeeId], startDate, endDate }).summary.attendanceRate;
  const engagementScore = getEngagementReport({ employeeIds: [employeeId], startDate, endDate }).summary.avgWorkingHours;
  const learningScore = getLearningReport({ employeeIds: [employeeId], startDate, endDate }).summary.completionRate;
  const hybridScore = getHybridReport({ employeeIds: [employeeId], startDate, endDate }).summary.avgHoursPerOfficeDay;

  const peerMeetingScores = peerIds
    .filter((id) => id !== employeeId)
    .map((id) => getMeetingsReport({ employeeIds: [id], startDate, endDate }).summary.meetingEffectivenessScore)
    .filter((value) => value != null);
  const peerOfficeScores = peerIds
    .filter((id) => id !== employeeId)
    .map((id) => getOfficeReport({ employeeIds: [id], startDate, endDate }).summary.attendanceRate)
    .filter((value) => value != null);
  const peerEngagementScores = peerIds
    .filter((id) => id !== employeeId)
    .map((id) => getEngagementReport({ employeeIds: [id], startDate, endDate }).summary.avgWorkingHours)
    .filter((value) => value != null);
  const peerLearningScores = peerIds
    .filter((id) => id !== employeeId)
    .map((id) => getLearningReport({ employeeIds: [id], startDate, endDate }).summary.completionRate)
    .filter((value) => value != null);
  const peerHybridScores = peerIds
    .filter((id) => id !== employeeId)
    .map((id) => getHybridReport({ employeeIds: [id], startDate, endDate }).summary.avgHoursPerOfficeDay)
    .filter((value) => value != null);

  comparison.meetings = {
    label: 'Meeting effectiveness',
    betterThanPercent: percentBetterThanPeers(meetingScore, peerMeetingScores),
    description: meetingScore != null ? `${meetingScore}% effectiveness score` : 'No comparable meeting score',
  };

  comparison.office = {
    label: 'Office utilisation',
    betterThanPercent: percentBetterThanPeers(officeScore, peerOfficeScores),
    description: officeScore != null ? `${officeScore}% office utilisation` : 'No comparable office score',
  };

  comparison.engagement = {
    label: 'Employee engagement',
    betterThanPercent: percentBetterThanPeers(engagementScore, peerEngagementScores),
    description: engagementScore != null ? `${engagementScore.toFixed(1)}h average workday` : 'No comparable engagement score',
  };

  comparison.learning = {
    label: 'Learning participation',
    betterThanPercent: percentBetterThanPeers(learningScore, peerLearningScores),
    description: learningScore != null ? `${learningScore}% completion rate` : 'No comparable learning score',
  };

  comparison.hybrid = {
    label: 'Hybrid work effectiveness',
    betterThanPercent: percentBetterThanPeers(hybridScore, peerHybridScores),
    description: hybridScore != null ? `${hybridScore.toFixed(1)}h average office day` : 'No comparable hybrid score',
  };

  return comparison;
}

/**
 * GET /api/people
 * Returns the list of employees accessible to the session user.
 */
export function listPeople(req, res) {
  const { department } = req.query;
  let authorized = getAuthorizedEmployees(req.user);

  if (department) {
    authorized = authorized.filter((e) => e.department === department);
  }

  // Return safe public fields only
  const result = authorized.map((e) => ({
    id: e.id,
    name: e.name,
    email: e.email,
    role: e.role,
    department: e.department,
    jobTitle: e.jobTitle,
    location: e.location,
    managerId: e.managerId,
  }));

  return res.json({ employees: result, total: result.length });
}

/**
 * GET /api/people/:employeeId
 * Returns full KPI summary for a single authorized employee.
 */
export function getEmployee(req, res) {
  const { employeeId } = req.params;
  const { startDate, endDate } = req.query;

  if (startDate && !DATE_REGEX.test(startDate)) {
    return res.status(400).json({ error: 'startDate must be in YYYY-MM-DD format.' });
  }
  if (endDate && !DATE_REGEX.test(endDate)) {
    return res.status(400).json({ error: 'endDate must be in YYYY-MM-DD format.' });
  }

  // Backend authorization: verify the session user can access this employee
  if (!canAccessEmployee(req.user, employeeId)) {
    // Return 404 to avoid revealing whether the employee exists
    return res.status(404).json({ error: 'Employee not found or access denied.' });
  }

  const employee = employees.find((e) => e.id === employeeId);
  if (!employee) {
    return res.status(404).json({ error: 'Employee not found.' });
  }

  const sd = startDate || '2024-09-02';
  const ed = endDate || '2024-10-11';
  const ids = [employeeId];
  const authorizedPeerIds = getAuthorizedEmployees(req.user).map((person) => person.id);

  const meetings = getMeetingsReport({ employeeIds: ids, startDate: sd, endDate: ed });
  const office = getOfficeReport({ employeeIds: ids, startDate: sd, endDate: ed });
  const engagement = getEngagementReport({ employeeIds: ids, startDate: sd, endDate: ed });
  const learning = getLearningReport({ employeeIds: ids, startDate: sd, endDate: ed });
  const hybrid = getHybridReport({ employeeIds: ids, startDate: sd, endDate: ed });

  return res.json({
    employee: {
      id: employee.id,
      name: employee.name,
      email: employee.email,
      role: employee.role,
      department: employee.department,
      jobTitle: employee.jobTitle,
      location: employee.location,
      managerId: employee.managerId,
    },
    kpis: {
      meetings: meetings.summary,
      office: office.summary,
      engagement: engagement.summary,
      learning: learning.summary,
      hybrid: hybrid.summary,
    },
    trends: {
      meetings: meetings.weeklyTrend,
      office: office.weeklyTrend,
      engagement: engagement.weeklyTrend,
      learning: learning.weeklyTrend,
      hybrid: hybrid.weeklyTrend,
    },
    comparison: buildComparisonSummary(employeeId, authorizedPeerIds, sd, ed),
  });
}
