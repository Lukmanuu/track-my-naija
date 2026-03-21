import { useParams, Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { politicians, projects, citizenReports, formatNaira, getStatusColor, getStatusLabel } from "@/data/mock-data";
import { ArrowLeft } from "lucide-react";

export default function PoliticianDetails() {
  const { id } = useParams();
  const politician = politicians.find(p => p.id === id);

  if (!politician) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center gap-4 py-20">
          <p className="text-lg font-medium">Politician not found</p>
          <Button asChild><Link to="/politicians">Back</Link></Button>
        </div>
      </DashboardLayout>
    );
  }

  const polProjects = projects.filter(p => p.politicianId === politician.id);
  const reports = citizenReports.filter(r => polProjects.some(p => p.id === r.projectId));
  const scoreColor = politician.performanceScore >= 70 ? "text-primary" : politician.performanceScore >= 50 ? "text-warning" : "text-destructive";

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Button variant="ghost" size="sm" className="gap-1" asChild>
          <Link to="/politicians"><ArrowLeft className="h-3.5 w-3.5" /> Back</Link>
        </Button>

        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
            {politician.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{politician.name}</h1>
            <p className="text-muted-foreground">{politician.position}</p>
            <p className="text-sm text-muted-foreground">{politician.lga} LGA, {politician.state}</p>
          </div>
        </div>

        {/* Score */}
        <Card className="shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Performance Score</span>
              <span className={`text-3xl font-bold tabular-nums ${scoreColor}`}>{politician.performanceScore}%</span>
            </div>
            <Progress value={politician.performanceScore} className="mt-2 h-3" />
          </CardContent>
        </Card>

        {/* Projects */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Projects ({polProjects.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {polProjects.map(p => (
              <Link key={p.id} to={`/projects/${p.id}`} className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div>
                  <p className="text-sm font-medium text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{formatNaira(p.budget)} · {p.category}</p>
                </div>
                <Badge className={`text-[10px] ${getStatusColor(p.status)}`}>{getStatusLabel(p.status)}</Badge>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Citizen Feedback */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Citizen Feedback ({reports.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {reports.length === 0 && <p className="py-4 text-center text-sm text-muted-foreground">No citizen feedback yet</p>}
            {reports.map(r => (
              <div key={r.id} className="rounded-lg border p-3">
                <p className="text-sm text-foreground">"{r.description}"</p>
                <p className="mt-1 text-xs text-muted-foreground">— {r.reporterName}, {r.reporterLga} · {new Date(r.createdAt).toLocaleDateString("en-NG")}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
