/**
 * server.js
 * Starts the Express HTTP server.
 */

import { config } from 'dotenv';
config();

import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Workplace Dashboard API running on http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  console.log(`   ⚠️  Sessions are in-memory and will reset on server restart.`);
});
