import { Link } from "react-router-dom";
import { Search, MapPin, AlertTriangle, BarChart3, ArrowRight, Star, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects, citizenReports, projectStats, formatNaira, getStatusColor, getStatusLabel } from "@/data/mock-data";
import { useState, useEffect, useRef } from "react";

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        filter: visible ? "blur(0)" : "blur(4px)",
        transition: `opacity 600ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 600ms cubic-bezier(0.16,1,0.3,1) ${delay}ms, filter 600ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const Index = () => {
  const [search, setSearch] = useState("");

  const stats = [
    { label: "Total Projects", value: projectStats.total, icon: BarChart3, color: "text-primary" },
    { label: "Completed", value: projectStats.completed, icon: MapPin, color: "text-primary" },
    { label: "Ongoing", value: projectStats.ongoing, icon: AlertTriangle, color: "text-warning" },
    { label: "Abandoned", value: projectStats.abandoned, icon: AlertTriangle, color: "text-destructive" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <MapPin className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold tracking-tight text-foreground">OpenGov Nigeria</span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            <Button variant="ghost" size="sm" asChild><Link to="/dashboard">Dashboard</Link></Button>
            <Button variant="ghost" size="sm" asChild><Link to="/projects">Projects</Link></Button>
            <Button variant="ghost" size="sm" asChild><Link to="/map">Map</Link></Button>
            <Button variant="ghost" size="sm" asChild><Link to="/politicians">Politicians</Link></Button>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild><Link to="/login">Log in</Link></Button>
            <Button size="sm" asChild><Link to="/signup">Sign up</Link></Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background pb-20 pt-16 md:pt-24">
        <div className="container relative z-10">
          <RevealSection className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl" style={{ lineHeight: "1.08" }}>
              Track Government Projects in Nigeria
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground" style={{ textWrap: "pretty" }}>
              Making public spending transparent and traceable. Monitor budgets, report corruption, and hold leaders accountable — starting with Gombe State.
            </p>
          </RevealSection>

          <RevealSection className="mx-auto mt-8 max-w-xl" delay={120}>
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search projects, locations, or contractors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 pl-10 text-base shadow-sm"
              />
            </div>
          </RevealSection>

          <RevealSection className="mx-auto mt-6 flex max-w-md justify-center gap-3" delay={200}>
            <Button size="lg" className="gap-2 shadow-md active:scale-[0.97]" asChild>
              <Link to="/projects"><BarChart3 className="h-4 w-4" /> View Projects</Link>
            </Button>
            <Button size="lg" variant="destructive" className="gap-2 shadow-md active:scale-[0.97]" asChild>
              <Link to="/report"><Camera className="h-4 w-4" /> Report an Issue</Link>
            </Button>
          </RevealSection>
        </div>
      </section>

      {/* Stats */}
      <section className="container -mt-8 relative z-10">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {stats.map((s, i) => (
            <RevealSection key={s.label} delay={i * 80}>
              <Card className="shadow-md transition-shadow hover:shadow-lg">
                <CardContent className="flex flex-col items-center gap-1 p-5">
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                  <span className="text-3xl font-bold tabular-nums text-foreground">{s.value}</span>
                  <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
                </CardContent>
              </Card>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Budget overview */}
      <section className="container mt-16">
        <RevealSection>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Budget Overview</h2>
              <p className="mt-1 text-sm text-muted-foreground">Gombe State 2025 allocation summary</p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <Link to="/dashboard">View dashboard <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
          </div>
        </RevealSection>
        <RevealSection delay={100}>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <Card className="shadow-sm">
              <CardContent className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Total Allocated</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-foreground">{formatNaira(projectStats.totalBudget)}</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Amount Spent</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-foreground">{formatNaira(projectStats.totalSpent)}</p>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardContent className="p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Utilization Rate</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-foreground">
                  {((projectStats.totalSpent / projectStats.totalBudget) * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>
          </div>
        </RevealSection>
      </section>

      {/* Recent Projects */}
      <section className="container mt-16">
        <RevealSection>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Recent Projects</h2>
              <p className="mt-1 text-sm text-muted-foreground">Latest government projects in Gombe State</p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <Link to="/projects">View all <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
          </div>
        </RevealSection>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((project, i) => (
            <RevealSection key={project.id} delay={i * 80}>
              <Link to={`/projects/${project.id}`}>
                <Card className="group overflow-hidden shadow-sm transition-all hover:shadow-lg active:scale-[0.98]">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-foreground line-clamp-1">{project.name}</h3>
                      <Badge className={`shrink-0 text-[10px] ${getStatusColor(project.status)}`}>
                        {getStatusLabel(project.status)}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{project.lga} LGA</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm font-semibold tabular-nums text-foreground">{formatNaira(project.budget)}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-warning text-warning" />
                        {project.averageRating.toFixed(1)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* Recent Reports */}
      <section className="container mt-16">
        <RevealSection>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Citizen Reports</h2>
              <p className="mt-1 text-sm text-muted-foreground">Recent community feedback on government projects</p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1" asChild>
              <Link to="/reports">View all <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
          </div>
        </RevealSection>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {citizenReports.map((report, i) => (
            <RevealSection key={report.id} delay={i * 80}>
              <Card className="overflow-hidden shadow-sm transition-shadow hover:shadow-md">
                <div className="aspect-video overflow-hidden">
                  <img src={report.imageUrl} alt={report.projectName} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <CardContent className="p-4">
                  <p className="text-xs font-medium text-destructive">{report.projectName}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-foreground">{report.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">— {report.reporterName}, {report.reporterLga}</p>
                </CardContent>
              </Card>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mt-20 mb-16">
        <RevealSection>
          <Card className="overflow-hidden border-primary/20 bg-primary/5 shadow-md">
            <CardContent className="flex flex-col items-center gap-4 p-10 text-center">
              <Camera className="h-10 w-10 text-primary" />
              <h2 className="text-2xl font-bold text-foreground">See Something? Report It.</h2>
              <p className="max-w-lg text-muted-foreground" style={{ textWrap: "pretty" }}>
                Your reports help keep leaders accountable. Upload photos of abandoned projects, poor-quality work, or misuse of public funds.
              </p>
              <Button size="lg" className="mt-2 gap-2 shadow-md active:scale-[0.97]" asChild>
                <Link to="/report"><Camera className="h-4 w-4" /> Submit a Report</Link>
              </Button>
            </CardContent>
          </Card>
        </RevealSection>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container flex flex-col items-center gap-4 py-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-sm font-semibold text-foreground">OpenGov Nigeria</p>
            <p className="text-xs text-muted-foreground">Making government spending transparent since 2025</p>
          </div>
          <p className="text-xs text-muted-foreground">Built for the people of Nigeria 🇳🇬</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
