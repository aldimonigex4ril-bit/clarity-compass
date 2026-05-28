import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { 
  Home as HomeIcon, 
  MapPin, 
  BarChart3, 
  Gift, 
  PlusCircle, 
  Menu, 
  X,
  Leaf,
  Settings,
  Bell,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import Home from "./pages/Home";
import ReportWaste from "./pages/ReportWaste";
import Dashboard from "./pages/Dashboard";
import Rewards from "./pages/Rewards";
import { motion, AnimatePresence } from "framer-motion";

function AppShell({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Report Waste", path: "/report", icon: PlusCircle },
    { name: "Dashboard", path: "/dashboard", icon: BarChart3 },
    { name: "Rewards", path: "/rewards", icon: Gift },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold tracking-tight text-green-900">CleanCalabar</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`transition-colors hover:text-green-600 flex items-center gap-2 ${
                  location.pathname === item.path ? "text-green-600 font-semibold" : "text-muted-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
            <div className="flex items-center space-x-3 ml-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="rounded-full border-green-200">
                <User className="h-5 w-5 mr-2" />
                Login
              </Button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-muted-foreground" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 z-40 bg-background pt-20 px-6"
          >
            <div className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center gap-4 text-xl font-medium ${
                    location.pathname === item.path ? "text-green-600" : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="h-6 w-6" />
                  {item.name}
                </Link>
              ))}
              <hr />
              <Button className="w-full bg-green-600 hover:bg-green-700">Get Started</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 md:px-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-2">
              <Leaf className="h-5 w-5 text-green-600" />
              <span className="font-bold text-green-900">CleanCalabar</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2024 CleanCalabar initiative. Making our city greener, together.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="text-muted-foreground hover:text-green-600">Privacy</Link>
              <Link to="#" className="text-muted-foreground hover:text-green-600">Terms</Link>
              <Link to="#" className="text-muted-foreground hover:text-green-600">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
      <Toaster position="top-right" richColors />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/report" element={<ReportWaste />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rewards" element={<Rewards />} />
        </Routes>
      </AppShell>
    </Router>
  );
}

export default App;