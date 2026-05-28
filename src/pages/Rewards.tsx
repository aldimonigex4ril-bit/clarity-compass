import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Award, 
  Gift, 
  Star, 
  ChevronRight, 
  Zap,
  ShoppingBag,
  History,
  ShieldCheck,
  Trophy
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const Rewards = () => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const savedPoints = parseInt(localStorage.getItem("cleanCalabarPoints") || "0");
    setPoints(savedPoints);
  }, []);

  const handleRedeem = (item: string, cost: number) => {
    if (points >= cost) {
      const newPoints = points - cost;
      setPoints(newPoints);
      localStorage.setItem("cleanCalabarPoints", newPoints.toString());
      toast.success(`Successfully redeemed ${item}!`, {
        description: "Your reward code has been sent to your email."
      });
    } else {
      toast.error("Insufficient points", {
        description: `You need ${cost - points} more points for this reward.`
      });
    }
  };

  const rewards = [
    {
      id: 1,
      title: "Public Transport Voucher",
      description: "Free 1-day pass for Calabar Transit",
      cost: 200,
      icon: Zap,
      category: "Transport",
      image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 2,
      title: "Recycling Kit",
      description: "Branded bins and gloves for home use",
      cost: 500,
      icon: ShoppingBag,
      category: "Equipment",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 3,
      title: "Grocery Gift Card",
      description: "N5,000 voucher for local markets",
      cost: 1000,
      icon: Gift,
      category: "Shopping",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=60"
    },
    {
      id: 4,
      title: "Community Hero Badge",
      description: "Exclusive digital badge & certificate",
      cost: 100,
      icon: Award,
      category: "Social",
      image: "https://images.unsplash.com/photo-1578357078586-491aff1ab5db?w=800&auto=format&fit=crop&q=60"
    }
  ];

  return (
    <div className="space-y-12 pb-20">
      {/* Points Profile Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-600 to-green-800 p-8 md:p-12 text-white">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 rounded-full border-4 border-white/30 bg-white/20 flex items-center justify-center relative">
            <div className="absolute -top-2 -right-2 bg-yellow-400 p-2 rounded-full border-2 border-green-700">
              <Star className="h-5 w-5 text-green-900 fill-green-900" />
            </div>
            <Award className="h-16 w-16" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-black mb-1">Eco-Hero Status</h1>
            <p className="text-green-100 mb-6">You've reported 12 waste sites in Calabar.</p>
            
            <div className="max-w-md mx-auto md:mx-0">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold uppercase tracking-wider">Level 3: Guardian</span>
                <span className="text-sm font-bold">{points} / 2000 XP</span>
              </div>
              <Progress value={(points / 2000) * 100} className="h-3 bg-white/20" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center min-w-[160px]">
            <p className="text-xs font-bold uppercase text-green-200 mb-1">Available Points</p>
            <p className="text-5xl font-black">{points}</p>
            <Button variant="link" className="text-white text-xs mt-2 h-auto p-0 opacity-80 hover:opacity-100">
              How to earn more?
            </Button>
          </div>
        </div>
      </section>

      {/* Rewards Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Redeem Rewards</h2>
            <p className="text-muted-foreground">Turn your impact into tangible benefits.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-full">All</Button>
            <Button variant="ghost" size="sm" className="rounded-full">Vouchers</Button>
            <Button variant="ghost" size="sm" className="rounded-full">Merch</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((reward) => (
            <motion.div
              key={reward.id}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="border-none shadow-md overflow-hidden flex flex-col h-full bg-card">
                <div className="h-40 w-full relative overflow-hidden">
                  <img 
                    src={reward.image} 
                    alt={reward.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-black hover:bg-white border-none font-bold text-[10px] uppercase">
                      {reward.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-5 flex-1">
                  <CardTitle className="text-lg">{reward.title}</CardTitle>
                  <CardDescription className="text-xs">{reward.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-5 pt-0 mt-auto">
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-1">
                      <Zap className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-bold">{reward.cost}</span>
                    </div>
                    <Button 
                      size="sm" 
                      className={`${points >= reward.cost ? "bg-green-600 hover:bg-green-700" : "bg-slate-200 text-slate-500"}`}
                      disabled={points < reward.cost}
                      onClick={() => handleRedeem(reward.title, reward.cost)}
                    >
                      Redeem
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Badges & Achievements */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Badges you've earned on your journey.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="text-green-600 font-bold">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { label: "First Report", icon: Trophy, color: "text-amber-500", active: true },
                { label: "Plastic Pro", icon: ShieldCheck, color: "text-blue-500", active: true },
                { label: "Community Leader", icon: Users, color: "text-purple-500", active: false },
                { label: "Green Elite", icon: Award, color: "text-green-500", active: false },
              ].map((badge, i) => (
                <div key={i} className={`flex flex-col items-center gap-3 ${badge.active ? "opacity-100" : "opacity-30 grayscale"}`}>
                  <div className={`w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center border-2 ${badge.active ? "border-green-200" : "border-slate-200"}`}>
                    <badge.icon className={`h-8 w-8 ${badge.color}`} />
                  </div>
                  <span className="text-xs font-bold">{badge.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5 text-green-600" />
              History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center py-8 text-muted-foreground italic text-sm">
              No recent reward redemptions.
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

// Mock Users icon for badges
const Users = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export default Rewards;