
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { adminLogin, consumerLogin } from "@/services/api";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState({
    admin: false,
    consumer: false
  });
  const [error, setError] = useState<string | null>(null);
  
  // Admin login state
  const [adminId, setAdminId] = useState("");
  const [adminFirstName, setAdminFirstName] = useState("");
  const [adminLastName, setAdminLastName] = useState("");
  
  // Consumer login state
  const [consumerId, setConsumerId] = useState("");
  const [consumerFirstName, setConsumerFirstName] = useState("");
  const [consumerLastName, setConsumerLastName] = useState("");
  
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
    
    setIsLoading(prev => ({ ...prev, admin: true }));
    
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
      setIsLoading(prev => ({ ...prev, admin: false }));
    }
  };
  
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
    
    setIsLoading(prev => ({ ...prev, consumer: true }));
    
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
      setIsLoading(prev => ({ ...prev, consumer: false }));
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">E-Commerce Portal</h1>
          <p className="text-gray-500">Login to access your account</p>
        </div>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}
        
        <Tabs defaultValue="admin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="admin">Admin Login</TabsTrigger>
            <TabsTrigger value="consumer">Consumer Login</TabsTrigger>
          </TabsList>
          
          <TabsContent value="admin">
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
                    disabled={isLoading.admin}
                  >
                    {isLoading.admin ? "Logging in..." : "Login as Admin"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
          
          <TabsContent value="consumer">
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
                    disabled={isLoading.consumer}
                  >
                    {isLoading.consumer ? "Logging in..." : "Login as Consumer"}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-md">
          <h3 className="font-semibold text-blue-700">Sample Login Credentials:</h3>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div>
              <p className="text-sm font-medium">Admin:</p>
              <ul className="text-xs text-gray-600">
                <li>ID: ADM001</li>
                <li>First Name: Adwait</li>
                <li>Last Name: Kamble</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium">Consumer:</p>
              <ul className="text-xs text-gray-600">
                <li>ID: CON001</li>
                <li>First Name: CHAUDHARI</li>
                <li>Last Name: MANOJ</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
