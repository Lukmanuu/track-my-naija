import { Link } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { politicians, projects } from "@/data/mock-data";

export default function Politicians() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Politicians</h1>
          <p className="text-sm text-muted-foreground">Government officials and their project performance</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {politicians.map(pol => {
            const polProjects = projects.filter(p => p.politicianId === pol.id);
            const abandoned = polProjects.filter(p => p.status === "abandoned").length;
            const scoreColor = pol.performanceScore >= 70 ? "text-primary" : pol.performanceScore >= 50 ? "text-warning" : "text-destructive";

            return (
              <Link key={pol.id} to={`/politicians/${pol.id}`}>
                <Card className="shadow-sm transition-all hover:shadow-lg active:scale-[0.98]">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                        {pol.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-foreground">{pol.name}</h3>
                        <p className="text-sm text-muted-foreground">{pol.position}</p>
                        <p className="text-xs text-muted-foreground">{pol.lga} LGA, {pol.state}</p>

                        <div className="mt-3 space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Performance</span>
                            <span className={`font-bold tabular-nums ${scoreColor}`}>{pol.performanceScore}%</span>
                          </div>
                          <Progress value={pol.performanceScore} className="h-2" />
                        </div>

                        <div className="mt-2 flex gap-2">
                          <Badge variant="secondary" className="text-[10px]">{polProjects.length} projects</Badge>
                          {abandoned > 0 && (
                            <Badge variant="destructive" className="text-[10px]">{abandoned} abandoned</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
