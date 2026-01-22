import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Send, Loader2 } from "lucide-react";

interface ContactFormProps {
  variant?: "desktop" | "mobile";
}

const ContactForm = ({ variant = "desktop" }: ContactFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !phone || !message) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name, phone, and message.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-inquiry", {
        body: { name, phone, email, message },
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });

      // Clear form
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (error: any) {
      console.error("Error sending inquiry:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please call us directly at 253-267-3212.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isMobile = variant === "mobile";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className={isMobile ? "space-y-3" : "grid grid-cols-2 gap-3"}>
        <Input
          placeholder="Your Name *"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={isMobile 
            ? "bg-white/10 border-white/20 text-white placeholder:text-white/50" 
            : "bg-secondary/10 border-secondary/30 text-secondary placeholder:text-secondary/50"
          }
          required
        />
        <Input
          placeholder="Phone Number *"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={isMobile 
            ? "bg-white/10 border-white/20 text-white placeholder:text-white/50" 
            : "bg-secondary/10 border-secondary/30 text-secondary placeholder:text-secondary/50"
          }
          required
        />
      </div>
      <Input
        placeholder="Email (optional - for confirmation)"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={isMobile 
          ? "bg-white/10 border-white/20 text-white placeholder:text-white/50" 
          : "bg-secondary/10 border-secondary/30 text-secondary placeholder:text-secondary/50"
        }
      />
      <Textarea
        placeholder="Tell us about your move... *"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={3}
        className={isMobile 
          ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 resize-none" 
          : "bg-secondary/10 border-secondary/30 text-secondary placeholder:text-secondary/50 resize-none"
        }
        required
      />
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Inquiry
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;
