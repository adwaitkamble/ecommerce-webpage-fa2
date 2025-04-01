
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { AdminLoginForm } from "./AdminLoginForm";
import { ConsumerLoginForm } from "./ConsumerLoginForm";
import { LoginCredentialsInfo } from "./LoginCredentialsInfo";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  
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
            <AdminLoginForm setError={setError} />
          </TabsContent>
          
          <TabsContent value="consumer">
            <ConsumerLoginForm setError={setError} />
          </TabsContent>
        </Tabs>
        
        <LoginCredentialsInfo />
      </div>
    </div>
  );
};

export default Login;
