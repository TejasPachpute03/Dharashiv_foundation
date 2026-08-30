const fs = require('fs');
const utilsStr = fs.readFileSync('src/lib/utils.ts', 'utf8');
const fnCode = utilsStr.split('export function calculateProfileCompletion(profile: any): number {')[1].split('export')[0];
const fn = new Function('profile', '{\n' + fnCode);

const profileE2 = {
  id: "e2",
  name: "Aditi Sharma",
  designation: "Founder",
  profileImage: "",
  companyName: "Sharma Textiles",
  category: "Retail",
  industry: "Retail",
  location: "Dharashiv",
  address: { district: "Dharashiv", taluka: "Kallam", currentCity: "Dharashiv" },
  yearsInBusiness: "2-5 Years",
  description: "Retail business for textiles.",
  services: ["Clothing"],
  targetCustomers: ["B2C"],
  industriesServed: ["Retail"],
  lookingFor: ["Suppliers"],
  businessNeeds: "Inventory",
  email: "aditi@sharmatextiles.com",
  phone: "9876543211",
  verified: false,
  membershipType: "Business / Member",
  memberSince: "2021",
  status: "Active",
};

console.log('e2:', fn(profileE2));
