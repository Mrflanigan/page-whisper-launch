import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, FileText } from "lucide-react";

interface QuoteModalProps {
  triggerClassName?: string;
  triggerVariant?: "default" | "outline" | "secondary";
}

const QuoteModal = ({ triggerClassName, triggerVariant = "default" }: QuoteModalProps) => {
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [hasTruck, setHasTruck] = useState<string>("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !message) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name, phone, and move details.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const inquiryMessage = `${message}\n\nTruck Status: ${hasTruck || "Not specified"}`;
      
      const { data, error } = await supabase.functions.invoke("send-inquiry", {
        body: { 
          name: fullName, 
          phone, 
          email, 
          message: inquiryMessage 
        },
      });

      if (error) throw error;

      toast({
        title: "Quote Request Sent!",
        description: "We'll get back to you as soon as possible.",
      });

      // Clear form and close modal
      setFullName("");
      setPhone("");
      setEmail("");
      setHasTruck("");
      setMessage("");
      setOpen(false);
    } catch (error: any) {
      console.error("Error sending inquiry:", error);
      toast({
        title: "Error",
        description: "Failed to send request. Please call us directly at 253-267-3212.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={triggerVariant}
          className={triggerClassName}
        >
          <FileText className="w-5 h-5 mr-2" />
          Request a Quote
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center font-oswald uppercase text-foreground">
            Top Choice Moving
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm font-medium">Do you have a truck lined up?</Label>
            <RadioGroup 
              value={hasTruck} 
              onValueChange={setHasTruck}
              className="mt-2 space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="truck-yes" />
                <Label htmlFor="truck-yes" className="font-normal cursor-pointer">
                  Yes, I have a truck
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="truck-no" />
                <Label htmlFor="truck-no" className="font-normal cursor-pointer">
                  No, I need help with that
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="message">Tell Us About Your Move *</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your move..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="mt-1 resize-none"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              "Request a Quote"
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            We never share your information
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteModal;
