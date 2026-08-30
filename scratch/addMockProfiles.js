const fs = require('fs');

const studentAndMember = `  {
    id: "s1",
    name: "Demo Student",
    designation: "Student",
    profileImage: "",
    companyName: "Dharashiv College",
    category: "Education",
    industry: "Education",
    location: "Dharashiv",
    address: { district: "Dharashiv", taluka: "Dharashiv", currentCity: "Dharashiv" },
    yearsInBusiness: "0",
    turnoverRange: "0-40L",
    description: "I am a student at Dharashiv College looking for mentorship.",
    services: [],
    targetCustomers: [],
    industriesServed: [],
    lookingFor: ["Mentorship", "Internship"],
    businessNeeds: "Seeking guidance for career.",
    email: "student@demo.com",
    phone: "9999999999",
    verified: true,
    membershipType: "Student",
    memberSince: "2026",
    status: "Active",
  },
  {
    id: "m1",
    name: "Demo Member",
    designation: "Member",
    profileImage: "",
    companyName: "Self Employed",
    category: "General",
    industry: "General",
    location: "Dharashiv",
    address: { district: "Dharashiv", taluka: "Dharashiv", currentCity: "Dharashiv" },
    yearsInBusiness: "1+ Year",
    turnoverRange: "0-40L",
    description: "I am a general member of the foundation.",
    services: [],
    targetCustomers: [],
    industriesServed: [],
    lookingFor: ["Networking"],
    businessNeeds: "Connecting with local businesses.",
    email: "member@demo.com",
    phone: "8888888888",
    verified: true,
    membershipType: "General Member",
    memberSince: "2026",
    status: "Active",
  },
`;

let data = fs.readFileSync('src/data/mockData.ts', 'utf8');
if (!data.includes('id: "s1"')) {
  data = data.replace('export const mockEntrepreneurs: Entrepreneur[] = [', 'export const mockEntrepreneurs: Entrepreneur[] = [\n' + studentAndMember);
  fs.writeFileSync('src/data/mockData.ts', data);
  console.log("Mock profiles added!");
} else {
  console.log("Mock profiles already exist.");
}
