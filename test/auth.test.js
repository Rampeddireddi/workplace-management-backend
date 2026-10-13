import test from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';

async function createTestServer() {
  const server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  const { port } = server.address();
  return {
    server,
    url: `http://127.0.0.1:${port}`,
  };
}

async function login({ url, employeeId, password }) {
  const response = await fetch(`${url}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ employeeId, password }),
    credentials: 'include',
  });

  assert.equal(response.status, 200, `Login for ${employeeId} should succeed.`);

  const setCookie = response.headers.get('set-cookie');
  assert.ok(setCookie, 'Expected session cookie to be set after login.');

  return {
    cookie: setCookie.split(';')[0],
    body: await response.json(),
  };
}

test('employee login succeeds but team directory access is denied', async () => {
  const { server, url } = await createTestServer();

  try {
    const { cookie } = await login({
      url,
      employeeId: 'EMP006',
      password: 'demo-emp1-2024',
    });

    const response = await fetch(`${url}/api/people`, {
      headers: { Cookie: cookie },
      credentials: 'include',
    });

    assert.equal(response.status, 403);
    const json = await response.json();
    assert.match(json.error, /Access denied/i);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }
});

test('manager login can view scoped people records', async () => {
  const { server, url } = await createTestServer();

  try {
    const { cookie } = await login({
      url,
      employeeId: 'EMP005',
      password: 'demo-manager-2024',
    });

    const response = await fetch(`${url}/api/people`, {
      headers: { Cookie: cookie },
      credentials: 'include',
    });

    assert.equal(response.status, 200);
    const json = await response.json();
    assert.ok(json.employees.length >= 5, 'Manager should see their authorized team.');
    assert.equal(json.total, json.employees.length);
  } finally {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }
});

test('HR login can access organization-wide records and logout invalidates the session', async () => {
  const { server, url } = await createTestServer();

  try {
    const { cookie } = await login({
      url,
      employeeId: 'EMP001',
      password: 'demo-hr-2024',
    });

    const peopleResponse = await fetch(`${url}/api/people`, {
      headers: { Cookie: cookie },
      credentials: 'include',
    });

    assert.equal(peopleResponse.status, 200);
    const peopleJson = await peopleResponse.json();
    assert.ok(peopleJson.total > 0, 'HR should access the full organization roster.');

    const unauthorizedResponse = await fetch(`${url}/api/people/EMP006`, {
      headers: { Cookie: cookie },
      credentials: 'include',
    });
    assert.equal(unauthorizedResponse.status, 200, 'HR should be able to access an employee record in scope.');

    const logoutResponse = await fetch(`${url}/api/auth/logout`, {
      method: 'POST',
      headers: { Cookie: cookie },
      credentials: 'include',
    });
    assert.equal(logoutResponse.status, 200);

    const meResponse = await fetch(`${url}/api/auth/me`, {
      headers: { Cookie: cookie },
      credentials: 'include',
    });
    assert.equal(meResponse.status, 401, 'Logged out sessions should no longer be authorized.');
  } finally {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }
});

test('manager employee detail includes peer comparison ranking data', async () => {
  const { server, url } = await createTestServer();

  try {
    const { cookie } = await login({
      url,
      employeeId: 'EMP005',
      password: 'demo-manager-2024',
    });

    const response = await fetch(`${url}/api/people/EMP006`, {
      headers: { Cookie: cookie },
      credentials: 'include',
    });

    assert.equal(response.status, 200);
    const json = await response.json();
    assert.ok(json.comparison, 'Employee detail should include peer comparison data.');
    assert.ok(Object.keys(json.comparison).length > 0, 'Comparison data should include KPI metrics.');
    assert.ok(typeof json.comparison.meetings?.betterThanPercent === 'number', 'Meeting comparison should contain a percentile metric.');
  } finally {
    await new Promise((resolve, reject) => server.close((error) => (error ? reject(error) : resolve())));
  }
});
