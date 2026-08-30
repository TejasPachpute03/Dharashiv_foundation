const fs = require('fs');
const data = fs.readFileSync('src/data/mockData.ts', 'utf8');

const matches = data.match(/membershipType:\s*"([^"]+)"/g) || [];
const counts = {};
matches.forEach(m => {
  counts[m] = (counts[m] || 0) + 1;
});
console.log(counts);
