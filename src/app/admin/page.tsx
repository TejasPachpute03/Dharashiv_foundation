"use client";

import { useMemo } from "react";
import { Users, UserCheck, Briefcase, Link as LinkIcon, Activity, Bell } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { StatCard } from "@/components/shared/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', 
  '#ef4444', '#f97316', '#84cc16', '#14b8a6', '#3b82f6', 
  '#8b5cf6', '#ec4899', '#f43f5e', '#64748b'
];

// Mock data for Registration Growth
const growthData = [
  { name: 'Jan', members: 40 },
  { name: 'Feb', members: 60 },
  { name: 'Mar', members: 85 },
  { name: 'Apr', members: 120 },
  { name: 'May', members: 170 },
  { name: 'Jun', members: 210 },
];

export default function AdminDashboardPage() {
  const { entrepreneurs, events, announcements } = useAppContext();

  const totalEntrepreneurs = entrepreneurs.length;
  const activeMembers = entrepreneurs.filter(e => e.status === "Active").length;
  const pendingMembers = entrepreneurs.filter(e => e.status === "Pending").length;

  // Pie Chart Data
  const categoryData = useMemo(() => {
    const counts = entrepreneurs.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(counts).map(([name, value]) => ({
      name,
      value
    }));
  }, [entrepreneurs]);

  // Recent Registrations
  const recentRegistrations = [...entrepreneurs].reverse().slice(0, 5);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-secondary">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-1">Monitor the network's growth and recent activities.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Total Entrepreneurs" 
          value={totalEntrepreneurs.toString()} 
          icon={<Users className="text-secondary" />} 
          description="Registered profiles"
          href="/admin/members"
        />
        <StatCard 
          title="Active Members" 
          value={activeMembers.toString()} 
          icon={<UserCheck className="text-success" />} 
          description="Approved and active"
          href="/admin/members?status=Active"
        />
        <StatCard 
          title="Pending Approvals" 
          value={pendingMembers.toString()} 
          icon={<Users className="text-accent" />} 
          description="Awaiting review"
          href="/admin/pending"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* ROW 1: Pie Chart (Left 2/3) + Events & Settings (Right 1/3) */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Members by Industry</CardTitle>
            </CardHeader>
            <CardContent className="h-[450px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="65%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={120}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ value }) => value}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend 
                    layout="vertical" 
                    verticalAlign="middle" 
                    align="left"
                    wrapperStyle={{ paddingLeft: '10px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {events.slice(0, 2).map(ev => (
                <div key={ev.id} className="border-l-2 border-accent pl-3 pb-2">
                  <p className="text-xs font-semibold text-accent mb-1">{ev.date}</p>
                  <p className="text-sm font-medium leading-tight">{ev.title}</p>
                </div>
              ))}
              <Button variant="outline" className="w-full text-xs" asChild>
                <a href="/admin/events">Manage Events</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Bell className="w-5 h-5 mr-2 text-muted-foreground" />
                Latest Announcements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {announcements.slice(0, 3).map(ann => (
                <div key={ann.id} className="group border-b last:border-0 pb-4 last:pb-0">
                  <p className="text-xs text-muted-foreground mb-1">{new Date(ann.createdAt).toLocaleDateString()}</p>
                  <p className="text-sm font-medium leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {ann.title}
                  </p>
                </div>
              ))}
              <Button variant="outline" className="w-full text-xs" asChild>
                <a href="/admin/announcements">Manage Announcements</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* ROW 2: Area Chart (Left 2/3) + Recent Registrations (Right 1/3) */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Registration Growth</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={growthData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0088FE" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="members" stroke="#0088FE" fillOpacity={1} fill="url(#colorMembers)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentRegistrations.map((user) => (
                  <div key={user.id} className="flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-3 bg-muted shrink-0">
                      <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="space-y-1 flex-1 overflow-hidden">
                      <p className="text-sm font-medium leading-none truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.companyName}</p>
                    </div>
                    <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
