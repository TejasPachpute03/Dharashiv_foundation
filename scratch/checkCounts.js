const fs = require('fs');
const data = fs.readFileSync('src/data/mockData.ts', 'utf8');

const m = data.match(/membershipType:\s*"(Business \/ Member|Core Member \/ Admin)"/g) || [];
console.log("Business Profiles:", m.length);

const t = data.match(/turnoverRange/g) || [];
console.log("Turnover Ranges:", t.length);

const y = data.match(/yearsInBusiness/g) || [];
console.log("Years In Business:", y.length);
