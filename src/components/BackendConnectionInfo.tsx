
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function BackendConnectionInfo() {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Backend Connection</AlertTitle>
      <AlertDescription>
        This is currently using mock data. To connect to a real MySQL database, you would need to:
        <ol className="list-decimal ml-5 mt-2">
          <li>Set up a Node.js backend with Express</li>
          <li>Connect to your MySQL database using a library like mysql2</li> 
          <li>Create API endpoints for CRUD operations</li>
          <li>Replace the mock data fetching with API calls</li>
        </ol>
      </AlertDescription>
    </Alert>
  );
}
