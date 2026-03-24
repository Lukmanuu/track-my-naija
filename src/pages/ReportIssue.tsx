import { useState, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, Upload, CheckCircle, X, Loader2 } from "lucide-react";
import { projects } from "@/data/mock-data";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp", "video/mp4", "video/quicktime"];

export default function ReportIssue() {
  const [projectId, setProjectId] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    const valid: File[] = [];
    for (const f of selected) {
      if (!ACCEPTED_TYPES.includes(f.type)) {
        toast({ title: "Invalid file type", description: `${f.name} is not supported.`, variant: "destructive" });
        continue;
      }
      if (f.size > MAX_FILE_SIZE) {
        toast({ title: "File too large", description: `${f.name} exceeds 10MB.`, variant: "destructive" });
        continue;
      }
      valid.push(f);
    }
    setFiles(prev => [...prev, ...valid].slice(0, 5));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (idx: number) => setFiles(prev => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ title: "Login required", description: "Please log in to submit a report.", variant: "destructive" });
      navigate("/login");
      return;
    }
    if (!projectId || !description.trim()) {
      toast({ title: "Missing fields", description: "Please select a project and describe the issue.", variant: "destructive" });
      return;
    }

    setUploading(true);
    try {
      // Upload files to storage
      const mediaUrls: string[] = [];
      for (const file of files) {
        const ext = file.name.split(".").pop();
        const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("report-media").upload(path, file);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from("report-media").getPublicUrl(path);
        mediaUrls.push(urlData.publicUrl);
      }

      const selectedProject = projects.find(p => p.id === projectId);

      // Insert report into database
      const { error: insertError } = await supabase.from("citizen_reports").insert({
        user_id: user.id,
        project_id: projectId,
        project_name: selectedProject?.name || "Unknown Project",
        description: description.trim(),
        media_urls: mediaUrls,
      });
      if (insertError) throw insertError;

      setSubmitted(true);
    } catch (err: any) {
      toast({ title: "Submission failed", description: err.message || "Something went wrong.", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  if (submitted) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <CheckCircle className="h-16 w-16 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Report Submitted</h1>
          <p className="max-w-sm text-muted-foreground">Thank you for holding leaders accountable. Your report will be reviewed and published.</p>
          <Button onClick={() => { setSubmitted(false); setProjectId(""); setDescription(""); setFiles([]); }}>Submit Another Report</Button>
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
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED_TYPES.join(",")}
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div
                  className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-muted p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={e => { e.preventDefault(); e.stopPropagation(); }}
                  onDrop={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    const dt = e.dataTransfer;
                    if (dt?.files) {
                      const fakeEvent = { target: { files: dt.files } } as React.ChangeEvent<HTMLInputElement>;
                      handleFileChange(fakeEvent);
                    }
                  }}
                >
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, MP4 up to 10MB (max 5 files)</p>
                </div>

                {files.length > 0 && (
                  <div className="space-y-2 mt-2">
                    {files.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-md border bg-muted/50 p-2 text-sm">
                        <span className="truncate flex-1">{f.name}</span>
                        <span className="text-xs text-muted-foreground shrink-0">{(f.size / 1024 / 1024).toFixed(1)}MB</span>
                        <button type="button" onClick={() => removeFile(i)} className="text-destructive hover:text-destructive/80">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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

              <Button type="submit" size="lg" className="w-full gap-2 text-base active:scale-[0.97]" disabled={uploading}>
                {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Camera className="h-5 w-5" />}
                {uploading ? "Submitting..." : "Submit Report"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
