// Simple API test script
const http = require('http');

function testEndpoint(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 5000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(responseData);
          console.log(`${method} ${path} - Status: ${res.statusCode}`);
          console.log('Response:', jsonData);
          console.log('---');
          resolve(jsonData);
        } catch (error) {
          console.log(`${method} ${path} - Status: ${res.statusCode}`);
          console.log('Raw Response:', responseData);
          console.log('---');
          resolve(responseData);
        }
      });
    });

    req.on('error', (error) => {
      console.error(`Error testing ${path}:`, error.message);
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Testing College Marketplace API...\n');
  
  try {
    // Test basic endpoints
    await testEndpoint('/');
    await testEndpoint('/api/health');
    await testEndpoint('/api/products');
    
    console.log('✅ Basic API tests completed successfully!');
    
  } catch (error) {
    console.error('❌ API tests failed:', error.message);
  }
}

// Give server a moment to start
setTimeout(runTests, 2000);
