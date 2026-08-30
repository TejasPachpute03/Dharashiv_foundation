const fs = require('fs');
const utilsStr = fs.readFileSync('src/lib/utils.ts', 'utf8');
const fnCode = utilsStr.split('export function calculateProfileCompletion(profile: any): number {')[1].split('export')[0];
const fn = new Function('profile', '{\n' + fnCode);

const profile = {
    id: "e4",
    name: "Pradeep Jadhavar",
    designation: "Managing Director",
    profileImage: "",
    companyName: "Shivshakti Agro",
    category: "Agriculture",
    industry: "Agriculture",
    location: "Dharashiv",
    address: { district: "Dharashiv", taluka: "Kallam", currentCity: "Dharashiv" },
    yearsInBusiness: "10+ Years",
    turnoverRange: "1CR-5CR",
    description: "Leading agro product manufacturer and supplier in Marathwada region.",
    services: ["Agro Products", "Farming Equipment", "Fertilizers"],
    targetCustomers: ["Farmers", "Retailers"],
    industriesServed: ["Agriculture"],
    lookingFor: ["Distributors", "Investors"],
    businessNeeds: "Looking for distribution partners across Maharashtra.",
    website: "https://example.com",
    email: "pradeep@shivshaktiagro.com",
    phone: "+91 9876543213",
    verified: true,
    membershipType: "Business / Member",
    memberSince: "2016",
    status: "Active"
};

console.log("Pradeep:", fn(profile));
