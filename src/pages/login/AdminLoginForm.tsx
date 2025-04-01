
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { adminLogin } from "@/services/api";

interface AdminLoginFormProps {
  setError: (error: string | null) => void;
}

export const AdminLoginForm = ({ setError }: AdminLoginFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Admin login state
  const [adminId, setAdminId] = useState("");
  const [adminFirstName, setAdminFirstName] = useState("");
  const [adminLastName, setAdminLastName] = useState("");

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!adminId || !adminFirstName || !adminLastName) {
      toast({
        title: "Login Failed",
        description: "Please enter all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await adminLogin(adminId, adminFirstName, adminLastName);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${adminFirstName} ${adminLastName}!`,
      });
      navigate("/admin-dashboard");
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
        <CardTitle>Admin Login</CardTitle>
        <CardDescription>
          Enter your admin credentials to access the dashboard.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleAdminLogin}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-id">Admin ID</Label>
            <Input 
              id="admin-id" 
              placeholder="e.g. ADM001" 
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-firstname">First Name</Label>
            <Input 
              id="admin-firstname" 
              placeholder="Enter your first name" 
              value={adminFirstName}
              onChange={(e) => setAdminFirstName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-lastname">Last Name</Label>
            <Input 
              id="admin-lastname" 
              placeholder="Enter your last name" 
              value={adminLastName}
              onChange={(e) => setAdminLastName(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login as Admin"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
