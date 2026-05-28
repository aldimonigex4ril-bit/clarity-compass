import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf, Recycle, MapPin, Award, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-green-950 px-6 py-16 md:px-12 md:py-24 text-white">
        <div className="relative z-10 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl mb-6">
              Empowering Citizens for a <span className="text-green-400">Cleaner Calabar</span>
            </h1>
            <p className="text-lg text-green-100/90 mb-8 leading-relaxed">
              Report waste, track collection, and earn rewards. Join the movement to make our city the cleanest in West Africa through AI-powered waste management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 text-white border-none text-lg px-8 py-6 h-auto">
                <Link to="/report">
                  Report Waste Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-green-400 text-green-400 hover:bg-green-400/10 text-lg px-8 py-6 h-auto">
                <Link to="/rewards">View Rewards</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute right-0 top-0 h-full w-full md:w-1/2 opacity-20 md:opacity-40">
           <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/91e7ca6a-efc3-4367-bafd-63b108045d4b/hero-waste-management-3c841296-1779966430543.webp" 
            alt="Waste Management" 
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            CleanCalabar uses advanced technology and community participation to revolutionize waste management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: MapPin,
              title: "Spot & Report",
              description: "Identify waste in your area and report it instantly via our map-based interface.",
              color: "bg-blue-100 text-blue-600"
            },
            {
              icon: Recycle,
              title: "AI Classification",
              description: "Our AI automatically categorizes waste types and recommends the best disposal method.",
              color: "bg-green-100 text-green-600"
            },
            {
              icon: Award,
              title: "Earn Rewards",
              description: "Collect points for every report and redeem them for community benefits and gifts.",
              color: "bg-amber-100 text-amber-600"
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-card">
                <CardContent className="pt-8 pb-8 px-8 text-center">
                  <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats / Impact */}
      <section className="bg-green-50 rounded-3xl p-12 text-center border border-green-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: "Reports Fixed", value: "2,450+" },
            { label: "Community Members", value: "1,200" },
            { label: "Waste Recycled", value: "15 Tons" },
            { label: "Active Recyclers", value: "48" }
          ].map((stat, i) => (
            <div key={i}>
              <p className="text-4xl font-black text-green-700 mb-1">{stat.value}</p>
              <p className="text-green-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Community Section */}
      <section className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/91e7ca6a-efc3-4367-bafd-63b108045d4b/community-cleanup-111aabb0-1779966430255.webp" 
            alt="Community cleaning" 
            className="rounded-3xl shadow-2xl"
          />
        </div>
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider">
            <Users className="h-3 w-3" />
            Community Driven
          </div>
          <h2 className="text-4xl font-bold leading-tight">Together, We Can Clean Our City</h2>
          <p className="text-lg text-muted-foreground">
            CleanCalabar is more than just an app; it's a movement. By connecting citizens with government agencies and private recyclers, we create a seamless ecosystem for urban hygiene.
          </p>
          <ul className="space-y-4">
            {[
              "Real-time tracking of cleanup operations",
              "Feedback loops for AI accuracy",
              "Direct communication with waste collectors",
              "Public recognition for top contributors"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="font-medium">{item}</span>
              </li>
            ))}
          </ul>
          <Button className="bg-green-600 hover:bg-green-700 mt-4">Learn About Our Mission</Button>
        </div>
      </section>
    </div>
  );
};

export default Home;