import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { citizenReports } from "@/data/mock-data";
import { Link } from "react-router-dom";

export default function Reports() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Citizen Reports</h1>
          <p className="text-sm text-muted-foreground">Community feedback on government projects</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {citizenReports.map(r => (
            <Card key={r.id} className="overflow-hidden shadow-sm">
              <div className="aspect-video overflow-hidden">
                <img src={r.imageUrl} alt={r.projectName} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <Link to={`/projects/${r.projectId}`} className="text-sm font-semibold text-destructive hover:underline">
                    {r.projectName}
                  </Link>
                  <Badge variant={r.status === "verified" ? "default" : "secondary"} className="shrink-0 text-[10px]">
                    {r.status}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-foreground">{r.description}</p>
                <p className="mt-2 text-xs text-muted-foreground">— {r.reporterName}, {r.reporterLga} · {new Date(r.createdAt).toLocaleDateString("en-NG")}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
