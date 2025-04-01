
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
      await consumerLogin(consumerId, consumerFirstName, consumerLastName);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${consumerFirstName} ${consumerLastName}!`,
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
    <Card>
      <CardHeader>
        <CardTitle>Consumer Login</CardTitle>
        <CardDescription>
          Enter your consumer credentials to access your account.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleConsumerLogin}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="consumer-id">Consumer ID</Label>
            <Input 
              id="consumer-id" 
              placeholder="e.g. CON001" 
              value={consumerId}
              onChange={(e) => setConsumerId(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="consumer-firstname">First Name</Label>
            <Input 
              id="consumer-firstname" 
              placeholder="Enter your first name" 
              value={consumerFirstName}
              onChange={(e) => setConsumerFirstName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="consumer-lastname">Last Name</Label>
            <Input 
              id="consumer-lastname" 
              placeholder="Enter your last name" 
              value={consumerLastName}
              onChange={(e) => setConsumerLastName(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login as Consumer"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
