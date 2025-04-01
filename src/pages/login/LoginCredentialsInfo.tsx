
export const LoginCredentialsInfo = () => {
  return (
    <div className="mt-4 p-4 bg-secondary/40 dark:bg-secondary/20 border border-border/40 rounded-md transition-colors duration-300">
      <h3 className="font-semibold text-primary">Sample Login Credentials:</h3>
      <div className="mt-2 grid grid-cols-2 gap-4">
        <div className="bg-card/60 p-3 rounded-md shadow-sm border border-border/20">
          <p className="text-sm font-medium flex items-center space-x-2 mb-1">
            <span className="size-2 rounded-full bg-blue-500"></span>
            <span>Admin</span>
          </p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>ID: ADM001</li>
            <li>First Name: Adwait</li>
            <li>Last Name: Kamble</li>
          </ul>
        </div>
        <div className="bg-card/60 p-3 rounded-md shadow-sm border border-border/20">
          <p className="text-sm font-medium flex items-center space-x-2 mb-1">
            <span className="size-2 rounded-full bg-green-500"></span>
            <span>Consumer</span>
          </p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>ID: CON001</li>
            <li>First Name: CHAUDHARI</li>
            <li>Last Name: MANOJ</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
