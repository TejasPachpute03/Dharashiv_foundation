"use client";

import { useState } from "react";
import { Briefcase, MapPin, Building, Clock, IndianRupee, X } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";

export default function JobsPage() {
  const { jobs, currentUser, entrepreneurs } = useAppContext();
  const [isCreating, setIsCreating] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [applyingJob, setApplyingJob] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    description: "",
    requirements: "",
    salary: "",
  });

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Job posted successfully! (Mock Action)");
    setIsCreating(false);
    setFormData({
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      description: "",
      requirements: "",
      salary: "",
    });
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Application submitted successfully! (Mock Action)");
    setApplyingJob(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Jobs & Vacancies</h2>
          <p className="text-muted-foreground mt-1">Discover job opportunities or post a vacancy for your company.</p>
        </div>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)}>Post a Job</Button>
        )}
      </div>

      {isCreating && (
        <Card className="border-primary shadow-md">
          <CardHeader>
            <CardTitle>Post a Job Vacancy</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePostJob} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Title</label>
                  <Input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Software Engineer" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name</label>
                  <Input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} placeholder="e.g. TechCorp" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Input value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} placeholder="e.g. Pune, Maharashtra" required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Type</label>
                  <select className="flex h-10 w-full rounded-xl border border-border bg-card px-3 py-2 text-sm shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-primary" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Salary (Optional)</label>
                  <Input value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} placeholder="e.g. ₹10,00,000 - ₹15,00,000" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm" rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Requirements (comma separated)</label>
                <textarea className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm" rows={2} value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} placeholder="React, Node.js, 3+ years experience" required />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
                <Button type="submit">Post Job</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {applyingJob && (
        <Card className="border-primary shadow-md">
          <CardHeader>
            <CardTitle>Apply for {applyingJob.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleApply} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input placeholder="Enter your full name" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input type="email" placeholder="Enter your email" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Resume Link / Portfolio</label>
                <Input placeholder="Link to resume or portfolio" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Cover Letter</label>
                <textarea className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm" rows={4} placeholder="Tell us why you're a good fit..." required />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setApplyingJob(null)}>Cancel</Button>
                <Button type="submit">Submit Application</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {jobs.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-orange-200/60 rounded-2xl bg-card shadow-sm">
            <div className="mx-auto h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-1">No jobs available</h3>
            <p className="text-sm text-muted-foreground">Check back later for new opportunities.</p>
          </div>
        ) : (
          jobs.map(job => (
            <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        Type: {job.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Posted {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center">
                        <Building className="w-4 h-4 mr-1.5" />
                        {job.company}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1.5" />
                        {job.location}
                      </div>
                      {job.salary && (
                        <div className="flex items-center">
                          <IndianRupee className="w-4 h-4 mr-1.5" />
                          {job.salary}
                        </div>
                      )}
                    </div>
                    
                    {selectedJob === job.id ? (
                      <div className="animate-in slide-in-from-top-2 duration-300">
                        <p className="text-sm text-foreground/80 mb-4">{job.description}</p>
                        {job.requirements && job.requirements.length > 0 && (
                          <div className="mb-4">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Requirements</h4>
                            <ul className="list-disc pl-5 text-sm space-y-1 text-foreground/80">
                              {job.requirements.map((req, i) => (
                                <li key={i}>{req}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-foreground/80 mb-4 line-clamp-2">{job.description}</p>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-end justify-between min-w-[120px]">
                    <Badge variant="outline" className={job.status === "Open" ? "border-success text-success" : "border-destructive text-destructive"}>
                      {job.status}
                    </Badge>
                    <div className="mt-4 flex flex-col gap-2 w-full sm:w-auto">
                      <Button className="w-full" onClick={() => setApplyingJob(job)}>Apply Now</Button>
                      <Button variant="outline" className="w-full" onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}>
                        {selectedJob === job.id ? "Hide Details" : "View Details"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
