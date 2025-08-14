// Simple test for Deno compatibility
import constants from './src/yoti_common/constants.js';

console.log('Testing Deno compatibility...');
console.log('Constants loaded successfully:', typeof constants === 'object');
console.log('API_BASE_URL:', constants.API_BASE_URL);
console.log('Available constants:', Object.keys(constants).slice(0, 5));