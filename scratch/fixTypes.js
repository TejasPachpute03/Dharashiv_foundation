const fs = require('fs');
let content = fs.readFileSync('src/data/mockData.ts', 'utf8');
content = content.replace(/"Entrepreneur \/ Member"/g, '"Business / Member"');
fs.writeFileSync('src/data/mockData.ts', content);
