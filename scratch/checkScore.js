const fs = require('fs');

const dataStr = fs.readFileSync('src/data/mockData.ts', 'utf8');
const utilsStr = fs.readFileSync('src/lib/utils.ts', 'utf8');

// very hacky way to extract the calculateProfileCompletion function
const fnCode = utilsStr.split('export function calculateProfileCompletion(profile: any): number {')[1].split('export')[0];

const fn = new Function('profile', '{\n' + fnCode);

// Just pass a dummy profile and see if we can get 85 or 100
const profile = {
  id: "e1",
  name: "Nilesh Kulkarni",
  designation: "Managing Director",
  companyName: "Intech Engineers",
  category: "Manufacturing",
  industry: "Manufacturing",
  location: "Pune",
  address: { district: "Pune", taluka: "Pune", currentCity: "Pune" },
  yearsInBusiness: "5+ Years",
  description: "Leading manufacturer...",
  services: ["Service 1"],
  targetCustomers: ["B2B"],
  industriesServed: ["Auto"],
  lookingFor: ["Partners"],
  businessNeeds: "Expansion",
  email: "nilesh@intechengg.com",
  phone: "+91 9876543210",
  verified: true,
  membershipType: "Core Member / Admin",
  memberSince: "2018",
  status: "Active",
};

console.log("Completion score:", fn(profile));
