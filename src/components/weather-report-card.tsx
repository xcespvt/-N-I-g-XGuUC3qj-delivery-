
"use client"
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Cloud, CloudLightning, CloudRain, Sun, Wind } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { cn } from "@/lib/utils";

const weatherOptions = [
    { id: "sunny", label: "Sunny", icon: Sun, requiresMedia: false },
    { id: "cloudy", label: "Cloudy", icon: Cloud, requiresMedia: false },
    { id: "rainy", label: "Rainy", icon: CloudRain, requiresMedia: true },
    { id: "stormy", label: "Stormy", icon: CloudLightning, requiresMedia: true },
    { id: "windy", label: "Windy", icon: Wind, requiresMedia: false },
];

export default function WeatherReportCard() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedWeather, setSelectedWeather] = useState("cloudy");
  const [file, setFile] = useState<File | null>(null);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setTimeout(() => {
        setStep(1);
        setSelectedWeather("cloudy");
        setFile(null);
      }, 200); 
    }
    setIsOpen(open);
  };

  const handleNext = () => {
    const selectedOption = weatherOptions.find(opt => opt.id === selectedWeather);
    if (selectedOption?.requiresMedia) {
      setStep(2);
    } else {
      handleReport();
    }
  };

  const handleReport = () => {
    handleOpenChange(false);
    toast({
        title: "Report Submitted",
        description: "Thank you for helping keep the community updated!",
    });
  };

  return (
    <>
      <Card className="transition-all duration-300">
        <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-base">Report Weather</p>
              <p className="text-sm text-muted-foreground">Help us with real-time weather updates.</p>
            </div>
            <Sheet open={isOpen} onOpenChange={handleOpenChange}>
              <SheetTrigger asChild>
                <Button>Report</Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="rounded-t-3xl">
                {step === 1 && (
                  <>
                    <SheetHeader className="text-center">
                      <SheetTitle>Report Weather Conditions</SheetTitle>
                      <SheetDescription>
                        Select the current weather in your area. Your report is anonymous.
                      </SheetDescription>
                    </SheetHeader>
                    <RadioGroup value={selectedWeather} onValueChange={setSelectedWeather} className="grid grid-cols-2 gap-4 my-4">
                      {weatherOptions.map(option => (
                        <Label key={option.id} htmlFor={option.id} className={cn("flex flex-col items-center justify-center gap-2 rounded-lg border p-4 transition-colors cursor-pointer hover:bg-accent",
                          selectedWeather === option.id && "bg-primary text-primary-foreground border-primary"
                        )}>
                            <RadioGroupItem value={option.id} id={option.id} className="sr-only"/>
                            <option.icon className="h-8 w-8" />
                            <span className="font-semibold">{option.label}</span>
                        </Label>
                      ))}
                    </RadioGroup>
                    <SheetFooter>
                      <SheetClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </SheetClose>
                      <Button onClick={handleNext}>Next</Button>
                    </SheetFooter>
                  </>
                )}
                {step === 2 && (
                  <>
                    <SheetHeader>
                      <SheetTitle>Share Evidence</SheetTitle>
                      <SheetDescription>
                        For conditions like rain or storms, a photo helps us verify faster. This is optional.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="my-4 space-y-2">
                      <Label htmlFor="weather-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Camera className="w-8 h-8 mb-2 text-muted-foreground"/>
                              <p className="mb-1 text-sm text-muted-foreground">
                                <span className="font-semibold">Click to upload</span> a photo or video
                              </p>
                              {file && <p className="text-xs text-primary">{file.name}</p>}
                          </div>
                          <Input id="weather-file" type="file" className="hidden" accept="image/*,video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                      </Label>
                    </div>
                    <SheetFooter>
                      <Button variant="ghost" onClick={() => setStep(1)}>Back</Button>
                      <Button onClick={handleReport}>Submit Report</Button>
                    </SheetFooter>
                  </>
                )}
              </SheetContent>
            </Sheet>
        </CardContent>
      </Card>
    </>
  );
}
