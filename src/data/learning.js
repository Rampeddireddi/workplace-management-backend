/**
 * learning.js
 * Course enrollment records for all employees.
 * status: 'enrolled' | 'in-progress' | 'completed'
 * completionRate = completed / (enrolled + in-progress + completed) * 100
 */

export const learning = [
  // EMP001 – Diana Reeves
  { id:'LRN001', employeeId:'EMP001', courseId:'CRS001', courseName:'Leadership Excellence', category:'Leadership', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-20', learningHours:8, progressPercentage:100 },
  { id:'LRN002', employeeId:'EMP001', courseId:'CRS008', courseName:'Workplace Inclusion & Diversity', category:'HR', status:'completed', enrollmentDate:'2024-09-05', completionDate:'2024-09-25', learningHours:6, progressPercentage:100 },
  { id:'LRN003', employeeId:'EMP001', courseId:'CRS015', courseName:'Strategic Workforce Planning', category:'HR', status:'in-progress', enrollmentDate:'2024-10-01', completionDate:null, learningHours:3, progressPercentage:50 },

  // EMP002 – Marcus Webb
  { id:'LRN004', employeeId:'EMP002', courseId:'CRS008', courseName:'Workplace Inclusion & Diversity', category:'HR', status:'completed', enrollmentDate:'2024-09-03', completionDate:'2024-09-18', learningHours:6, progressPercentage:100 },
  { id:'LRN005', employeeId:'EMP002', courseId:'CRS010', courseName:'Conflict Resolution', category:'HR', status:'in-progress', enrollmentDate:'2024-09-20', completionDate:null, learningHours:2, progressPercentage:40 },

  // EMP003 – Priya Nair
  { id:'LRN006', employeeId:'EMP003', courseId:'CRS009', courseName:'Talent Acquisition Masterclass', category:'HR', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-16', learningHours:10, progressPercentage:100 },
  { id:'LRN007', employeeId:'EMP003', courseId:'CRS008', courseName:'Workplace Inclusion & Diversity', category:'HR', status:'completed', enrollmentDate:'2024-09-17', completionDate:'2024-10-01', learningHours:6, progressPercentage:100 },
  { id:'LRN008', employeeId:'EMP003', courseId:'CRS015', courseName:'Strategic Workforce Planning', category:'HR', status:'enrolled', enrollmentDate:'2024-10-07', completionDate:null, learningHours:0, progressPercentage:0 },

  // EMP004 – Nathan Clarke
  { id:'LRN009', employeeId:'EMP004', courseId:'CRS001', courseName:'Leadership Excellence', category:'Leadership', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-20', learningHours:8, progressPercentage:100 },
  { id:'LRN010', employeeId:'EMP004', courseId:'CRS002', courseName:'Cloud Architecture Fundamentals', category:'Technology', status:'completed', enrollmentDate:'2024-09-23', completionDate:'2024-10-07', learningHours:12, progressPercentage:100 },
  { id:'LRN011', employeeId:'EMP004', courseId:'CRS016', courseName:'Executive Communication', category:'Leadership', status:'in-progress', enrollmentDate:'2024-10-08', completionDate:null, learningHours:2, progressPercentage:25 },

  // EMP005 – Aisha Patel
  { id:'LRN012', employeeId:'EMP005', courseId:'CRS001', courseName:'Leadership Excellence', category:'Leadership', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-19', learningHours:8, progressPercentage:100 },
  { id:'LRN013', employeeId:'EMP005', courseId:'CRS003', courseName:'Agile & Scrum Mastery', category:'Technology', status:'completed', enrollmentDate:'2024-09-09', completionDate:'2024-09-27', learningHours:10, progressPercentage:100 },
  { id:'LRN014', employeeId:'EMP005', courseId:'CRS004', courseName:'Effective Feedback & Coaching', category:'Leadership', status:'in-progress', enrollmentDate:'2024-10-01', completionDate:null, learningHours:3, progressPercentage:60 },

  // EMP006 – Lucas Ferreira
  { id:'LRN015', employeeId:'EMP006', courseId:'CRS003', courseName:'Agile & Scrum Mastery', category:'Technology', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-20', learningHours:10, progressPercentage:100 },
  { id:'LRN016', employeeId:'EMP006', courseId:'CRS005', courseName:'React Advanced Patterns', category:'Technology', status:'completed', enrollmentDate:'2024-09-23', completionDate:'2024-10-08', learningHours:15, progressPercentage:100 },
  { id:'LRN017', employeeId:'EMP006', courseId:'CRS006', courseName:'System Design Principles', category:'Technology', status:'in-progress', enrollmentDate:'2024-10-09', completionDate:null, learningHours:4, progressPercentage:30 },

  // EMP007 – Sophie Chen
  { id:'LRN018', employeeId:'EMP007', courseId:'CRS003', courseName:'Agile & Scrum Mastery', category:'Technology', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-18', learningHours:10, progressPercentage:100 },
  { id:'LRN019', employeeId:'EMP007', courseId:'CRS005', courseName:'React Advanced Patterns', category:'Technology', status:'in-progress', enrollmentDate:'2024-09-23', completionDate:null, learningHours:8, progressPercentage:55 },

  // EMP008 – Raj Mehta
  { id:'LRN020', employeeId:'EMP008', courseId:'CRS005', courseName:'React Advanced Patterns', category:'Technology', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-25', learningHours:15, progressPercentage:100 },
  { id:'LRN021', employeeId:'EMP008', courseId:'CRS003', courseName:'Agile & Scrum Mastery', category:'Technology', status:'completed', enrollmentDate:'2024-09-16', completionDate:'2024-10-04', learningHours:10, progressPercentage:100 },
  { id:'LRN022', employeeId:'EMP008', courseId:'CRS007', courseName:'Accessibility in Web Design', category:'Design', status:'enrolled', enrollmentDate:'2024-10-09', completionDate:null, learningHours:0, progressPercentage:0 },

  // EMP009 – Olivia Grant
  { id:'LRN023', employeeId:'EMP009', courseId:'CRS006', courseName:'System Design Principles', category:'Technology', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-30', learningHours:12, progressPercentage:100 },
  { id:'LRN024', employeeId:'EMP009', courseId:'CRS003', courseName:'Agile & Scrum Mastery', category:'Technology', status:'in-progress', enrollmentDate:'2024-10-01', completionDate:null, learningHours:4, progressPercentage:40 },

  // EMP010 – Tom Nakamura
  { id:'LRN025', employeeId:'EMP010', courseId:'CRS001', courseName:'Leadership Excellence', category:'Leadership', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-19', learningHours:8, progressPercentage:100 },
  { id:'LRN026', employeeId:'EMP010', courseId:'CRS002', courseName:'Cloud Architecture Fundamentals', category:'Technology', status:'completed', enrollmentDate:'2024-09-20', completionDate:'2024-10-07', learningHours:12, progressPercentage:100 },

  // EMP011 – Fatima Al-Hassan
  { id:'LRN027', employeeId:'EMP011', courseId:'CRS011', courseName:'Kubernetes & Containerization', category:'Technology', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-23', learningHours:14, progressPercentage:100 },
  { id:'LRN028', employeeId:'EMP011', courseId:'CRS002', courseName:'Cloud Architecture Fundamentals', category:'Technology', status:'in-progress', enrollmentDate:'2024-09-24', completionDate:null, learningHours:5, progressPercentage:45 },

  // EMP012 – James Osei
  { id:'LRN029', employeeId:'EMP012', courseId:'CRS011', courseName:'Kubernetes & Containerization', category:'Technology', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-27', learningHours:14, progressPercentage:100 },
  { id:'LRN030', employeeId:'EMP012', courseId:'CRS012', courseName:'Monitoring & Observability', category:'Technology', status:'completed', enrollmentDate:'2024-09-30', completionDate:'2024-10-10', learningHours:8, progressPercentage:100 },

  // EMP013 – Mei Lin
  { id:'LRN031', employeeId:'EMP013', courseId:'CRS013', courseName:'Test Automation Fundamentals', category:'Technology', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-20', learningHours:10, progressPercentage:100 },
  { id:'LRN032', employeeId:'EMP013', courseId:'CRS003', courseName:'Agile & Scrum Mastery', category:'Technology', status:'enrolled', enrollmentDate:'2024-10-07', completionDate:null, learningHours:0, progressPercentage:0 },

  // EMP014 – Grace Holloway
  { id:'LRN033', employeeId:'EMP014', courseId:'CRS001', courseName:'Leadership Excellence', category:'Leadership', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-18', learningHours:8, progressPercentage:100 },
  { id:'LRN034', employeeId:'EMP014', courseId:'CRS014', courseName:'Digital Marketing Strategy', category:'Marketing', status:'completed', enrollmentDate:'2024-09-20', completionDate:'2024-10-04', learningHours:10, progressPercentage:100 },

  // EMP015 – Carlos Rivera
  { id:'LRN035', employeeId:'EMP015', courseId:'CRS014', courseName:'Digital Marketing Strategy', category:'Marketing', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-23', learningHours:10, progressPercentage:100 },
  { id:'LRN036', employeeId:'EMP015', courseId:'CRS017', courseName:'Content Writing & SEO', category:'Marketing', status:'in-progress', enrollmentDate:'2024-09-24', completionDate:null, learningHours:4, progressPercentage:50 },

  // EMP016 – Helena Kim
  { id:'LRN037', employeeId:'EMP016', courseId:'CRS017', courseName:'Content Writing & SEO', category:'Marketing', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-20', learningHours:8, progressPercentage:100 },
  { id:'LRN038', employeeId:'EMP016', courseId:'CRS018', courseName:'Data Analytics for Marketers', category:'Marketing', status:'completed', enrollmentDate:'2024-09-23', completionDate:'2024-10-07', learningHours:12, progressPercentage:100 },

  // EMP017 – Samuel Adeyemi
  { id:'LRN039', employeeId:'EMP017', courseId:'CRS014', courseName:'Digital Marketing Strategy', category:'Marketing', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-25', learningHours:10, progressPercentage:100 },
  { id:'LRN040', employeeId:'EMP017', courseId:'CRS019', courseName:'Brand Management', category:'Marketing', status:'in-progress', enrollmentDate:'2024-09-30', completionDate:null, learningHours:3, progressPercentage:35 },

  // EMP018 – Isabelle Fontaine
  { id:'LRN041', employeeId:'EMP018', courseId:'CRS017', courseName:'Content Writing & SEO', category:'Marketing', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-19', learningHours:8, progressPercentage:100 },
  { id:'LRN042', employeeId:'EMP018', courseId:'CRS018', courseName:'Data Analytics for Marketers', category:'Marketing', status:'enrolled', enrollmentDate:'2024-10-07', completionDate:null, learningHours:0, progressPercentage:0 },

  // EMP019 – David Okonkwo
  { id:'LRN043', employeeId:'EMP019', courseId:'CRS014', courseName:'Digital Marketing Strategy', category:'Marketing', status:'in-progress', enrollmentDate:'2024-09-09', completionDate:null, learningHours:5, progressPercentage:60 },

  // EMP020 – Robert Saunders
  { id:'LRN044', employeeId:'EMP020', courseId:'CRS001', courseName:'Leadership Excellence', category:'Leadership', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-20', learningHours:8, progressPercentage:100 },
  { id:'LRN045', employeeId:'EMP020', courseId:'CRS020', courseName:'Sales Leadership Mastery', category:'Sales', status:'completed', enrollmentDate:'2024-09-23', completionDate:'2024-10-09', learningHours:12, progressPercentage:100 },

  // EMP021 – Alicia Moreno
  { id:'LRN046', employeeId:'EMP021', courseId:'CRS020', courseName:'Sales Leadership Mastery', category:'Sales', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-23', learningHours:12, progressPercentage:100 },
  { id:'LRN047', employeeId:'EMP021', courseId:'CRS021', courseName:'Negotiation & Closing Techniques', category:'Sales', status:'in-progress', enrollmentDate:'2024-09-24', completionDate:null, learningHours:4, progressPercentage:40 },

  // EMP022 – Tyler Brooks
  { id:'LRN048', employeeId:'EMP022', courseId:'CRS021', courseName:'Negotiation & Closing Techniques', category:'Sales', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-25', learningHours:8, progressPercentage:100 },
  { id:'LRN049', employeeId:'EMP022', courseId:'CRS022', courseName:'CRM Mastery', category:'Sales', status:'in-progress', enrollmentDate:'2024-10-01', completionDate:null, learningHours:2, progressPercentage:25 },

  // EMP023 – Nadia Kovacs
  { id:'LRN050', employeeId:'EMP023', courseId:'CRS022', courseName:'CRM Mastery', category:'Sales', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-20', learningHours:6, progressPercentage:100 },
  { id:'LRN051', employeeId:'EMP023', courseId:'CRS021', courseName:'Negotiation & Closing Techniques', category:'Sales', status:'enrolled', enrollmentDate:'2024-10-07', completionDate:null, learningHours:0, progressPercentage:0 },

  // EMP024 – Derek Mensah
  { id:'LRN052', employeeId:'EMP024', courseId:'CRS021', courseName:'Negotiation & Closing Techniques', category:'Sales', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-24', learningHours:8, progressPercentage:100 },
  { id:'LRN053', employeeId:'EMP024', courseId:'CRS022', courseName:'CRM Mastery', category:'Sales', status:'completed', enrollmentDate:'2024-09-25', completionDate:'2024-10-10', learningHours:6, progressPercentage:100 },

  // EMP025 – Sarah Lindqvist
  { id:'LRN054', employeeId:'EMP025', courseId:'CRS022', courseName:'CRM Mastery', category:'Sales', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-19', learningHours:6, progressPercentage:100 },
  { id:'LRN055', employeeId:'EMP025', courseId:'CRS023', courseName:'Customer Success Fundamentals', category:'Sales', status:'in-progress', enrollmentDate:'2024-09-23', completionDate:null, learningHours:4, progressPercentage:55 },

  // EMP026 – Victor Huang
  { id:'LRN056', employeeId:'EMP026', courseId:'CRS020', courseName:'Sales Leadership Mastery', category:'Sales', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-27', learningHours:12, progressPercentage:100 },

  // EMP027 – Eleanor Vance
  { id:'LRN057', employeeId:'EMP027', courseId:'CRS001', courseName:'Leadership Excellence', category:'Leadership', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-18', learningHours:8, progressPercentage:100 },
  { id:'LRN058', employeeId:'EMP027', courseId:'CRS024', courseName:'Financial Risk Management', category:'Finance', status:'completed', enrollmentDate:'2024-09-20', completionDate:'2024-10-07', learningHours:14, progressPercentage:100 },

  // EMP028 – Benjamin Torres
  { id:'LRN059', employeeId:'EMP028', courseId:'CRS024', courseName:'Financial Risk Management', category:'Finance', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-24', learningHours:14, progressPercentage:100 },
  { id:'LRN060', employeeId:'EMP028', courseId:'CRS025', courseName:'Advanced Excel for Finance', category:'Finance', status:'in-progress', enrollmentDate:'2024-09-25', completionDate:null, learningHours:4, progressPercentage:45 },

  // EMP029 – Chloe Dupont
  { id:'LRN061', employeeId:'EMP029', courseId:'CRS025', courseName:'Advanced Excel for Finance', category:'Finance', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-20', learningHours:8, progressPercentage:100 },
  { id:'LRN062', employeeId:'EMP029', courseId:'CRS024', courseName:'Financial Risk Management', category:'Finance', status:'enrolled', enrollmentDate:'2024-10-07', completionDate:null, learningHours:0, progressPercentage:0 },

  // EMP030 – Ahmed Khalil
  { id:'LRN063', employeeId:'EMP030', courseId:'CRS025', courseName:'Advanced Excel for Finance', category:'Finance', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-23', learningHours:8, progressPercentage:100 },
  { id:'LRN064', employeeId:'EMP030', courseId:'CRS026', courseName:'Budget Planning & Forecasting', category:'Finance', status:'in-progress', enrollmentDate:'2024-09-24', completionDate:null, learningHours:3, progressPercentage:35 },

  // EMP031 – Patricia Nguyen
  { id:'LRN065', employeeId:'EMP031', courseId:'CRS025', courseName:'Advanced Excel for Finance', category:'Finance', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-18', learningHours:8, progressPercentage:100 },

  // EMP032 – Michael Carpenter
  { id:'LRN066', employeeId:'EMP032', courseId:'CRS001', courseName:'Leadership Excellence', category:'Leadership', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-19', learningHours:8, progressPercentage:100 },
  { id:'LRN067', employeeId:'EMP032', courseId:'CRS027', courseName:'Operations Excellence', category:'Operations', status:'completed', enrollmentDate:'2024-09-23', completionDate:'2024-10-08', learningHours:12, progressPercentage:100 },

  // EMP033 – Yuki Tanaka
  { id:'LRN068', employeeId:'EMP033', courseId:'CRS027', courseName:'Operations Excellence', category:'Operations', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-25', learningHours:12, progressPercentage:100 },
  { id:'LRN069', employeeId:'EMP033', courseId:'CRS001', courseName:'Leadership Excellence', category:'Leadership', status:'in-progress', enrollmentDate:'2024-09-30', completionDate:null, learningHours:4, progressPercentage:50 },

  // EMP034 – Amara Diallo
  { id:'LRN070', employeeId:'EMP034', courseId:'CRS028', courseName:'Supply Chain Analytics', category:'Operations', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-24', learningHours:10, progressPercentage:100 },
  { id:'LRN071', employeeId:'EMP034', courseId:'CRS027', courseName:'Operations Excellence', category:'Operations', status:'in-progress', enrollmentDate:'2024-09-25', completionDate:null, learningHours:4, progressPercentage:40 },

  // EMP035 – Kevin Stein
  { id:'LRN072', employeeId:'EMP035', courseId:'CRS029', courseName:'Logistics & Transport Management', category:'Operations', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-20', learningHours:8, progressPercentage:100 },
  { id:'LRN073', employeeId:'EMP035', courseId:'CRS028', courseName:'Supply Chain Analytics', category:'Operations', status:'enrolled', enrollmentDate:'2024-10-07', completionDate:null, learningHours:0, progressPercentage:0 },

  // EMP036 – Rosa Castellano
  { id:'LRN074', employeeId:'EMP036', courseId:'CRS027', courseName:'Operations Excellence', category:'Operations', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-23', learningHours:12, progressPercentage:100 },
  { id:'LRN075', employeeId:'EMP036', courseId:'CRS030', courseName:'Lean Six Sigma Green Belt', category:'Operations', status:'in-progress', enrollmentDate:'2024-09-24', completionDate:null, learningHours:8, progressPercentage:65 },

  // EMP037 – Ian Fletcher
  { id:'LRN076', employeeId:'EMP037', courseId:'CRS029', courseName:'Logistics & Transport Management', category:'Operations', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-19', learningHours:8, progressPercentage:100 },

  // EMP038 – Zoe Papadopoulos
  { id:'LRN077', employeeId:'EMP038', courseId:'CRS031', courseName:'Business Analysis Essentials', category:'Operations', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-24', learningHours:10, progressPercentage:100 },
  { id:'LRN078', employeeId:'EMP038', courseId:'CRS018', courseName:'Data Analytics for Marketers', category:'Marketing', status:'in-progress', enrollmentDate:'2024-09-25', completionDate:null, learningHours:3, progressPercentage:30 },

  // EMP039 – Hassan Ibrahim
  { id:'LRN079', employeeId:'EMP039', courseId:'CRS029', courseName:'Logistics & Transport Management', category:'Operations', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-20', learningHours:8, progressPercentage:100 },
  { id:'LRN080', employeeId:'EMP039', courseId:'CRS031', courseName:'Business Analysis Essentials', category:'Operations', status:'enrolled', enrollmentDate:'2024-10-07', completionDate:null, learningHours:0, progressPercentage:0 },

  // EMP040 – Laura Whitfield
  { id:'LRN081', employeeId:'EMP040', courseId:'CRS032', courseName:'Data Engineering with Python', category:'Technology', status:'completed', enrollmentDate:'2024-09-02', completionDate:'2024-09-27', learningHours:16, progressPercentage:100 },
  { id:'LRN082', employeeId:'EMP040', courseId:'CRS002', courseName:'Cloud Architecture Fundamentals', category:'Technology', status:'in-progress', enrollmentDate:'2024-09-30', completionDate:null, learningHours:5, progressPercentage:45 },
];
