"use client";

import { useState, useRef } from "react";
import { Lightbulb, Send, Paperclip, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const supportOptions = [
  "Mentorship",
  "Funding Guidance",
  "Business Guidance",
  "Industry Connection",
  "Technical Support",
  "Market Guidance",
  "Other"
];

export default function IdeaSubmissionPage() {
  const [formData, setFormData] = useState({
    studentName: "",
    college: "",
    course: "",
    mobile: "",
    email: "",
    location: "",
    ideaTitle: "",
    problemToSolve: "",
    ideaDescription: "",
    impact: "",
    estimatedBudget: "",
    supportNeeded: [] as string[]
  });
  
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (option: string) => {
    setFormData(prev => {
      const current = prev.supportNeeded;
      if (current.includes(option)) {
        return { ...prev, supportNeeded: current.filter(item => item !== option) };
      } else {
        return { ...prev, supportNeeded: [...current, option] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally this would be sent to the backend context/API
    setSubmitted(true);
    setFormData({
      studentName: "",
      college: "",
      course: "",
      mobile: "",
      email: "",
      location: "",
      ideaTitle: "",
      problemToSolve: "",
      ideaDescription: "",
      impact: "",
      estimatedBudget: "",
      supportNeeded: []
    });
    setFiles([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto pb-10">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary" />
          Idea Submission
        </h2>
        <p className="text-muted-foreground mt-1">
          Have a business idea, startup idea, social initiative or innovative project? Share your idea with the Dharashiv Foundation.
        </p>
      </div>

      {submitted ? (
        <Card className="border-green-200 bg-green-50/50 dark:bg-green-900/10 dark:border-green-900">
          <CardHeader>
            <CardTitle className="text-green-700 dark:text-green-400">Idea Submitted Successfully!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Thank you for sharing your idea. Our review panel and mentors will look at it shortly. You will be notified when you receive feedback.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => setSubmitted(false)}>Submit Another Idea</Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Submit Your Idea</CardTitle>
            <CardDescription>Fill out the details of your idea below.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">Student Name</label>
                  <Input name="studentName" value={formData.studentName} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">College</label>
                  <Input name="college" value={formData.college} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">Course</label>
                  <Input name="course" value={formData.course} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">Mobile</label>
                  <Input name="mobile" type="tel" value={formData.mobile} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">Email</label>
                  <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none">Location</label>
                  <Input name="location" value={formData.location} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="space-y-2 border-t pt-4">
                <label className="text-sm font-medium leading-none">Idea Title</label>
                <Input name="ideaTitle" value={formData.ideaTitle} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Problem You Want to Solve</label>
                <textarea 
                  name="problemToSolve"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.problemToSolve}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Idea Description</label>
                <textarea 
                  name="ideaDescription"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.ideaDescription}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Business/Social Impact</label>
                <textarea 
                  name="impact"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.impact}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Estimated Budget</label>
                <Input name="estimatedBudget" placeholder="e.g., ₹50,000" value={formData.estimatedBudget} onChange={handleInputChange} />
              </div>

              <div className="space-y-3 pt-2">
                <label className="text-sm font-medium leading-none">What Support Do You Need?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {supportOptions.map(option => (
                    <label key={option} className="flex items-center space-x-2 text-sm cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                        checked={formData.supportNeeded.includes(option)}
                        onChange={() => handleCheckboxChange(option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2 border-t pt-4">
                <label className="text-sm font-medium leading-none">Upload Documents (PDF / PPT / DOC)</label>
                
                <div className="flex items-center gap-3">
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="border-dashed flex-1 text-muted-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Paperclip className="w-4 h-4 mr-2" />
                    Attach Files
                  </Button>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange} 
                    className="hidden" 
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                  />
                </div>

                {files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {files.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 text-sm border rounded-md bg-secondary/50">
                        <span className="truncate flex-1 mr-4">{file.name}</span>
                        <button 
                          type="button" 
                          onClick={() => removeFile(idx)}
                          className="text-muted-foreground hover:text-destructive shrink-0 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full mt-4 text-base py-6">
                <Send className="w-5 h-5 mr-2" />
                Submit Idea
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
