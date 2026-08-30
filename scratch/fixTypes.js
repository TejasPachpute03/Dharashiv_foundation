const fs = require('fs');

let c = fs.readFileSync('src/data/mockData.ts', 'utf8');
c = c.replace(/"Entrepreneur \/ Member"/g, '"Business / Member"');

const parts = c.split('export const mockEvents');
if (parts.length > 1) {
  let eventsPart = parts[1];
  eventsPart = eventsPart.replace(/,\s*address:\s*\{\s*district:\s*"Dharashiv",\s*taluka:\s*"[^"]+",\s*currentCity:\s*"[^"]+"\s*\}/g, '');
  c = parts[0] + 'export const mockEvents' + eventsPart;
}

fs.writeFileSync('src/data/mockData.ts', c);
console.log('Fixed types in mockData.ts');
