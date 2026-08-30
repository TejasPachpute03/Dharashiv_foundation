const fs = require('fs');

const data = fs.readFileSync('src/data/mockData.ts', 'utf8');
const counts = {};
const matches = data.match(/membershipType:\s*"([^"]+)"/g) || [];

matches.forEach(m => {
  counts[m] = (counts[m] || 0) + 1;
});

console.log('Membership Types:');
console.log(counts);

const businessMatches = data.match(/membershipType:\s*"(Business \/ Member|Core Member \/ Admin)"/g) || [];
console.log('Total business/admin profiles:', businessMatches.length);
