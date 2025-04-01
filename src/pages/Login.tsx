
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Admin login state
  const [adminId, setAdminId] = useState("");
  const [adminFirstName, setAdminFirstName] = useState("");
  const [adminLastName, setAdminLastName] = useState("");
  
  // Consumer login state
  const [consumerId, setConsumerId] = useState("");
  const [consumerFirstName, setConsumerFirstName] = useState("");
  const [consumerLastName, setConsumerLastName] = useState("");
  
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would validate against the database
    // For now, we'll simulate successful login with mock data
    if (adminId && adminFirstName && adminLastName) {
      toast({
        title: "Login Successful",
        description: `Welcome back, ${adminFirstName} ${adminLastName}!`,
      });
      navigate("/admin-dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter all required fields",
        variant: "destructive",
      });
    }
  };
  
  const handleConsumerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would validate against the database
    // For now, we'll simulate successful login with mock data
    if (consumerId && consumerFirstName && consumerLastName) {
      toast({
        title: "Login Successful",
        description: `Welcome back, ${consumerFirstName} ${consumerLastName}!`,
      });
      navigate("/consumer-dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Please enter all required fields",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">E-Commerce Portal</h1>
          <p className="text-gray-500">Login to access your account</p>
        </div>
        
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
                  <Button type="submit" className="w-full">Login as Admin</Button>
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
                  <Button type="submit" className="w-full">Login as Consumer</Button>
                </CardFooter>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
