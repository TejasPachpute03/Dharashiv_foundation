const fs = require('fs');

fs.appendFileSync('src/data/mockData.ts', `
export const mockJobs: any[] = [
  {
    id: "j1",
    title: "Software Engineer",
    company: "Tech Corp",
    location: "Pune",
    type: "Full-time",
    description: "Looking for a React developer",
    requirements: ["React", "TypeScript"],
    salary: "5-8 LPA",
    postedAt: "2023-10-01",
    deadline: "2023-11-01",
    postedBy: "e1",
    status: "Open"
  }
];
`);
console.log("Appended mockJobs");
