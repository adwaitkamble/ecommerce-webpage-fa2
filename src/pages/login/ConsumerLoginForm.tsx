
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { consumerLogin } from "@/services/api";

interface ConsumerLoginFormProps {
  setError: (error: string | null) => void;
}

export const ConsumerLoginForm = ({ setError }: ConsumerLoginFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Consumer login state
  const [consumerId, setConsumerId] = useState("");
  const [consumerFirstName, setConsumerFirstName] = useState("");
  const [consumerLastName, setConsumerLastName] = useState("");

  const handleConsumerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!consumerId || !consumerFirstName || !consumerLastName) {
      toast({
        title: "Login Failed",
        description: "Please enter all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await consumerLogin(consumerId, consumerFirstName, consumerLastName);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${response.consumer.firstName} ${response.consumer.lastName}!`,
      });
      navigate("/consumer-dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Set appropriate error message based on the error
      let errorMessage = "Invalid credentials or server error";
      if (error.message === "Cannot connect to server. Please check if the backend is running.") {
        errorMessage = error.message;
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      setError(errorMessage);
      
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleConsumerLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="consumer-id">Consumer ID</Label>
        <Input 
          id="consumer-id" 
          placeholder="e.g. CON001" 
          value={consumerId}
          onChange={(e) => setConsumerId(e.target.value)}
          className="bg-card/50 border-border/40 focus:border-primary"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="consumer-firstname">First Name</Label>
        <Input 
          id="consumer-firstname" 
          placeholder="Enter your first name" 
          value={consumerFirstName}
          onChange={(e) => setConsumerFirstName(e.target.value)}
          className="bg-card/50 border-border/40 focus:border-primary"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="consumer-lastname">Last Name</Label>
        <Input 
          id="consumer-lastname" 
          placeholder="Enter your last name" 
          value={consumerLastName}
          onChange={(e) => setConsumerLastName(e.target.value)}
          className="bg-card/50 border-border/40 focus:border-primary"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary" 
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login as Consumer"}
      </Button>
    </form>
  );
};
