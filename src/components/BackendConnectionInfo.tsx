
import { AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";

export function BackendConnectionInfo() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkBackendConnection = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await axios.get('http://localhost:5000/api/test');
      setIsConnected(true);
    } catch (err) {
      setIsConnected(false);
      setError("Could not connect to backend server. Make sure it's running on port 5000.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkBackendConnection();
  }, []);

  return (
    <>
      {isConnected ? (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <AlertTitle>Backend Connected</AlertTitle>
          <AlertDescription>
            Successfully connected to the backend server. The application is now using the MySQL database.
          </AlertDescription>
        </Alert>
      ) : (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Backend Connection</AlertTitle>
          <AlertDescription>
            {error ? (
              <div>
                <p className="mb-2 text-orange-700">{error}</p>
                <ol className="list-decimal ml-5 mt-2 text-gray-700">
                  <li>Make sure you've set up the Node.js backend</li>
                  <li>Check that MySQL is running and configured correctly</li>
                  <li>Verify that the database 'ecommerce_db' exists</li>
                  <li>Ensure the backend server is running on port 5000</li>
                </ol>
                <Button 
                  onClick={checkBackendConnection} 
                  variant="outline" 
                  className="mt-2" 
                  disabled={isLoading}
                >
                  {isLoading ? "Checking..." : "Try Again"}
                </Button>
              </div>
            ) : (
              <p>Checking backend connection...</p>
            )}
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}

export default BackendConnectionInfo;
