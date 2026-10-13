/**
 * attendance.js
 * Daily attendance records for all employees.
 * workMode: 'office' | 'wfh'
 * attendanceStatus: 'present' | 'absent' | 'leave'
 *
 * Date range: 2024-09-02 through 2024-10-11 (6 weeks, Mon–Fri)
 * Working hours calculated from signIn/signOut minus breakMinutes.
 */

// Helper: generate date strings for a weekday range
function weekdays(startDate, weeks) {
  const dates = [];
  const d = new Date(startDate);
  for (let w = 0; w < weeks; w++) {
    for (let day = 0; day < 5; day++) {
      const copy = new Date(d);
      dates.push(copy.toISOString().slice(0, 10));
      d.setDate(d.getDate() + 1);
    }
    d.setDate(d.getDate() + 2); // skip weekend
  }
  return dates;
}

const WEEKDAYS = weekdays('2024-09-02', 6);

// Template: [signIn, signOut, breakMinutes, workMode, status]
const PATTERNS = {
  // Mostly office, consistent hours
  office_regular: (date, seed) => {
    const inH = 8 + (seed % 2);
    const inM = [0, 15, 30, 45][seed % 4];
    const outH = 17 + (seed % 2);
    const outM = [0, 15, 30][seed % 3];
    const brk = 30 + (seed % 3) * 10;
    const mode = seed % 5 === 0 ? 'wfh' : 'office';
    const wh = ((outH * 60 + outM) - (inH * 60 + inM) - brk) / 60;
    return { signIn: `${String(inH).padStart(2,'0')}:${String(inM).padStart(2,'0')}`, signOut: `${String(outH).padStart(2,'0')}:${String(outM).padStart(2,'0')}`, breakMinutes: brk, workMode: mode, workingHours: +wh.toFixed(2) };
  },
  // Mostly WFH, flexible hours
  wfh_flex: (date, seed) => {
    const inH = 9 + (seed % 2);
    const inM = [0, 30][seed % 2];
    const outH = 17 + (seed % 3);
    const outM = [0, 15, 30, 45][seed % 4];
    const brk = 45 + (seed % 2) * 15;
    const mode = seed % 4 === 0 ? 'office' : 'wfh';
    const wh = ((outH * 60 + outM) - (inH * 60 + inM) - brk) / 60;
    return { signIn: `${String(inH).padStart(2,'0')}:${String(inM).padStart(2,'0')}`, signOut: `${String(outH).padStart(2,'0')}:${String(outM).padStart(2,'0')}`, breakMinutes: brk, workMode: mode, workingHours: +wh.toFixed(2) };
  },
  // Hybrid balanced
  hybrid: (date, seed) => {
    const inH = 8 + (seed % 3);
    const inM = [0, 15, 30][seed % 3];
    const outH = 17 + (seed % 2);
    const outM = [0, 30][seed % 2];
    const brk = 30 + (seed % 4) * 10;
    const idx = new Date(date).getDay(); // 1=Mon...5=Fri
    const mode = (idx % 2 === 0) ? 'office' : 'wfh';
    const wh = ((outH * 60 + outM) - (inH * 60 + inM) - brk) / 60;
    return { signIn: `${String(inH).padStart(2,'0')}:${String(inM).padStart(2,'0')}`, signOut: `${String(outH).padStart(2,'0')}:${String(outM).padStart(2,'0')}`, breakMinutes: brk, workMode: mode, workingHours: +wh.toFixed(2) };
  },
};

function makeRecords(employeeId, pattern, absenceDates = []) {
  return WEEKDAYS.map((date, idx) => {
    if (absenceDates.includes(date)) {
      return {
        employeeId, date,
        workMode: null, signIn: null, signOut: null,
        workingHours: 0, breakMinutes: 0,
        attendanceStatus: 'absent',
      };
    }
    const seed = idx * 7 + employeeId.charCodeAt(employeeId.length - 1);
    const p = PATTERNS[pattern](date, seed);
    return {
      employeeId,
      date,
      workMode: p.workMode,
      signIn: p.signIn,
      signOut: p.signOut,
      workingHours: p.workingHours,
      breakMinutes: p.breakMinutes,
      attendanceStatus: 'present',
    };
  });
}

export const attendance = [
  // EMP001 – Diana Reeves (HR)
  ...makeRecords('EMP001', 'hybrid', ['2024-09-09', '2024-09-16']),
  // EMP002 – Marcus Webb
  ...makeRecords('EMP002', 'office_regular', ['2024-09-23']),
  // EMP003 – Priya Nair
  ...makeRecords('EMP003', 'wfh_flex', ['2024-10-07', '2024-10-08']),
  // EMP004 – Nathan Clarke
  ...makeRecords('EMP004', 'hybrid', ['2024-09-30']),
  // EMP005 – Aisha Patel
  ...makeRecords('EMP005', 'office_regular', ['2024-09-24', '2024-09-25']),
  // EMP006 – Lucas Ferreira
  ...makeRecords('EMP006', 'hybrid', ['2024-10-01']),
  // EMP007 – Sophie Chen
  ...makeRecords('EMP007', 'wfh_flex', []),
  // EMP008 – Raj Mehta
  ...makeRecords('EMP008', 'office_regular', ['2024-09-17']),
  // EMP009 – Olivia Grant
  ...makeRecords('EMP009', 'hybrid', ['2024-09-10', '2024-09-11']),
  // EMP010 – Tom Nakamura
  ...makeRecords('EMP010', 'office_regular', []),
  // EMP011 – Fatima Al-Hassan
  ...makeRecords('EMP011', 'wfh_flex', ['2024-09-20']),
  // EMP012 – James Osei
  ...makeRecords('EMP012', 'hybrid', []),
  // EMP013 – Mei Lin
  ...makeRecords('EMP013', 'wfh_flex', ['2024-10-09', '2024-10-10', '2024-10-11']),
  // EMP014 – Grace Holloway
  ...makeRecords('EMP014', 'office_regular', ['2024-09-30']),
  // EMP015 – Carlos Rivera
  ...makeRecords('EMP015', 'hybrid', ['2024-09-02']),
  // EMP016 – Helena Kim
  ...makeRecords('EMP016', 'wfh_flex', []),
  // EMP017 – Samuel Adeyemi
  ...makeRecords('EMP017', 'office_regular', ['2024-09-16', '2024-09-23']),
  // EMP018 – Isabelle Fontaine
  ...makeRecords('EMP018', 'wfh_flex', []),
  // EMP019 – David Okonkwo
  ...makeRecords('EMP019', 'hybrid', ['2024-09-09']),
  // EMP020 – Robert Saunders
  ...makeRecords('EMP020', 'office_regular', []),
  // EMP021 – Alicia Moreno
  ...makeRecords('EMP021', 'hybrid', ['2024-10-03', '2024-10-04']),
  // EMP022 – Tyler Brooks
  ...makeRecords('EMP022', 'office_regular', ['2024-09-18']),
  // EMP023 – Nadia Kovacs
  ...makeRecords('EMP023', 'wfh_flex', []),
  // EMP024 – Derek Mensah
  ...makeRecords('EMP024', 'hybrid', ['2024-09-25']),
  // EMP025 – Sarah Lindqvist
  ...makeRecords('EMP025', 'wfh_flex', ['2024-10-01']),
  // EMP026 – Victor Huang
  ...makeRecords('EMP026', 'office_regular', []),
  // EMP027 – Eleanor Vance
  ...makeRecords('EMP027', 'hybrid', ['2024-09-09', '2024-09-10']),
  // EMP028 – Benjamin Torres
  ...makeRecords('EMP028', 'office_regular', []),
  // EMP029 – Chloe Dupont
  ...makeRecords('EMP029', 'hybrid', ['2024-09-30', '2024-10-01']),
  // EMP030 – Ahmed Khalil
  ...makeRecords('EMP030', 'wfh_flex', []),
  // EMP031 – Patricia Nguyen
  ...makeRecords('EMP031', 'office_regular', ['2024-09-23']),
  // EMP032 – Michael Carpenter
  ...makeRecords('EMP032', 'office_regular', []),
  // EMP033 – Yuki Tanaka
  ...makeRecords('EMP033', 'hybrid', ['2024-09-16']),
  // EMP034 – Amara Diallo
  ...makeRecords('EMP034', 'office_regular', ['2024-09-24']),
  // EMP035 – Kevin Stein
  ...makeRecords('EMP035', 'wfh_flex', ['2024-10-07']),
  // EMP036 – Rosa Castellano
  ...makeRecords('EMP036', 'wfh_flex', []),
  // EMP037 – Ian Fletcher
  ...makeRecords('EMP037', 'office_regular', []),
  // EMP038 – Zoe Papadopoulos
  ...makeRecords('EMP038', 'hybrid', ['2024-09-11', '2024-09-12']),
  // EMP039 – Hassan Ibrahim
  ...makeRecords('EMP039', 'wfh_flex', []),
  // EMP040 – Laura Whitfield
  ...makeRecords('EMP040', 'hybrid', ['2024-09-23', '2024-09-24']),
];
