import { useState } from 'react';
import { authAPI } from '../services/api';

const DebugAuth = () => {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testRegistration = async () => {
    setLoading(true);
    setResult('Testing registration...');
    
    try {
      const userData = {
        username: `testuser${Date.now()}`,
        email: `test${Date.now()}@example.com`,
        password: 'password123'
      };
      
      console.log('Sending registration request:', userData);
      const response = await authAPI.register(userData);
      console.log('Registration response:', response);
      
      setResult(`✅ Success: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error) {
      console.error('Registration error:', error);
      setResult(`❌ Error: ${error.message}
Response: ${error.response ? JSON.stringify(error.response.data, null, 2) : 'No response'}
Status: ${error.response?.status || 'Network Error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    setResult('Testing login...');
    
    try {
      const credentials = {
        email: 'test@example.com',
        password: 'password123'
      };
      
      console.log('Sending login request:', credentials);
      const response = await authAPI.login(credentials);
      console.log('Login response:', response);
      
      setResult(`✅ Success: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error) {
      console.error('Login error:', error);
      setResult(`❌ Error: ${error.message}
Response: ${error.response ? JSON.stringify(error.response.data, null, 2) : 'No response'}
Status: ${error.response?.status || 'Network Error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testHealthCheck = async () => {
    setLoading(true);
    setResult('Testing health check...');
    
    try {
      const response = await fetch('http://localhost:5000/api/health');
      const data = await response.json();
      setResult(`✅ Health check: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
      setResult(`❌ Health check failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">API Debug Tool</h2>
      
      <div className="space-y-4 mb-6">
        <button
          onClick={testHealthCheck}
          disabled={loading}
          className="btn btn-secondary mr-4"
        >
          Test Health Check
        </button>
        
        <button
          onClick={testRegistration}
          disabled={loading}
          className="btn btn-primary mr-4"
        >
          Test Registration
        </button>
        
        <button
          onClick={testLogin}
          disabled={loading}
          className="btn btn-outline"
        >
          Test Login
        </button>
      </div>
      
      {loading && <p className="text-blue-600">Loading...</p>}
      
      {result && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Result:</h3>
          <pre className="whitespace-pre-wrap text-sm">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default DebugAuth;
