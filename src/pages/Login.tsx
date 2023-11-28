import React from "react";
import useLogin from "../hooks/useLogin";

const Login: React.FC = () => {
  const {
    password,
    showPassword,
    error,
    handlePasswordChange,
    togglePasswordVisibility,
    handleSubmit,
  } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-4 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 px-2 py-1"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {error && (
            <div className="text-red-500 text-sm mb-4">
              <p>{error}</p>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
