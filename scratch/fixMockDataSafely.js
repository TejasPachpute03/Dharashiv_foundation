const fs = require('fs');
let data = fs.readFileSync('src/data/mockData.ts', 'utf8');

const s1m1 = `
  {
    id: "s1",
    name: "Aarav Patel",
    email: "aarav@student.edu",
    membershipType: "Student",
    profileImage: "https://i.pravatar.cc/150?u=s1",
    designation: "Student",
    companyName: "Engineering College",
    memberSince: "2023",
    status: "Active"
  },
  {
    id: "m1",
    name: "Sneha Joshi",
    email: "sneha@member.com",
    membershipType: "General Member",
    profileImage: "https://i.pravatar.cc/150?u=m1",
    designation: "Professional",
    companyName: "Self Employed",
    memberSince: "2022",
    status: "Active"
  },`;

if (!data.includes('id: "s1"')) {
    data = data.replace('export const mockEntrepreneurs: Entrepreneur[] = [', 'export const mockEntrepreneurs: Entrepreneur[] = [' + s1m1);
}

// Add mock turnover data to businesses
const turnoverRanges = ["0-40L", "40L-1CR", "1CR-5CR", "5CRPLUS"];
let i = 0;
data = data.replace(/(id:\s*"e\d+"[\s\S]*?yearsInBusiness:\s*"[^"]+",)/g, (match) => {
    if (match.includes('turnoverRange')) return match;
    const range = turnoverRanges[i % turnoverRanges.length];
    i++;
    return match + `\n    turnoverRange: "${range}",`;
});

fs.writeFileSync('src/data/mockData.ts', data);
console.log("Done");
