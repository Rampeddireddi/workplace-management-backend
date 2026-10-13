/**
 * reportService.js
 * Centralized calculation layer for all KPI metrics.
 * All business calculations live here; controllers and routes only call these functions.
 */

import { attendance } from '../data/attendance.js';
import { meetings } from '../data/meetings.js';
import { learning } from '../data/learning.js';
import { sustainability } from '../data/sustainability.js';
import { employees } from '../data/employees.js';

// ─── Utility helpers ──────────────────────────────────────────────────────────

function inRange(dateStr, startDate, endDate) {
  if (!dateStr) return false;
  const d = dateStr.slice(0, 10);
  if (startDate && d < startDate) return false;
  if (endDate && d > endDate) return false;
  return true;
}

function timeToMinutes(timeStr) {
  if (!timeStr) return null;
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

function minutesToTime(totalMinutes) {
  if (totalMinutes == null || isNaN(totalMinutes)) return null;
  const h = Math.floor(totalMinutes / 60);
  const m = Math.round(totalMinutes % 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

function avg(arr) {
  const valid = arr.filter((v) => v != null && !isNaN(v));
  if (valid.length === 0) return null;
  return valid.reduce((a, b) => a + b, 0) / valid.length;
}

function sum(arr) {
  return arr.filter((v) => v != null && !isNaN(v)).reduce((a, b) => a + b, 0);
}

function safeRound(val, decimals = 2) {
  if (val == null || isNaN(val)) return null;
  return Math.round(val * 10 ** decimals) / 10 ** decimals;
}

function getISOWeek(dateStr) {
  const d = new Date(dateStr);
  const day = d.getDay() || 7;
  d.setDate(d.getDate() + 4 - day);
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  return `${d.getFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

function getMondayOfWeek(dateStr) {
  const d = new Date(dateStr);
  const day = d.getDay() || 7;
  d.setDate(d.getDate() - day + 1);
  return d.toISOString().slice(0, 10);
}

// ─── Meeting Effectiveness ────────────────────────────────────────────────────

/**
 * meetingEffectiveness = (avgFeedbackScore / 5) * 100
 */
export function getMeetingsReport({ employeeIds, startDate, endDate }) {
  const idSet = new Set(employeeIds);

  const filtered = meetings.filter((m) => {
    if (!inRange(m.date, startDate, endDate)) return false;
    if (m.status !== 'completed') return false;
    // Include meeting if organizer or any participant is in scope
    const relevant =
      idSet.has(m.organizerId) ||
      m.participantIds.some((pid) => idSet.has(pid));
    return relevant;
  });

  const withFeedback = filtered.filter((m) => m.feedbackScore != null);
  const avgFeedback = avg(withFeedback.map((m) => m.feedbackScore));
  const effectiveness = avgFeedback != null ? safeRound((avgFeedback / 5) * 100, 1) : null;
  const totalMeetingMinutes = sum(filtered.map((m) => m.durationMinutes));
  const totalMeetingHours = safeRound(totalMeetingMinutes / 60, 2);
  const avgDurationMinutes = safeRound(avg(filtered.map((m) => m.durationMinutes)), 1);

  // By week
  const byWeek = {};
  for (const m of filtered) {
    const week = getMondayOfWeek(m.date);
    if (!byWeek[week]) byWeek[week] = { meetingCount: 0, totalMinutes: 0, feedbackScores: [] };
    byWeek[week].meetingCount++;
    byWeek[week].totalMinutes += m.durationMinutes;
    if (m.feedbackScore != null) byWeek[week].feedbackScores.push(m.feedbackScore);
  }
  const weeklyTrend = Object.entries(byWeek)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([week, data]) => ({
      week,
      meetingCount: data.meetingCount,
      totalHours: safeRound(data.totalMinutes / 60, 2),
      avgFeedback: safeRound(avg(data.feedbackScores), 2),
      effectiveness: safeRound(avg(data.feedbackScores) != null ? (avg(data.feedbackScores) / 5) * 100 : null, 1),
    }));

  // By type
  const byType = {};
  for (const m of filtered) {
    if (!byType[m.meetingType]) byType[m.meetingType] = { count: 0, totalMinutes: 0 };
    byType[m.meetingType].count++;
    byType[m.meetingType].totalMinutes += m.durationMinutes;
  }
  const typeBreakdown = Object.entries(byType).map(([type, data]) => ({
    type,
    count: data.count,
    totalHours: safeRound(data.totalMinutes / 60, 2),
  }));

  // By department (derive from participants)
  const empDeptMap = {};
  for (const e of employees) empDeptMap[e.id] = e.department;

  const byDept = {};
  for (const m of filtered) {
    const participants = m.participantIds.filter((pid) => idSet.has(pid));
    const depts = [...new Set(participants.map((pid) => empDeptMap[pid]).filter(Boolean))];
    for (const dept of depts) {
      if (!byDept[dept]) byDept[dept] = { meetingCount: 0, totalMinutes: 0, feedbackScores: [] };
      byDept[dept].meetingCount++;
      byDept[dept].totalMinutes += m.durationMinutes;
      if (m.feedbackScore != null) byDept[dept].feedbackScores.push(m.feedbackScore);
    }
  }
  const departmentBreakdown = Object.entries(byDept).map(([dept, data]) => ({
    department: dept,
    meetingCount: data.meetingCount,
    totalHours: safeRound(data.totalMinutes / 60, 2),
    avgFeedback: safeRound(avg(data.feedbackScores), 2),
  }));

  return {
    summary: {
      totalMeetings: filtered.length,
      totalMeetingHours,
      avgDurationMinutes,
      avgFeedbackScore: safeRound(avgFeedback, 2),
      meetingEffectivenessScore: effectiveness,
      meetingsWithFeedback: withFeedback.length,
      feedbackCoverage: filtered.length > 0 ? safeRound((withFeedback.length / filtered.length) * 100, 1) : null,
    },
    weeklyTrend,
    typeBreakdown,
    departmentBreakdown,
    records: filtered.map((m) => ({
      id: m.id,
      date: m.date,
      title: m.title,
      organizerId: m.organizerId,
      participantCount: m.participantIds.length,
      durationMinutes: m.durationMinutes,
      meetingType: m.meetingType,
      feedbackScore: m.feedbackScore,
      effectiveness: m.feedbackScore != null ? safeRound((m.feedbackScore / 5) * 100, 1) : null,
    })),
  };
}

// ─── Office Utilisation ───────────────────────────────────────────────────────

export function getOfficeReport({ employeeIds, startDate, endDate }) {
  const idSet = new Set(employeeIds);

  const filtered = attendance.filter(
    (r) => idSet.has(r.employeeId) && inRange(r.date, startDate, endDate)
  );

  const presentRecords = filtered.filter((r) => r.attendanceStatus === 'present');
  const officeRecords = presentRecords.filter((r) => r.workMode === 'office');
  const wfhRecords = presentRecords.filter((r) => r.workMode === 'wfh');

  // Count unique office days per employee
  const officeDaysPerEmp = {};
  const presentDaysPerEmp = {};
  for (const r of presentRecords) {
    if (!presentDaysPerEmp[r.employeeId]) presentDaysPerEmp[r.employeeId] = new Set();
    presentDaysPerEmp[r.employeeId].add(r.date);
    if (r.workMode === 'office') {
      if (!officeDaysPerEmp[r.employeeId]) officeDaysPerEmp[r.employeeId] = new Set();
      officeDaysPerEmp[r.employeeId].add(r.date);
    }
  }

  const empIds = [...idSet];
  const officeDayCounts = empIds.map((id) => (officeDaysPerEmp[id] ? officeDaysPerEmp[id].size : 0));
  const totalOfficeDays = sum(officeDayCounts);
  const totalPresentDays = sum(empIds.map((id) => (presentDaysPerEmp[id] ? presentDaysPerEmp[id].size : 0)));

  const attendanceRate = totalPresentDays > 0 ? safeRound((totalOfficeDays / totalPresentDays) * 100, 1) : null;
  const avgOfficeDaysPerWeek = empIds.length > 0 ? safeRound(avg(officeDayCounts) / 6, 2) : null; // 6 weeks

  // By week
  const byWeek = {};
  for (const r of presentRecords) {
    const week = getMondayOfWeek(r.date);
    if (!byWeek[week]) byWeek[week] = { officeDays: 0, wfhDays: 0, totalDays: 0, empSet: new Set() };
    byWeek[week].totalDays++;
    byWeek[week].empSet.add(r.employeeId);
    if (r.workMode === 'office') byWeek[week].officeDays++;
    else byWeek[week].wfhDays++;
  }
  const weeklyTrend = Object.entries(byWeek)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([week, data]) => ({
      week,
      officeDays: data.officeDays,
      wfhDays: data.wfhDays,
      totalDays: data.totalDays,
      uniqueEmployees: data.empSet.size,
      officeRate: data.totalDays > 0 ? safeRound((data.officeDays / data.totalDays) * 100, 1) : null,
    }));

  // By employee
  const empMap = {};
  for (const e of employees) empMap[e.id] = e;

  const byEmployee = empIds.map((id) => {
    const emp = empMap[id];
    const officeDays = officeDaysPerEmp[id] ? officeDaysPerEmp[id].size : 0;
    const presentDays = presentDaysPerEmp[id] ? presentDaysPerEmp[id].size : 0;
    return {
      employeeId: id,
      name: emp?.name,
      department: emp?.department,
      officeDays,
      wfhDays: presentDays - officeDays,
      presentDays,
      officeRate: presentDays > 0 ? safeRound((officeDays / presentDays) * 100, 1) : null,
    };
  });

  // By department
  const byDept = {};
  for (const r of presentRecords) {
    const emp = empMap[r.employeeId];
    if (!emp) continue;
    const dept = emp.department;
    if (!byDept[dept]) byDept[dept] = { officeDays: 0, wfhDays: 0, totalDays: 0 };
    byDept[dept].totalDays++;
    if (r.workMode === 'office') byDept[dept].officeDays++;
    else byDept[dept].wfhDays++;
  }
  const departmentBreakdown = Object.entries(byDept).map(([dept, data]) => ({
    department: dept,
    officeDays: data.officeDays,
    wfhDays: data.wfhDays,
    totalDays: data.totalDays,
    officeRate: data.totalDays > 0 ? safeRound((data.officeDays / data.totalDays) * 100, 1) : null,
  }));

  return {
    summary: {
      totalOfficeDays,
      totalWfhDays: wfhRecords.length,
      attendanceRate,
      avgOfficeDaysPerWeek,
      officeToWfhRatio: {
        office: officeRecords.length,
        wfh: wfhRecords.length,
      },
    },
    weeklyTrend,
    byEmployee,
    departmentBreakdown,
    records: filtered.map((r) => ({
      employeeId: r.employeeId,
      name: empMap[r.employeeId]?.name,
      date: r.date,
      workMode: r.workMode,
      attendanceStatus: r.attendanceStatus,
      signIn: r.signIn,
      signOut: r.signOut,
      workingHours: r.workingHours,
    })),
  };
}

// ─── Employee Engagement ──────────────────────────────────────────────────────

export function getEngagementReport({ employeeIds, startDate, endDate }) {
  const idSet = new Set(employeeIds);
  const empMap = {};
  for (const e of employees) empMap[e.id] = e;

  const filtered = attendance.filter(
    (r) => idSet.has(r.employeeId) && inRange(r.date, startDate, endDate) && r.attendanceStatus === 'present'
  );

  const signInMinutes = filtered.map((r) => timeToMinutes(r.signIn)).filter((v) => v != null);
  const signOutMinutes = filtered.map((r) => timeToMinutes(r.signOut)).filter((v) => v != null);
  const avgSignIn = minutesToTime(avg(signInMinutes));
  const avgSignOut = minutesToTime(avg(signOutMinutes));
  const avgWorkingHours = safeRound(avg(filtered.map((r) => r.workingHours)), 2);

  // Attendance status distribution
  const allFiltered = attendance.filter(
    (r) => idSet.has(r.employeeId) && inRange(r.date, startDate, endDate)
  );
  const statusDist = { present: 0, absent: 0, leave: 0 };
  for (const r of allFiltered) {
    statusDist[r.attendanceStatus] = (statusDist[r.attendanceStatus] || 0) + 1;
  }

  // Attendance consistency per employee
  const perEmp = {};
  for (const r of allFiltered) {
    if (!perEmp[r.employeeId]) perEmp[r.employeeId] = { present: 0, total: 0 };
    perEmp[r.employeeId].total++;
    if (r.attendanceStatus === 'present') perEmp[r.employeeId].present++;
  }

  const consistencyScores = Object.entries(perEmp).map(([id, data]) => ({
    employeeId: id,
    name: empMap[id]?.name,
    department: empMap[id]?.department,
    presentDays: data.present,
    scheduledDays: data.total,
    attendanceRate: data.total > 0 ? safeRound((data.present / data.total) * 100, 1) : null,
  }));

  // Weekly trends
  const byWeek = {};
  for (const r of filtered) {
    const week = getMondayOfWeek(r.date);
    if (!byWeek[week]) byWeek[week] = { signIns: [], signOuts: [], workingHours: [] };
    const si = timeToMinutes(r.signIn);
    const so = timeToMinutes(r.signOut);
    if (si != null) byWeek[week].signIns.push(si);
    if (so != null) byWeek[week].signOuts.push(so);
    if (r.workingHours != null) byWeek[week].workingHours.push(r.workingHours);
  }
  const weeklyTrend = Object.entries(byWeek)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([week, data]) => ({
      week,
      avgSignIn: minutesToTime(avg(data.signIns)),
      avgSignOut: minutesToTime(avg(data.signOuts)),
      avgSignInMinutes: safeRound(avg(data.signIns), 1),
      avgSignOutMinutes: safeRound(avg(data.signOuts), 1),
      avgWorkingHours: safeRound(avg(data.workingHours), 2),
    }));

  // By department
  const byDept = {};
  for (const r of filtered) {
    const dept = empMap[r.employeeId]?.department;
    if (!dept) continue;
    if (!byDept[dept]) byDept[dept] = { workingHours: [], signIns: [] };
    if (r.workingHours != null) byDept[dept].workingHours.push(r.workingHours);
    const si = timeToMinutes(r.signIn);
    if (si != null) byDept[dept].signIns.push(si);
  }
  const departmentBreakdown = Object.entries(byDept).map(([dept, data]) => ({
    department: dept,
    avgWorkingHours: safeRound(avg(data.workingHours), 2),
    avgSignIn: minutesToTime(avg(data.signIns)),
  }));

  return {
    summary: {
      avgSignIn,
      avgSignOut,
      avgWorkingHours,
      totalPresentDays: filtered.length,
      attendanceStatusDistribution: statusDist,
    },
    weeklyTrend,
    consistencyScores,
    departmentBreakdown,
    records: filtered.map((r) => ({
      employeeId: r.employeeId,
      name: empMap[r.employeeId]?.name,
      department: empMap[r.employeeId]?.department,
      date: r.date,
      workMode: r.workMode,
      signIn: r.signIn,
      signOut: r.signOut,
      workingHours: r.workingHours,
      breakMinutes: r.breakMinutes,
    })),
  };
}

// ─── Learning Participation ───────────────────────────────────────────────────

export function getLearningReport({ employeeIds, startDate, endDate, category }) {
  const idSet = new Set(employeeIds);
  const empMap = {};
  for (const e of employees) empMap[e.id] = e;

  let filtered = learning.filter((r) => idSet.has(r.employeeId));

  // Date filter: enrollment date within range
  if (startDate || endDate) {
    filtered = filtered.filter((r) => inRange(r.enrollmentDate, startDate, endDate));
  }

  if (category) {
    filtered = filtered.filter((r) => r.category === category);
  }

  const completed = filtered.filter((r) => r.status === 'completed');
  const inProgress = filtered.filter((r) => r.status === 'in-progress');
  const enrolled = filtered.filter((r) => r.status === 'enrolled');

  const completionRate = filtered.length > 0 ? safeRound((completed.length / filtered.length) * 100, 1) : null;
  const totalLearningHours = safeRound(sum(filtered.map((r) => r.learningHours)), 1);

  // By employee
  const perEmp = {};
  for (const r of filtered) {
    if (!perEmp[r.employeeId]) perEmp[r.employeeId] = { completed: 0, inProgress: 0, enrolled: 0, hours: 0 };
    if (r.status === 'completed') perEmp[r.employeeId].completed++;
    else if (r.status === 'in-progress') perEmp[r.employeeId].inProgress++;
    else perEmp[r.employeeId].enrolled++;
    perEmp[r.employeeId].hours += r.learningHours;
  }
  const byEmployee = Object.entries(perEmp).map(([id, data]) => ({
    employeeId: id,
    name: empMap[id]?.name,
    department: empMap[id]?.department,
    completed: data.completed,
    inProgress: data.inProgress,
    enrolled: data.enrolled,
    total: data.completed + data.inProgress + data.enrolled,
    learningHours: safeRound(data.hours, 1),
    completionRate: (data.completed + data.inProgress + data.enrolled) > 0
      ? safeRound((data.completed / (data.completed + data.inProgress + data.enrolled)) * 100, 1)
      : null,
  }));

  // By department
  const byDept = {};
  for (const r of filtered) {
    const dept = empMap[r.employeeId]?.department;
    if (!dept) continue;
    if (!byDept[dept]) byDept[dept] = { completed: 0, total: 0, hours: 0 };
    byDept[dept].total++;
    if (r.status === 'completed') byDept[dept].completed++;
    byDept[dept].hours += r.learningHours;
  }
  const departmentBreakdown = Object.entries(byDept).map(([dept, data]) => ({
    department: dept,
    completed: data.completed,
    total: data.total,
    learningHours: safeRound(data.hours, 1),
    completionRate: data.total > 0 ? safeRound((data.completed / data.total) * 100, 1) : null,
  }));

  // Weekly completions
  const byWeek = {};
  for (const r of completed) {
    if (!r.completionDate) continue;
    const week = getMondayOfWeek(r.completionDate);
    if (!byWeek[week]) byWeek[week] = { completions: 0, hours: 0 };
    byWeek[week].completions++;
    byWeek[week].hours += r.learningHours;
  }
  const weeklyTrend = Object.entries(byWeek)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([week, data]) => ({ week, completions: data.completions, learningHours: safeRound(data.hours, 1) }));

  // Categories
  const categories = [...new Set(filtered.map((r) => r.category))];

  return {
    summary: {
      totalEnrollments: filtered.length,
      completed: completed.length,
      inProgress: inProgress.length,
      enrolled: enrolled.length,
      completionRate,
      totalLearningHours,
      categories,
    },
    weeklyTrend,
    byEmployee,
    departmentBreakdown,
    records: filtered.map((r) => ({
      id: r.id,
      employeeId: r.employeeId,
      name: empMap[r.employeeId]?.name,
      department: empMap[r.employeeId]?.department,
      courseName: r.courseName,
      category: r.category,
      status: r.status,
      enrollmentDate: r.enrollmentDate,
      completionDate: r.completionDate,
      learningHours: r.learningHours,
      progressPercentage: r.progressPercentage,
    })),
  };
}

// ─── Hybrid Work Effectiveness ────────────────────────────────────────────────

export function getHybridReport({ employeeIds, startDate, endDate }) {
  const idSet = new Set(employeeIds);
  const empMap = {};
  for (const e of employees) empMap[e.id] = e;

  const filtered = attendance.filter(
    (r) => idSet.has(r.employeeId) && inRange(r.date, startDate, endDate) && r.attendanceStatus === 'present'
  );

  const officeRecs = filtered.filter((r) => r.workMode === 'office');
  const wfhRecs = filtered.filter((r) => r.workMode === 'wfh');

  const totalOfficeHours = safeRound(sum(officeRecs.map((r) => r.workingHours)), 2);
  const totalWfhHours = safeRound(sum(wfhRecs.map((r) => r.workingHours)), 2);
  const avgHoursOffice = safeRound(avg(officeRecs.map((r) => r.workingHours)), 2);
  const avgHoursWfh = safeRound(avg(wfhRecs.map((r) => r.workingHours)), 2);

  // By week
  const byWeek = {};
  for (const r of filtered) {
    const week = getMondayOfWeek(r.date);
    if (!byWeek[week]) byWeek[week] = { officeHours: 0, wfhHours: 0, officeDays: 0, wfhDays: 0 };
    if (r.workMode === 'office') {
      byWeek[week].officeHours += r.workingHours;
      byWeek[week].officeDays++;
    } else {
      byWeek[week].wfhHours += r.workingHours;
      byWeek[week].wfhDays++;
    }
  }
  const weeklyTrend = Object.entries(byWeek)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([week, data]) => ({
      week,
      officeHours: safeRound(data.officeHours, 2),
      wfhHours: safeRound(data.wfhHours, 2),
      totalHours: safeRound(data.officeHours + data.wfhHours, 2),
      officeDays: data.officeDays,
      wfhDays: data.wfhDays,
    }));

  // By employee
  const perEmp = {};
  for (const r of filtered) {
    if (!perEmp[r.employeeId]) perEmp[r.employeeId] = { officeHours: 0, wfhHours: 0, officeDays: 0, wfhDays: 0 };
    if (r.workMode === 'office') {
      perEmp[r.employeeId].officeHours += r.workingHours;
      perEmp[r.employeeId].officeDays++;
    } else {
      perEmp[r.employeeId].wfhHours += r.workingHours;
      perEmp[r.employeeId].wfhDays++;
    }
  }
  const byEmployee = Object.entries(perEmp).map(([id, data]) => ({
    employeeId: id,
    name: empMap[id]?.name,
    department: empMap[id]?.department,
    officeHours: safeRound(data.officeHours, 2),
    wfhHours: safeRound(data.wfhHours, 2),
    totalHours: safeRound(data.officeHours + data.wfhHours, 2),
    officeDays: data.officeDays,
    wfhDays: data.wfhDays,
    avgHoursOffice: data.officeDays > 0 ? safeRound(data.officeHours / data.officeDays, 2) : null,
    avgHoursWfh: data.wfhDays > 0 ? safeRound(data.wfhHours / data.wfhDays, 2) : null,
  }));

  // By department
  const byDept = {};
  for (const r of filtered) {
    const dept = empMap[r.employeeId]?.department;
    if (!dept) continue;
    if (!byDept[dept]) byDept[dept] = { officeHours: 0, wfhHours: 0 };
    if (r.workMode === 'office') byDept[dept].officeHours += r.workingHours;
    else byDept[dept].wfhHours += r.workingHours;
  }
  const departmentBreakdown = Object.entries(byDept).map(([dept, data]) => ({
    department: dept,
    officeHours: safeRound(data.officeHours, 2),
    wfhHours: safeRound(data.wfhHours, 2),
    totalHours: safeRound(data.officeHours + data.wfhHours, 2),
  }));

  return {
    summary: {
      totalOfficeHours,
      totalWfhHours,
      avgHoursPerOfficeDay: avgHoursOffice,
      avgHoursPerWfhDay: avgHoursWfh,
      officeDays: officeRecs.length,
      wfhDays: wfhRecs.length,
    },
    weeklyTrend,
    byEmployee,
    departmentBreakdown,
    records: filtered.map((r) => ({
      employeeId: r.employeeId,
      name: empMap[r.employeeId]?.name,
      department: empMap[r.employeeId]?.department,
      date: r.date,
      workMode: r.workMode,
      workingHours: r.workingHours,
      signIn: r.signIn,
      signOut: r.signOut,
    })),
  };
}

// ─── Dashboard Summary ────────────────────────────────────────────────────────

export function getDashboardSummary({ employeeIds, startDate, endDate }) {
  const meetings = getMeetingsReport({ employeeIds, startDate, endDate });
  const office = getOfficeReport({ employeeIds, startDate, endDate });
  const engagement = getEngagementReport({ employeeIds, startDate, endDate });
  const learningData = getLearningReport({ employeeIds, startDate, endDate });
  const hybrid = getHybridReport({ employeeIds, startDate, endDate });

  return {
    meetings: meetings.summary,
    office: office.summary,
    engagement: engagement.summary,
    learning: learningData.summary,
    hybrid: hybrid.summary,
    weeklyMeetingTrend: meetings.weeklyTrend,
    weeklyOfficeTrend: office.weeklyTrend,
    weeklyEngagementTrend: engagement.weeklyTrend,
    weeklyLearningTrend: learningData.weeklyTrend,
    weeklyHybridTrend: hybrid.weeklyTrend,
  };
}

// ─── Sustainability ───────────────────────────────────────────────────────────

export function getSustainabilityReport({ departments: deptFilter, startDate, endDate }) {
  let filtered = sustainability;

  if (startDate || endDate) {
    filtered = filtered.filter((r) => inRange(r.weekStart, startDate, endDate));
  }

  if (deptFilter && deptFilter.length > 0) {
    const deptSet = new Set(deptFilter);
    filtered = filtered.filter((r) => deptSet.has(r.department));
  }

  const totalEnergy = safeRound(sum(filtered.map((r) => r.officeEnergyKwh)), 1);
  const totalCarbon = safeRound(sum(filtered.map((r) => r.estimatedCarbonKg)), 1);
  const totalPaper = safeRound(sum(filtered.map((r) => r.paperUsageKg)), 1);
  const totalRecycled = safeRound(sum(filtered.map((r) => r.wasteRecycledKg)), 1);

  // By week
  const byWeek = {};
  for (const r of filtered) {
    if (!byWeek[r.weekStart]) byWeek[r.weekStart] = { energy: 0, carbon: 0, paper: 0, recycled: 0 };
    byWeek[r.weekStart].energy += r.officeEnergyKwh;
    byWeek[r.weekStart].carbon += r.estimatedCarbonKg;
    byWeek[r.weekStart].paper += r.paperUsageKg;
    byWeek[r.weekStart].recycled += r.wasteRecycledKg;
  }
  const weeklyTrend = Object.entries(byWeek)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([week, data]) => ({
      week,
      officeEnergyKwh: safeRound(data.energy, 1),
      estimatedCarbonKg: safeRound(data.carbon, 1),
      paperUsageKg: safeRound(data.paper, 1),
      wasteRecycledKg: safeRound(data.recycled, 1),
    }));

  // By department
  const byDept = {};
  for (const r of filtered) {
    if (!byDept[r.department]) byDept[r.department] = { energy: 0, carbon: 0, paper: 0, recycled: 0 };
    byDept[r.department].energy += r.officeEnergyKwh;
    byDept[r.department].carbon += r.estimatedCarbonKg;
    byDept[r.department].paper += r.paperUsageKg;
    byDept[r.department].recycled += r.wasteRecycledKg;
  }
  const departmentBreakdown = Object.entries(byDept).map(([dept, data]) => ({
    department: dept,
    officeEnergyKwh: safeRound(data.energy, 1),
    estimatedCarbonKg: safeRound(data.carbon, 1),
    paperUsageKg: safeRound(data.paper, 1),
    wasteRecycledKg: safeRound(data.recycled, 1),
  }));

  return {
    note: 'All values are illustrative sample estimates for demonstration purposes only. They do not represent actual environmental measurements.',
    summary: { totalEnergy, totalCarbon, totalPaper, totalRecycled },
    weeklyTrend,
    departmentBreakdown,
    records: filtered,
  };
}
