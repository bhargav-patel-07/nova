const fetch = require('node-fetch');

async function testAPI() {
  console.log('🔍 Testing API endpoint with detailed debugging...');

  try {
    // First, let's check if the server is responding at all
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

    console.log('✅ Server responded');
    console.log('📊 Status:', response.status);
    console.log('📋 Headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('📄 Raw Response:', responseText);

    if (response.ok) {
      try {
        const data = JSON.parse(responseText);
        console.log('✅ Success! Parsed JSON response:');
        console.log(JSON.stringify(data, null, 2));
      } catch (parseError) {
        console.log('⚠️ Response is not valid JSON, but server responded successfully');
        console.log('Response preview:', responseText.substring(0, 200));
      }
    } else {
      console.log('❌ Server error response:');
      console.log('Response preview:', responseText.substring(0, 500));

      if (response.status === 500) {
        console.log('💡 This is likely a server-side error. Check your Next.js console for detailed error logs.');
      }
    }

  } catch (error) {
    console.error('❌ Network Error:', error.message);
    if (error.code) {
      console.error('Error code:', error.code);
    }
    console.error('💡 Make sure your Next.js server is running on port 3000');
    console.error('💡 Check if there are any CORS issues');
  }
}

// Run the test
testAPI().catch(console.error);
