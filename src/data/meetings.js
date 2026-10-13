/**
 * meetings.js
 * Meeting records for the Workplace Efficiency & Sustainability Dashboard.
 *
 * meetingEffectiveness = (averageFeedbackScore / 5) * 100
 * feedbackScore: 1–5 scale.
 * meetingType: 'standup' | 'planning' | 'review' | 'one-on-one' | 'all-hands' | 'training' | 'client'
 * status: 'completed' | 'cancelled'
 */

export const meetings = [
  // Week 1: 2024-09-02
  {
    id: 'MTG001', date: '2024-09-02', title: 'Engineering Weekly Standup',
    organizerId: 'EMP005', participantIds: ['EMP005','EMP006','EMP007','EMP008','EMP009'],
    durationMinutes: 30, meetingType: 'standup', feedbackScore: 4.2, status: 'completed',
  },
  {
    id: 'MTG002', date: '2024-09-02', title: 'Q3 Sprint Planning',
    organizerId: 'EMP005', participantIds: ['EMP005','EMP006','EMP007','EMP008','EMP009','EMP040'],
    durationMinutes: 90, meetingType: 'planning', feedbackScore: 3.8, status: 'completed',
  },
  {
    id: 'MTG003', date: '2024-09-03', title: 'Sales Team Sync',
    organizerId: 'EMP021', participantIds: ['EMP021','EMP022','EMP023','EMP024','EMP025'],
    durationMinutes: 45, meetingType: 'standup', feedbackScore: 4.5, status: 'completed',
  },
  {
    id: 'MTG004', date: '2024-09-03', title: 'Marketing Content Review',
    organizerId: 'EMP014', participantIds: ['EMP014','EMP015','EMP016','EMP017','EMP018','EMP019'],
    durationMinutes: 60, meetingType: 'review', feedbackScore: 4.0, status: 'completed',
  },
  {
    id: 'MTG005', date: '2024-09-04', title: 'Finance Monthly Review',
    organizerId: 'EMP027', participantIds: ['EMP027','EMP028','EMP029','EMP030','EMP031'],
    durationMinutes: 75, meetingType: 'review', feedbackScore: 3.6, status: 'completed',
  },
  {
    id: 'MTG006', date: '2024-09-04', title: '1:1 Lucas & Aisha',
    organizerId: 'EMP005', participantIds: ['EMP005','EMP006'],
    durationMinutes: 30, meetingType: 'one-on-one', feedbackScore: 4.8, status: 'completed',
  },
  {
    id: 'MTG007', date: '2024-09-05', title: 'Company All-Hands',
    organizerId: 'EMP001', participantIds: ['EMP001','EMP002','EMP003','EMP004','EMP005','EMP006','EMP007','EMP008','EMP009','EMP010','EMP011','EMP012','EMP013','EMP014','EMP015','EMP016','EMP017','EMP018','EMP019','EMP020'],
    durationMinutes: 120, meetingType: 'all-hands', feedbackScore: 3.9, status: 'completed',
  },
  {
    id: 'MTG008', date: '2024-09-05', title: 'Platform Team Standup',
    organizerId: 'EMP010', participantIds: ['EMP010','EMP011','EMP012','EMP013'],
    durationMinutes: 20, meetingType: 'standup', feedbackScore: 4.6, status: 'completed',
  },
  // Week 2: 2024-09-09
  {
    id: 'MTG009', date: '2024-09-09', title: 'Engineering Weekly Standup',
    organizerId: 'EMP005', participantIds: ['EMP005','EMP006','EMP007','EMP008','EMP009'],
    durationMinutes: 30, meetingType: 'standup', feedbackScore: 4.0, status: 'completed',
  },
  {
    id: 'MTG010', date: '2024-09-10', title: 'Operations Weekly Review',
    organizerId: 'EMP033', participantIds: ['EMP033','EMP034','EMP035','EMP036','EMP037'],
    durationMinutes: 60, meetingType: 'review', feedbackScore: 3.7, status: 'completed',
  },
  {
    id: 'MTG011', date: '2024-09-10', title: 'HR Policy Update',
    organizerId: 'EMP001', participantIds: ['EMP001','EMP002','EMP003'],
    durationMinutes: 45, meetingType: 'planning', feedbackScore: 4.1, status: 'completed',
  },
  {
    id: 'MTG012', date: '2024-09-11', title: 'Sales Pipeline Review',
    organizerId: 'EMP020', participantIds: ['EMP020','EMP021','EMP022','EMP023','EMP024','EMP025','EMP026'],
    durationMinutes: 90, meetingType: 'review', feedbackScore: 4.3, status: 'completed',
  },
  {
    id: 'MTG013', date: '2024-09-11', title: '1:1 Sophie & Aisha',
    organizerId: 'EMP005', participantIds: ['EMP005','EMP007'],
    durationMinutes: 30, meetingType: 'one-on-one', feedbackScore: 4.7, status: 'completed',
  },
  {
    id: 'MTG014', date: '2024-09-12', title: 'DevOps Incident Review',
    organizerId: 'EMP010', participantIds: ['EMP010','EMP011','EMP012'],
    durationMinutes: 60, meetingType: 'review', feedbackScore: 3.5, status: 'completed',
  },
  {
    id: 'MTG015', date: '2024-09-12', title: 'Marketing Campaign Kickoff',
    organizerId: 'EMP014', participantIds: ['EMP014','EMP015','EMP016','EMP017'],
    durationMinutes: 75, meetingType: 'planning', feedbackScore: 4.4, status: 'completed',
  },
  {
    id: 'MTG016', date: '2024-09-13', title: 'Platform Team Standup',
    organizerId: 'EMP010', participantIds: ['EMP010','EMP011','EMP012','EMP013'],
    durationMinutes: 20, meetingType: 'standup', feedbackScore: 4.5, status: 'completed',
  },
  // Week 3: 2024-09-16
  {
    id: 'MTG017', date: '2024-09-16', title: 'Engineering Weekly Standup',
    organizerId: 'EMP005', participantIds: ['EMP005','EMP006','EMP007','EMP008','EMP009'],
    durationMinutes: 30, meetingType: 'standup', feedbackScore: 3.9, status: 'completed',
  },
  {
    id: 'MTG018', date: '2024-09-17', title: 'Leadership Strategy Review',
    organizerId: 'EMP004', participantIds: ['EMP004','EMP005','EMP010','EMP014','EMP020','EMP027','EMP032'],
    durationMinutes: 120, meetingType: 'planning', feedbackScore: 4.2, status: 'completed',
  },
  {
    id: 'MTG019', date: '2024-09-17', title: 'Client Call – Acme Partners',
    organizerId: 'EMP026', participantIds: ['EMP026','EMP020','EMP021'],
    durationMinutes: 60, meetingType: 'client', feedbackScore: 4.6, status: 'completed',
  },
  {
    id: 'MTG020', date: '2024-09-18', title: 'Finance Risk Assessment',
    organizerId: 'EMP027', participantIds: ['EMP027','EMP028','EMP029'],
    durationMinutes: 90, meetingType: 'review', feedbackScore: 3.8, status: 'completed',
  },
  {
    id: 'MTG021', date: '2024-09-18', title: 'Training: Data Privacy',
    organizerId: 'EMP001', participantIds: ['EMP001','EMP002','EMP003','EMP004','EMP005','EMP006','EMP007'],
    durationMinutes: 60, meetingType: 'training', feedbackScore: 4.0, status: 'completed',
  },
  {
    id: 'MTG022', date: '2024-09-19', title: 'Sales Forecasting',
    organizerId: 'EMP020', participantIds: ['EMP020','EMP021','EMP026'],
    durationMinutes: 60, meetingType: 'planning', feedbackScore: 4.1, status: 'completed',
  },
  {
    id: 'MTG023', date: '2024-09-19', title: '1:1 Raj & Aisha',
    organizerId: 'EMP005', participantIds: ['EMP005','EMP008'],
    durationMinutes: 30, meetingType: 'one-on-one', feedbackScore: 4.3, status: 'completed',
  },
  {
    id: 'MTG024', date: '2024-09-20', title: 'Operations Cancelled Sync',
    organizerId: 'EMP033', participantIds: ['EMP033','EMP034','EMP035'],
    durationMinutes: 45, meetingType: 'standup', feedbackScore: null, status: 'cancelled',
  },
  // Week 4: 2024-09-23
  {
    id: 'MTG025', date: '2024-09-23', title: 'Engineering Weekly Standup',
    organizerId: 'EMP005', participantIds: ['EMP005','EMP006','EMP007','EMP008','EMP009'],
    durationMinutes: 30, meetingType: 'standup', feedbackScore: 4.4, status: 'completed',
  },
  {
    id: 'MTG026', date: '2024-09-23', title: 'Sprint Retrospective',
    organizerId: 'EMP005', participantIds: ['EMP005','EMP006','EMP007','EMP008','EMP009','EMP040'],
    durationMinutes: 60, meetingType: 'review', feedbackScore: 4.5, status: 'completed',
  },
  {
    id: 'MTG027', date: '2024-09-24', title: 'Marketing SEO Workshop',
    organizerId: 'EMP016', participantIds: ['EMP016','EMP015','EMP018','EMP019'],
    durationMinutes: 90, meetingType: 'training', feedbackScore: 4.7, status: 'completed',
  },
  {
    id: 'MTG028', date: '2024-09-24', title: 'Operations Vendor Review',
    organizerId: 'EMP032', participantIds: ['EMP032','EMP039','EMP033'],
    durationMinutes: 60, meetingType: 'review', feedbackScore: 3.9, status: 'completed',
  },
  {
    id: 'MTG029', date: '2024-09-25', title: 'Client Presentation – Beta Corp',
    organizerId: 'EMP021', participantIds: ['EMP021','EMP022','EMP024','EMP020'],
    durationMinutes: 75, meetingType: 'client', feedbackScore: 4.8, status: 'completed',
  },
  {
    id: 'MTG030', date: '2024-09-25', title: '1:1 Fatima & Tom',
    organizerId: 'EMP010', participantIds: ['EMP010','EMP011'],
    durationMinutes: 30, meetingType: 'one-on-one', feedbackScore: 4.6, status: 'completed',
  },
  {
    id: 'MTG031', date: '2024-09-26', title: 'Platform Team Standup',
    organizerId: 'EMP010', participantIds: ['EMP010','EMP011','EMP012','EMP013'],
    durationMinutes: 20, meetingType: 'standup', feedbackScore: 4.3, status: 'completed',
  },
  {
    id: 'MTG032', date: '2024-09-26', title: 'Finance Q3 Close',
    organizerId: 'EMP027', participantIds: ['EMP027','EMP028','EMP029','EMP030','EMP031'],
    durationMinutes: 120, meetingType: 'review', feedbackScore: 4.0, status: 'completed',
  },
  {
    id: 'MTG033', date: '2024-09-27', title: 'Training: Leadership Essentials',
    organizerId: 'EMP001', participantIds: ['EMP004','EMP005','EMP010','EMP014','EMP020','EMP021','EMP027','EMP032','EMP033'],
    durationMinutes: 90, meetingType: 'training', feedbackScore: 4.2, status: 'completed',
  },
  // Week 5: 2024-09-30
  {
    id: 'MTG034', date: '2024-09-30', title: 'Engineering Weekly Standup',
    organizerId: 'EMP005', participantIds: ['EMP005','EMP006','EMP007','EMP008','EMP009'],
    durationMinutes: 30, meetingType: 'standup', feedbackScore: 4.1, status: 'completed',
  },
  {
    id: 'MTG035', date: '2024-10-01', title: 'Q4 Planning Session',
    organizerId: 'EMP004', participantIds: ['EMP004','EMP005','EMP010','EMP006','EMP007','EMP008','EMP009','EMP011','EMP012','EMP013','EMP040'],
    durationMinutes: 150, meetingType: 'planning', feedbackScore: 4.3, status: 'completed',
  },
  {
    id: 'MTG036', date: '2024-10-01', title: 'Sales Monthly Targets',
    organizerId: 'EMP020', participantIds: ['EMP020','EMP021','EMP022','EMP024','EMP025','EMP026'],
    durationMinutes: 60, meetingType: 'planning', feedbackScore: 4.0, status: 'completed',
  },
  {
    id: 'MTG037', date: '2024-10-02', title: 'HR Performance Review Prep',
    organizerId: 'EMP001', participantIds: ['EMP001','EMP002','EMP003'],
    durationMinutes: 90, meetingType: 'planning', feedbackScore: 4.4, status: 'completed',
  },
  {
    id: 'MTG038', date: '2024-10-02', title: '1:1 James & Tom',
    organizerId: 'EMP010', participantIds: ['EMP010','EMP012'],
    durationMinutes: 30, meetingType: 'one-on-one', feedbackScore: 4.5, status: 'completed',
  },
  {
    id: 'MTG039', date: '2024-10-03', title: 'Operations Quarterly Review',
    organizerId: 'EMP032', participantIds: ['EMP032','EMP033','EMP034','EMP035','EMP036','EMP037','EMP038','EMP039'],
    durationMinutes: 90, meetingType: 'review', feedbackScore: 3.8, status: 'completed',
  },
  {
    id: 'MTG040', date: '2024-10-03', title: 'Marketing Q4 Strategy',
    organizerId: 'EMP014', participantIds: ['EMP014','EMP015','EMP016','EMP017','EMP018','EMP019'],
    durationMinutes: 75, meetingType: 'planning', feedbackScore: 4.6, status: 'completed',
  },
  {
    id: 'MTG041', date: '2024-10-04', title: 'Client Demo – Nexus Ltd',
    organizerId: 'EMP006', participantIds: ['EMP006','EMP005','EMP026','EMP020'],
    durationMinutes: 60, meetingType: 'client', feedbackScore: 4.9, status: 'completed',
  },
  {
    id: 'MTG042', date: '2024-10-04', title: 'Platform Team Standup',
    organizerId: 'EMP010', participantIds: ['EMP010','EMP011','EMP012','EMP013'],
    durationMinutes: 20, meetingType: 'standup', feedbackScore: 4.4, status: 'completed',
  },
  // Week 6: 2024-10-07
  {
    id: 'MTG043', date: '2024-10-07', title: 'Engineering Weekly Standup',
    organizerId: 'EMP005', participantIds: ['EMP005','EMP006','EMP007','EMP008','EMP009'],
    durationMinutes: 30, meetingType: 'standup', feedbackScore: 4.3, status: 'completed',
  },
  {
    id: 'MTG044', date: '2024-10-07', title: 'Company All-Hands Q4',
    organizerId: 'EMP001', participantIds: ['EMP001','EMP002','EMP003','EMP004','EMP005','EMP006','EMP007','EMP008','EMP009','EMP010','EMP011','EMP012','EMP013','EMP014','EMP015','EMP016','EMP017','EMP018','EMP019','EMP020','EMP021','EMP022','EMP023','EMP024','EMP025','EMP026','EMP027','EMP028','EMP029','EMP030','EMP031','EMP032'],
    durationMinutes: 120, meetingType: 'all-hands', feedbackScore: 4.1, status: 'completed',
  },
  {
    id: 'MTG045', date: '2024-10-08', title: 'Finance Audit Prep',
    organizerId: 'EMP027', participantIds: ['EMP027','EMP028','EMP029','EMP030'],
    durationMinutes: 90, meetingType: 'review', feedbackScore: 3.9, status: 'completed',
  },
  {
    id: 'MTG046', date: '2024-10-08', title: 'Sales Deal Review',
    organizerId: 'EMP021', participantIds: ['EMP021','EMP022','EMP024','EMP025'],
    durationMinutes: 60, meetingType: 'review', feedbackScore: 4.2, status: 'completed',
  },
  {
    id: 'MTG047', date: '2024-10-09', title: '1:1 Olivia & Aisha',
    organizerId: 'EMP005', participantIds: ['EMP005','EMP009'],
    durationMinutes: 30, meetingType: 'one-on-one', feedbackScore: 4.7, status: 'completed',
  },
  {
    id: 'MTG048', date: '2024-10-09', title: 'Training: Agile Fundamentals',
    organizerId: 'EMP005', participantIds: ['EMP006','EMP007','EMP008','EMP009','EMP011','EMP012','EMP013','EMP040'],
    durationMinutes: 90, meetingType: 'training', feedbackScore: 4.5, status: 'completed',
  },
  {
    id: 'MTG049', date: '2024-10-10', title: 'Operations Safety Review',
    organizerId: 'EMP033', participantIds: ['EMP033','EMP034','EMP035','EMP037'],
    durationMinutes: 45, meetingType: 'review', feedbackScore: 4.0, status: 'completed',
  },
  {
    id: 'MTG050', date: '2024-10-10', title: 'Marketing Analytics Review',
    organizerId: 'EMP016', participantIds: ['EMP016','EMP018','EMP015'],
    durationMinutes: 60, meetingType: 'review', feedbackScore: 4.3, status: 'completed',
  },
  {
    id: 'MTG051', date: '2024-10-11', title: 'Platform Team Standup',
    organizerId: 'EMP010', participantIds: ['EMP010','EMP011','EMP012','EMP013'],
    durationMinutes: 20, meetingType: 'standup', feedbackScore: 4.6, status: 'completed',
  },
  {
    id: 'MTG052', date: '2024-10-11', title: 'Cross-Dept Sustainability Review',
    organizerId: 'EMP001', participantIds: ['EMP001','EMP032','EMP033','EMP027','EMP004'],
    durationMinutes: 60, meetingType: 'review', feedbackScore: 4.2, status: 'completed',
  },
];
