const fs = require('fs');

const files = [
  'src/app/member/discover/page.tsx',
  'src/app/student/discover/page.tsx',
  'src/app/admin/discover/page.tsx',
  'src/app/admin/events/page.tsx',
  'src/app/dashboard/directory/page.tsx',
  'src/app/admin/members/page.tsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Fix map(e => e.location.split
    content = content.replace(/e\.location\.split/g, 'e.location?.split');
    
    // Fix e.location.includes
    content = content.replace(/e\.location\.includes/g, 'e.location?.includes');
    
    // Fix e.location.toLowerCase()
    content = content.replace(/e\.location\.toLowerCase/g, 'e.location?.toLowerCase');
    
    fs.writeFileSync(file, content);
  }
});
console.log('Fixed discover pages');
