const fs = require('fs');

let c = fs.readFileSync('src/data/mockData.ts', 'utf8');

const ranges = ["0-40L", "40L-1CR", "1CR-5CR", "5CRPLUS"];
let idx = 0;

c = c.replace(/yearsInBusiness:\s*"[^"]+",\s*(turnoverRange:\s*"[^"]+",\s*)?/g, (match, p1) => {
  if (p1) {
    // Already has turnover range, keep it or replace it? The prompt says "set mock turnover data for bussiness profiles". Let's replace/set it for everyone to be sure.
    const range = ranges[idx % ranges.length];
    idx++;
    return match.replace(p1, `turnoverRange: "${range}", `);
  } else {
    // No turnover range, add one
    const range = ranges[idx % ranges.length];
    idx++;
    return match + `\n    turnoverRange: "${range}",`;
  }
});

fs.writeFileSync('src/data/mockData.ts', c);
console.log('Added turnoverRange to all business profiles in mockData.ts');
