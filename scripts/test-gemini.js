// Test Gemini API Connection
// Usage: node scripts/test-gemini.js

async function testGeminiAPI() {
    const apiKey = process.env.GEMINI_API_KEY || 'AIzaSyD5Dbtq1Sb1YkYvH8_b8ea00NL_5xg9Dmk';

    console.log('🔑 Testing Gemini API...');
    console.log(`API Key: ${apiKey.substring(0, 10)}...`);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: 'Say hello in one word.'
                    }]
                }]
            })
        });

        console.log(`📡 Response Status: ${response.status}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Error Response:', errorText);
            process.exit(1);
        }

        const data = await response.json();
        console.log('✅ Success! Response:', JSON.stringify(data, null, 2));

        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            console.log('✨ AI Response:', data.candidates[0].content.parts[0].text);
        }

        console.log('\n✅ Gemini API is working correctly!');
    } catch (error) {
        console.error('❌ Test failed:', error);
        process.exit(1);
    }
}

testGeminiAPI();
