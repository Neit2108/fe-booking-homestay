function SecuritySettings() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-primary mb-4">
        Security Settings
      </h2>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Password</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700">Last changed: 3 months ago</p>
            <p className="text-sm text-gray-500">
              We recommend changing your password regularly for security
              purposes.
            </p>
          </div>
          <button className="px-4 py-2 border border-accent text-accent rounded-md hover:bg-blue-50 transition-colors duration-200">
            Change Password
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-700">
              Status: <span className="text-red-500">Not Enabled</span>
            </p>
            <p className="text-sm text-gray-500">
              Add an extra layer of security to your account by enabling
              two-factor authentication.
            </p>
          </div>
          <button className="px-4 py-2 bg-accent text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
            Enable 2FA
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Login Sessions</h3>
        <div className="border rounded-md p-4 mb-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Current Session</p>
              <p className="text-sm text-gray-500">
                Chrome on Windows • New York, USA
              </p>
              <p className="text-xs text-gray-400">
                Started: Today at 10:23 AM
              </p>
            </div>
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Active
            </span>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">Previous Session</p>
              <p className="text-sm text-gray-500">
                Safari on iPhone • Boston, USA
              </p>
              <p className="text-xs text-gray-400">
                Last active: Yesterday at 6:45 PM
              </p>
            </div>
            <button className="text-red-500 text-sm hover:underline">
              Revoke
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SecuritySettings;
