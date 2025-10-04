require('dotenv').config();
const fetch = require('node-fetch');

async function testAPI() {
  console.log('🔍 Testing API endpoint...');
  
  try {
    const response = await fetch('http://localhost:3000/api/openrouter', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ 
        prompt: 'Hello, this is a test message' 
      }),
    });

    console.log('✅ Request sent successfully');
    console.log('📊 Status:', response.status);
    
    const contentType = response.headers.get('content-type');
    console.log('📋 Content-Type:', contentType);
    
    const responseText = await response.text();
    console.log('📄 Raw Response:', responseText);

    try {
      // Try to parse as JSON if possible
      const data = JSON.parse(responseText);
      console.log('📦 Parsed JSON:', JSON.stringify(data, null, 2));
    } catch (e) {
      console.log('⚠️ Response is not valid JSON');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.code) {
      console.error('Error code:', error.code);
    }
    console.error('Stack:', error.stack);
  }
}

// Run the test
testAPI().catch(console.error);