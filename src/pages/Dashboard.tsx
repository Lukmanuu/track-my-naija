import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { projects, budgetAllocations, projectStats, formatNaira, getStatusColor, getStatusLabel } from "@/data/mock-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const budgetChartData = budgetAllocations
  .filter(b => b.level === "state")
  .map(b => ({
    name: b.name.replace("& ", "&\n"),
    allocated: b.allocated / 1000000000,
    disbursed: b.disbursed / 1000000000,
  }));

const statusData = [
  { name: "Completed", value: projectStats.completed, color: "hsl(142, 72%, 29%)" },
  { name: "Ongoing", value: projectStats.ongoing, color: "hsl(48, 96%, 53%)" },
  { name: "Abandoned", value: projectStats.abandoned, color: "hsl(0, 72%, 51%)" },
  { name: "Not Started", value: projectStats.notStarted, color: "hsl(220, 14%, 80%)" },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Gombe State project and budget overview — 2025</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { label: "Total Budget", value: formatNaira(projectStats.totalBudget), sub: `${projectStats.total} projects` },
            { label: "Amount Spent", value: formatNaira(projectStats.totalSpent), sub: `${((projectStats.totalSpent / projectStats.totalBudget) * 100).toFixed(0)}% utilized` },
            { label: "Completed", value: projectStats.completed, sub: "projects delivered" },
            { label: "Abandoned", value: projectStats.abandoned, sub: "flagged by citizens" },
          ].map(s => (
            <Card key={s.label} className="shadow-sm">
              <CardContent className="p-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</p>
                <p className="mt-1 text-xl font-bold tabular-nums text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Budget Allocation by Sector</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budgetChartData} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₦${v}B`} />
                    <Tooltip formatter={(v: number) => [`₦${v.toFixed(1)}B`]} />
                    <Bar dataKey="allocated" fill="hsl(142, 72%, 29%)" radius={[4, 4, 0, 0]} name="Allocated" />
                    <Bar dataKey="disbursed" fill="hsl(142, 72%, 60%)" radius={[4, 4, 0, 0]} name="Disbursed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Project Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={statusData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                      {statusData.map(d => <Cell key={d.name} fill={d.color} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent projects table */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <th className="pb-2 pr-4">Project</th>
                    <th className="pb-2 pr-4">LGA</th>
                    <th className="pb-2 pr-4">Budget</th>
                    <th className="pb-2 pr-4">Status</th>
                    <th className="pb-2">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.slice(0, 8).map(p => (
                    <tr key={p.id} className="border-b last:border-0">
                      <td className="py-3 pr-4">
                        <Link to={`/projects/${p.id}`} className="font-medium text-foreground hover:text-primary transition-colors">
                          {p.name}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">{p.lga}</td>
                      <td className="py-3 pr-4 tabular-nums font-medium">{formatNaira(p.budget)}</td>
                      <td className="py-3 pr-4">
                        <Badge className={`text-[10px] ${getStatusColor(p.status)}`}>{getStatusLabel(p.status)}</Badge>
                      </td>
                      <td className="py-3 text-muted-foreground">{p.category}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
