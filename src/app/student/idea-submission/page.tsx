"use client";

import { useState, useRef } from "react";
import { Lightbulb, Send, Paperclip, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function IdeaSubmissionPage() {
  const [ideaTitle, setIdeaTitle] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normally this would be sent to the backend context/API
    setSubmitted(true);
    setIdeaTitle("");
    setIdeaDescription("");
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
    <div className="space-y-6 animate-in fade-in duration-500 max-w-3xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-primary" />
          Idea Submission
        </h2>
        <p className="text-muted-foreground mt-1">
          Share your startup or project ideas to get feedback, find co-founders, or request funding from the network.
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
            <CardTitle>Submit a New Idea</CardTitle>
            <CardDescription>Fill out the details of your idea below.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Idea Title</label>
                <Input 
                  placeholder="e.g., AI-powered Farming Assistant" 
                  value={ideaTitle}
                  onChange={(e) => setIdeaTitle(e.target.value)}
                  required 
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Description & Value Proposition</label>
                <textarea 
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Describe the problem you are solving, your solution, and who your target audience is."
                  value={ideaDescription}
                  onChange={(e) => setIdeaDescription(e.target.value)}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Attachments (PDF, DOCX, Images)</label>
                
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
                    accept=".pdf,.doc,.docx,image/*"
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

              <Button type="submit" className="w-full mt-2">
                <Send className="w-4 h-4 mr-2" />
                Submit Idea
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
