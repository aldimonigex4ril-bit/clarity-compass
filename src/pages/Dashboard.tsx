import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Trash2, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  MapPin,
  Filter,
  ArrowUpRight,
  MoreVertical,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Report {
  id: string;
  location: string;
  category: string;
  status: string;
  timestamp: string;
  points: number;
}

const Dashboard = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    collected: 0,
    points: 0
  });

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cleanCalabarReports") || "[]");
    const points = parseInt(localStorage.getItem("cleanCalabarPoints") || "0");
    setReports(data.reverse());
    
    setStats({
      total: data.length,
      pending: data.filter((r: any) => r.status === "Pending").length,
      collected: data.filter((r: any) => r.status === "Collected").length,
      points: points
    });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-amber-100 text-amber-700 border-amber-200";
      case "Collected": return "bg-green-100 text-green-700 border-green-200";
      case "In Progress": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your waste management impact.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
          <Button className="bg-green-600 hover:bg-green-700">Download Report</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Reports", value: stats.total, icon: BarChart3, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "Pending Tasks", value: stats.pending, icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
          { label: "Resolved", value: stats.collected, icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" },
          { label: "Total Points", value: stats.points, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="border-none shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-xl ${stat.bg}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider">
                    <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                    +12%
                  </Badge>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <h3 className="text-3xl font-bold mt-1">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Reports Table */}
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Reports</CardTitle>
              <p className="text-sm text-muted-foreground">Your latest waste reporting activities.</p>
            </div>
            <Button variant="ghost" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </CardHeader>
          <CardContent>
            {reports.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Waste Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Points</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                            {report.category}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {report.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(report.status)} border-none font-medium`}>
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-bold text-green-600">+{report.points}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>View Map</DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">Cancel Report</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center bg-slate-50 rounded-xl">
                <div className="p-4 rounded-full bg-slate-100 mb-4">
                  <AlertCircle className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="font-bold text-lg">No reports yet</h3>
                <p className="text-muted-foreground max-w-xs mx-auto mb-6">
                  Start reporting waste in your community to see your activities here.
                </p>
                <Button className="bg-green-600" asChild>
                  <a href="/report">Make First Report</a>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Insights / Neighborhood impact */}
        <div className="space-y-6">
          <Card className="border-none shadow-sm bg-green-900 text-white">
            <CardHeader>
              <CardTitle className="text-lg">AI Impact Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                <p className="text-xs text-green-300 font-bold uppercase mb-1">Top Recycled Area</p>
                <p className="text-lg font-bold">Duke Town, Calabar South</p>
                <div className="mt-2 h-1.5 w-full bg-white/20 rounded-full">
                  <div className="bg-green-400 h-full w-[85%] rounded-full" />
                </div>
              </div>
              <div className="p-4 bg-white/10 rounded-xl border border-white/20">
                <p className="text-xs text-green-300 font-bold uppercase mb-1">Waste Trends</p>
                <p className="text-sm">Plastic reports increased by 20% this week. Collection routes optimized.</p>
              </div>
              <Button variant="secondary" className="w-full font-bold">View Full Analytics</Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Cleanups</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Marina Road Sweep", date: "Sat, Nov 2", users: 24 },
                { title: "UNICAL Campus Clean", date: "Wed, Nov 6", users: 156 },
              ].map((event, i) => (
                <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors border cursor-pointer">
                  <div className="bg-green-100 text-green-700 p-2 rounded-lg font-bold text-xs text-center min-w-[50px]">
                    {event.date.split(',')[1].trim()}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground">{event.users} volunteers joined</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;