import { useEffect, useMemo, useRef } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { projects, getStatusLabel } from "@/data/mock-data";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const statusLabels = {
  completed: "Completed",
  ongoing: "Ongoing",
  abandoned: "Abandoned",
  not_started: "Not Started",
} as const;

const statusMarkerColors: Record<keyof typeof statusLabels, string> = {
  completed: "hsl(142 72% 29%)",
  ongoing: "hsl(48 96% 53%)",
  abandoned: "hsl(0 72% 51%)",
  not_started: "hsl(220 9% 46%)",
};

function createStatusIcon(color: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40" fill="none">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.268 21.732 0 14 0Z" fill="${color}" stroke="white" stroke-width="2"/>
      <circle cx="14" cy="14" r="5.5" fill="white"/>
    </svg>
  `;

  return L.divIcon({
    html: svg,
    className: "map-pin-icon",
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -34],
  });
}

export default function MapView() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const center = useMemo<[number, number]>(() => [10.29, 11.17], []);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center,
      zoom: 9,
      scrollWheelZoom: true,
    });

    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    projects.forEach((project) => {
      const icon = createStatusIcon(statusMarkerColors[project.status]);
      const popupHtml = `
        <div style="min-width: 200px; font-family: system-ui, sans-serif;">
          <p style="margin: 0 0 4px; font-size: 14px; font-weight: 700; color: hsl(220 20% 10%);">${project.name}</p>
          <p style="margin: 0 0 8px; font-size: 12px; color: hsl(220 9% 46%);">${project.location}, ${project.lga} LGA</p>
          <p style="margin: 0 0 10px; font-size: 12px; color: hsl(220 20% 10%);">
            <strong>Status:</strong> ${getStatusLabel(project.status)}
          </p>
          <a href="/projects/${project.id}" style="font-size: 12px; font-weight: 600; color: hsl(142 72% 29%); text-decoration: none;">
            View Details →
          </a>
        </div>
      `;

      L.marker([project.lat, project.lng], { icon }).addTo(map).bindPopup(popupHtml);
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [center]);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Map View</h1>
          <p className="text-sm text-muted-foreground">Explore government projects across Gombe State</p>
        </div>

        <div className="overflow-hidden rounded-lg border border-border shadow-sm">
          <div ref={mapRef} className="h-[65vh] w-full" aria-label="Interactive map of projects in Gombe State" />
        </div>

        <div className="flex flex-wrap gap-3">
          {(Object.entries(statusLabels) as Array<[keyof typeof statusLabels, string]>).map(([key, label]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: statusMarkerColors[key] }} aria-hidden="true" />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
