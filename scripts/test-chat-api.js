// Test Chat API Endpoint
// Usage: node scripts/test-chat-api.js

async function testChatAPI() {
  console.log('🚀 Testing /api/chat endpoints...');

  // Test 1: GET /verify
  console.log('\n--- Test 1: GET /api/chat?action=verify ---');
  try {
    const resp1 = await fetch('http://localhost:3000/api/chat?action=verify');
    console.log(`📡 GET Verification Status: ${resp1.status}`);
    const text1 = await resp1.text();
    console.log(`📄 GET Body: ${text1}`);
  } catch (e) {
    console.error('❌ GET Test Failed:', e);
  }

  // Test 2: POST /chat
  console.log('\n--- Test 2: POST /api/chat ---');
  const url = 'http://localhost:3000/api/chat';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': 'chat_allowed=true' // Required for verification check
      },
      body: JSON.stringify({
        message: 'What is the Yaksen Framework?'
      })
    });

    console.log(`📡 POST Response Status: ${response.status}`);

    // Attempt to read text regardless of status to see errors
    const text = await response.text();
    console.log(`📄 POST Body: ${text.substring(0, 500)}...`);

    if (response.ok) {
      console.log('✅ Success! Request processed.');
    } else {
      console.log('❌ POST Request failed.');
    }
  } catch (error) {
    console.error('❌ Network/Fetch Error:', error);
  }
}

testChatAPI();
