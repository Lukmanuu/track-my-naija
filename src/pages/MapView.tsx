import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects, getStatusColor, getStatusLabel } from "@/data/mock-data";
import { MapPin } from "lucide-react";

export default function MapView() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Map View</h1>
          <p className="text-sm text-muted-foreground">Explore government projects across Gombe State</p>
        </div>

        {/* Map placeholder — Google Maps will be integrated when API key is provided */}
        <Card className="overflow-hidden shadow-sm">
          <div className="relative flex aspect-[16/9] items-center justify-center bg-muted">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-2 text-sm font-medium text-muted-foreground">Google Maps Integration</p>
              <p className="text-xs text-muted-foreground">Provide your Google Maps API key to enable the interactive map</p>
            </div>
          </div>
        </Card>

        {/* Legend */}
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-warning" />
            <span className="text-xs text-muted-foreground">Ongoing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-destructive" />
            <span className="text-xs text-muted-foreground">Abandoned</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-muted-foreground/40" />
            <span className="text-xs text-muted-foreground">Not Started</span>
          </div>
        </div>

        {/* Project list as fallback */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map(p => (
            <Card key={p.id} className="shadow-sm">
              <CardContent className="flex items-start gap-3 p-4">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground line-clamp-1">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.location}, {p.lga} LGA</p>
                  <Badge className={`mt-1 text-[10px] ${getStatusColor(p.status)}`}>{getStatusLabel(p.status)}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
