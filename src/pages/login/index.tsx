
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { AdminLoginForm } from "./AdminLoginForm";
import { ConsumerLoginForm } from "./ConsumerLoginForm";
import { LoginCredentialsInfo } from "./LoginCredentialsInfo";
import { ThemeToggle } from "@/components/ThemeToggle";

const Login = () => {
  const [error, setError] = useState<string | null>(null);
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background to-secondary/20 dark:from-background dark:to-secondary/10 transition-colors duration-300">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="m-auto w-full max-w-md p-6">
        <div className="relative">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/20 via-primary/30 to-secondary/20 blur-sm"></div>
          <div className="relative bg-card shadow-xl rounded-lg border border-border/40">
            <div className="text-center pt-8 pb-4 px-6">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <div className="rounded-full bg-background p-3 shadow-md border border-border/40">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/80 to-secondary flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-foreground">EC</span>
                  </div>
                </div>
              </div>
              <h1 className="text-3xl font-bold mt-6 text-foreground">E-Commerce Portal</h1>
              <p className="text-muted-foreground mt-2">Login to access your account</p>
            </div>
            
            {error && (
              <Alert variant="destructive" className="mx-6 mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            <Tabs defaultValue="admin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 rounded-none border-b border-border/40">
                <TabsTrigger value="admin" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Admin Login</TabsTrigger>
                <TabsTrigger value="consumer" className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Consumer Login</TabsTrigger>
              </TabsList>
              
              <div className="p-6 pt-4">
                <TabsContent value="admin">
                  <AdminLoginForm setError={setError} />
                </TabsContent>
                
                <TabsContent value="consumer">
                  <ConsumerLoginForm setError={setError} />
                </TabsContent>
              </div>
            </Tabs>
            
            <div className="px-6 pb-6">
              <LoginCredentialsInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
