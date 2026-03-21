import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Upload, CheckCircle } from "lucide-react";
import { projects } from "@/data/mock-data";
import { useToast } from "@/hooks/use-toast";

export default function ReportIssue() {
  const [projectId, setProjectId] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !description.trim()) {
      toast({ title: "Missing fields", description: "Please select a project and describe the issue.", variant: "destructive" });
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <CheckCircle className="h-16 w-16 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Report Submitted</h1>
          <p className="max-w-sm text-muted-foreground">Thank you for holding leaders accountable. Your report will be reviewed and published.</p>
          <Button onClick={() => { setSubmitted(false); setProjectId(""); setDescription(""); }}>Submit Another Report</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-lg space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Report an Issue</h1>
          <p className="text-sm text-muted-foreground">Help us track abandoned or poorly executed projects</p>
        </div>

        <Card className="shadow-sm">
          <CardContent className="p-5">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Select Project *</label>
                <Select value={projectId} onValueChange={setProjectId}>
                  <SelectTrigger><SelectValue placeholder="Choose a project..." /></SelectTrigger>
                  <SelectContent>
                    {projects.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.name} — {p.lga}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Upload Photos / Videos</label>
                <div className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-muted p-8 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, MP4 up to 10MB</p>
                  <Button type="button" variant="outline" size="sm" className="mt-2 gap-2">
                    <Camera className="h-4 w-4" /> Choose Files
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Describe the Issue *</label>
                <Textarea
                  placeholder="What did you observe? Be specific about the problem..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={5}
                  maxLength={1000}
                />
                <p className="text-right text-xs text-muted-foreground">{description.length}/1000</p>
              </div>

              <Button type="submit" size="lg" className="w-full gap-2 text-base active:scale-[0.97]">
                <Camera className="h-5 w-5" /> Submit Report
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
