import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { projects, citizenReports, politicians, formatNaira, getStatusColor, getStatusLabel } from "@/data/mock-data";
import { Star, MapPin, Calendar, Building2, ArrowLeft, Camera } from "lucide-react";

export default function ProjectDetails() {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center gap-4 py-20">
          <p className="text-lg font-medium">Project not found</p>
          <Button asChild><Link to="/projects">Back to Projects</Link></Button>
        </div>
      </DashboardLayout>
    );
  }

  const reports = citizenReports.filter(r => r.projectId === project.id);
  const politician = politicians.find(p => p.id === project.politicianId);
  const spentPercent = project.budget > 0 ? (project.amountSpent / project.budget) * 100 : 0;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Button variant="ghost" size="sm" className="gap-1" asChild>
          <Link to="/projects"><ArrowLeft className="h-3.5 w-3.5" /> Back to Projects</Link>
        </Button>

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-foreground">{project.name}</h1>
              <Badge className={getStatusColor(project.status)}>{getStatusLabel(project.status)}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{project.category} · {project.lga} LGA, {project.state}</p>
          </div>
          <Button variant="destructive" className="gap-2 active:scale-[0.97]" asChild>
            <Link to="/report"><Camera className="h-4 w-4" /> Report Issue</Link>
          </Button>
        </div>

        {/* Image */}
        <div className="overflow-hidden rounded-xl">
          <img src={project.imageUrl} alt={project.name} className="aspect-[21/9] w-full object-cover" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main info */}
          <div className="space-y-4 lg:col-span-2">
            <Card className="shadow-sm">
              <CardContent className="p-5">
                <p className="text-sm leading-relaxed text-foreground">{project.description}</p>
              </CardContent>
            </Card>

            <div className="grid gap-3 sm:grid-cols-2">
              <Card className="shadow-sm">
                <CardContent className="flex items-center gap-3 p-4">
                  <Building2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Contractor</p>
                    <p className="font-medium text-foreground">{project.contractor}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardContent className="flex items-center gap-3 p-4">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="font-medium text-foreground">{project.location}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardContent className="flex items-center gap-3 p-4">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Start Date</p>
                    <p className="font-medium text-foreground">{new Date(project.startDate).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-sm">
                <CardContent className="flex items-center gap-3 p-4">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Expected Completion</p>
                    <p className="font-medium text-foreground">{new Date(project.expectedEndDate).toLocaleDateString("en-NG", { year: "numeric", month: "long", day: "numeric" })}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Reports */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Citizen Reports ({reports.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reports.length === 0 && (
                  <p className="py-6 text-center text-sm text-muted-foreground">No reports yet for this project</p>
                )}
                {reports.map(r => (
                  <div key={r.id} className="flex gap-3 rounded-lg border p-3">
                    <img src={r.imageUrl} alt="" className="h-16 w-16 shrink-0 rounded-md object-cover" />
                    <div className="min-w-0">
                      <p className="text-sm text-foreground">{r.description}</p>
                      <p className="mt-1 text-xs text-muted-foreground">— {r.reporterName}, {r.reporterLga} · {new Date(r.createdAt).toLocaleDateString("en-NG")}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Budget card */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Budget</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Allocated</span>
                  <span className="font-semibold tabular-nums">{formatNaira(project.budget)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Spent</span>
                  <span className="font-semibold tabular-nums">{formatNaira(project.amountSpent)}</span>
                </div>
                <Progress value={spentPercent} className="h-2" />
                <p className="text-xs text-muted-foreground text-right">{spentPercent.toFixed(0)}% utilized</p>
              </CardContent>
            </Card>

            {/* Rating */}
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Rating</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-1 py-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(n => (
                    <Star
                      key={n}
                      className={`h-6 w-6 ${n <= Math.round(project.averageRating) ? "fill-warning text-warning" : "text-muted"}`}
                    />
                  ))}
                </div>
                <p className="text-2xl font-bold tabular-nums">{project.averageRating > 0 ? project.averageRating.toFixed(1) : "—"}</p>
                <p className="text-xs text-muted-foreground">{project.totalRatings} rating{project.totalRatings !== 1 ? "s" : ""}</p>
              </CardContent>
            </Card>

            {/* Responsible politician */}
            {politician && (
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Responsible Official</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link to={`/politicians/${politician.id}`} className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {politician.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{politician.name}</p>
                      <p className="text-xs text-muted-foreground">{politician.position}</p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
