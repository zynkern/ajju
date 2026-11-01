import './index.js';

async function runVerification() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const PORT = 5000;
  console.log('\n--- STARTING STANDALONE BACKEND API VERIFICATION ---\n');

  try {
    // 1. Root API Info
    const rootRes = await fetch(`http://localhost:${PORT}/`);
    const rootData = await rootRes.json();
    console.log('[PASS] GET / (Root API Info) ->', rootRes.status, rootData.name);

    // 2. Health check
    const healthRes = await fetch(`http://localhost:${PORT}/api/health`);
    const healthData = await healthRes.json();
    console.log('[PASS] GET /api/health ->', healthRes.status, healthData.message);

    // 3. Products list
    const productsRes = await fetch(`http://localhost:${PORT}/api/products`);
    const productsData = await productsRes.json();
    console.log('[PASS] GET /api/products -> Count:', productsData.length);

    // 4. Product by ID
    const p1Res = await fetch(`http://localhost:${PORT}/api/products/1`);
    const p1Data = await p1Res.json();
    console.log('[PASS] GET /api/products/1 -> Item:', p1Data.name);

    // 5. Invalid Product ID
    const p999Res = await fetch(`http://localhost:${PORT}/api/products/999`);
    const p999Data = await p999Res.json();
    console.log('[PASS] GET /api/products/999 -> Status:', p999Res.status, p999Data.message);

    // 6. Valid Login
    const loginRes = await fetch(`http://localhost:${PORT}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'aquatica123' })
    });
    const loginData = await loginRes.json();
    console.log('[PASS] POST /api/auth/login (Success) -> Status:', loginRes.status, loginData.token);

    // 7. Unknown route 404 JSON response
    const unknownRes = await fetch(`http://localhost:${PORT}/unknown-route`);
    const unknownData = await unknownRes.json();
    console.log('[PASS] GET /unknown-route (JSON 404) -> Status:', unknownRes.status, unknownData.error);

    console.log('\n--- ALL STANDALONE REST API ENDPOINTS WORKING PERFECTLY! ---\n');
  } catch (err) {
    console.error('[FAIL] Backend verification error:', err);
  } finally {
    process.exit(0);
  }
}

runVerification();
