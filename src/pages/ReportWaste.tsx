import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Camera, 
  MapPin, 
  Trash2, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Loader2,
  AlertCircle,
  Scan
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type Step = "location" | "photo" | "classify" | "confirm";

const ReportWaste = () => {
  const [currentStep, setCurrentStep] = useState<Step>("location");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [classification, setClassification] = useState<{
    category: string;
    confidence: number;
    description: string;
  } | null>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const steps: { id: Step; label: string }[] = [
    { id: "location", label: "Location" },
    { id: "photo", label: "Photo" },
    { id: "classify", label: "Classify" },
    { id: "confirm", label: "Finish" },
  ];

  const handleNext = () => {
    if (currentStep === "location") {
      if (!location) {
        toast.error("Please enter a location");
        return;
      }
      setCurrentStep("photo");
    } else if (currentStep === "photo") {
      if (!photo) {
        toast.error("Please upload a photo of the waste");
        return;
      }
      handleClassify();
    } else if (currentStep === "classify") {
      setCurrentStep("confirm");
    }
  };

  const handleBack = () => {
    if (currentStep === "photo") setCurrentStep("location");
    else if (currentStep === "classify") setCurrentStep("photo");
    else if (currentStep === "confirm") setCurrentStep("classify");
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClassify = () => {
    setLoading(true);
    // Simulate AI classification
    setTimeout(() => {
      const mockCategories = [
        { category: "Plastic", confidence: 0.94, description: "Plastic bottles, containers, and packaging." },
        { category: "Organic", confidence: 0.88, description: "Food waste, garden cuttings, and biomass." },
        { category: "Metal", confidence: 0.91, description: "Aluminum cans, scrap metal, and tin." },
        { category: "Paper/Cardboard", confidence: 0.96, description: "Cardboard boxes, newspaper, and paper waste." },
      ];
      const randomCategory = mockCategories[Math.floor(Math.random() * mockCategories.length)];
      setClassification(randomCategory);
      setLoading(false);
      setCurrentStep("classify");
      toast.success("AI Classification complete!");
    }, 2000);
  };

  const handleSubmit = () => {
    setLoading(true);
    // Simulate save to localStorage
    const report = {
      id: Math.random().toString(36).substr(2, 9),
      location,
      category: classification?.category,
      photo,
      status: "Pending",
      timestamp: new Date().toISOString(),
      points: 50
    };
    
    const existingReports = JSON.parse(localStorage.getItem("cleanCalabarReports") || "[]");
    localStorage.setItem("cleanCalabarReports", JSON.stringify([...existingReports, report]));
    
    // Update user points
    const currentPoints = parseInt(localStorage.getItem("cleanCalabarPoints") || "0");
    localStorage.setItem("cleanCalabarPoints", (currentPoints + 50).toString());

    setTimeout(() => {
      setLoading(false);
      toast.success("Waste report submitted successfully! +50 Points earned.");
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Report Waste</h1>
        <p className="text-muted-foreground">Follow the steps to report illegal dumping or full bins.</p>
      </div>

      {/* Progress Stepper */}
      <div className="flex justify-between items-center mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -z-10" />
        {steps.map((step, idx) => (
          <div key={step.id} className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
              currentStep === step.id ? "bg-green-600 text-white shadow-lg shadow-green-200" : 
              steps.findIndex(s => s.id === currentStep) > idx ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
            }`}>
              {steps.findIndex(s => s.id === currentStep) > idx ? <CheckCircle2 className="h-6 w-6" /> : idx + 1}
            </div>
            <span className={`mt-2 text-xs font-semibold ${currentStep === step.id ? "text-green-700" : "text-muted-foreground"}`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <Card className="border-none shadow-xl overflow-hidden min-h-[400px]">
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            {currentStep === "location" && (
              <motion.div
                key="location"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                    <MapPin className="h-5 w-5" />
                    Where is the waste located?
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address or Landmark</Label>
                    <Input 
                      id="address" 
                      placeholder="e.g. Near University of Calabar main gate" 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="h-48 w-full bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-200">
                    <div className="text-center text-slate-500">
                      <MapPin className="h-10 w-10 mx-auto mb-2 opacity-20" />
                      <p className="text-sm">Interactive map will load here</p>
                      <Button variant="link" className="text-green-600" onClick={() => setLocation("Duke Town, Calabar South")}>
                        Use Current Location
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === "photo" && (
              <motion.div
                key="photo"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                    <Camera className="h-5 w-5" />
                    Take a clear photo
                  </div>
                  
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="relative h-64 w-full bg-slate-50 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-green-200 cursor-pointer hover:bg-green-50/50 transition-colors overflow-hidden"
                  >
                    {photo ? (
                      <img src={photo} alt="Waste" className="h-full w-full object-cover" />
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                          <Camera className="h-8 w-8 text-green-600" />
                        </div>
                        <p className="font-medium text-slate-700">Click to upload or take photo</p>
                        <p className="text-xs text-slate-500 mt-1">High quality photos help our AI classify waste</p>
                      </>
                    )}
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handlePhotoUpload} 
                  />
                  {photo && (
                    <Button variant="ghost" className="w-full text-slate-500" onClick={() => setPhoto(null)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove Photo
                    </Button>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === "classify" && (
              <motion.div
                key="classify"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="text-center space-y-4">
                  {loading ? (
                    <div className="py-12 flex flex-col items-center">
                      <div className="relative mb-6">
                        <Loader2 className="h-16 w-16 text-green-600 animate-spin" />
                        <Scan className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-green-600 opacity-50" />
                      </div>
                      <h3 className="text-xl font-bold">AI is analyzing waste type...</h3>
                      <p className="text-muted-foreground">Matching against Calabar waste patterns</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-center gap-2 text-green-700 font-semibold mb-4">
                        <CheckCircle2 className="h-5 w-5" />
                        AI Analysis Complete
                      </div>
                      
                      <div className="bg-green-50 border border-green-100 p-6 rounded-2xl">
                        <p className="text-sm font-bold text-green-700 uppercase tracking-widest mb-1">Detected Category</p>
                        <h2 className="text-4xl font-black text-green-900 mb-2">{classification?.category}</h2>
                        <div className="flex items-center justify-center gap-2 mb-4">
                          <div className="w-full max-w-[200px] bg-green-200 h-2 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${(classification?.confidence || 0) * 100}%` }}
                              className="bg-green-600 h-full"
                            />
                          </div>
                          <span className="text-xs font-bold text-green-600">
                            {Math.round((classification?.confidence || 0) * 100)}% Confidence
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm">{classification?.description}</p>
                      </div>

                      <div className="flex flex-col gap-3">
                        <Button variant="outline" className="text-xs text-muted-foreground border-slate-200">
                          <AlertCircle className="h-3 w-3 mr-2" />
                          Category incorrect? Provide feedback
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {currentStep === "confirm" && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-green-700 font-semibold mb-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Final Review
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="aspect-square rounded-xl overflow-hidden border">
                      <img src={photo || ""} alt="Reported Waste" className="h-full w-full object-cover" />
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">Location</Label>
                        <p className="font-medium text-sm">{location}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Category</Label>
                        <p className="font-medium text-sm">{classification?.category}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Estimated Points</Label>
                        <p className="font-bold text-green-600">+50 Points</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Additional Notes (Optional)</Label>
                    <Textarea id="notes" placeholder="Describe the volume or severity..." />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-between pt-6 border-t">
            {currentStep !== "location" ? (
              <Button variant="ghost" onClick={handleBack} disabled={loading}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            ) : (
              <div />
            )}
            
            {currentStep === "confirm" ? (
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white px-8" 
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle2 className="h-4 w-4 mr-2" />}
                Submit Report
              </Button>
            ) : (
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white px-8" 
                onClick={handleNext}
                disabled={loading}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportWaste;