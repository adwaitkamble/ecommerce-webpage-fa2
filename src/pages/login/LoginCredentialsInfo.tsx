
export const LoginCredentialsInfo = () => {
  return (
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
  );
};
