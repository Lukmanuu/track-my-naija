import { useMemo } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { projects, getStatusColor, getStatusLabel } from "@/data/mock-data";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";

const statusColors: Record<string, string> = {
  completed: "#16A34A",
  ongoing: "#FACC15",
  abandoned: "#DC2626",
  not_started: "#9CA3AF",
};

function createIcon(status: string) {
  const color = statusColors[status] || "#9CA3AF";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40">
    <path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 26 14 26s14-15.5 14-26C28 6.27 21.73 0 14 0z" fill="${color}" stroke="#fff" stroke-width="2"/>
    <circle cx="14" cy="14" r="6" fill="#fff"/>
  </svg>`;
  return L.divIcon({
    html: svg,
    className: "",
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -40],
  });
}

export default function MapView() {
  const center = useMemo<[number, number]>(() => [10.29, 11.17], []);

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Map View</h1>
          <p className="text-sm text-muted-foreground">Explore government projects across Gombe State</p>
        </div>

        <div className="overflow-hidden rounded-lg border shadow-sm" style={{ height: "65vh" }}>
          <MapContainer center={center} zoom={9} style={{ height: "100%", width: "100%" }} scrollWheelZoom>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {projects.map((p) => (
              <Marker key={p.id} position={[p.lat, p.lng]} icon={createIcon(p.status)}>
                <Popup>
                  <div className="min-w-[180px]">
                    <p className="font-semibold text-sm">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.location}, {p.lga} LGA</p>
                    <p className="text-xs mt-1">
                      <span className="font-medium">Status:</span> {getStatusLabel(p.status)}
                    </p>
                    <Link to={`/projects/${p.id}`} className="text-xs text-blue-600 hover:underline mt-1 inline-block">
                      View Details →
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3">
          {Object.entries({ completed: "Completed", ongoing: "Ongoing", abandoned: "Abandoned", not_started: "Not Started" }).map(([key, label]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: statusColors[key] }} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
