import { useState } from "react";
import { loginApi } from "../api/userApi";
import { useNavigate } from "react-router-dom";

const Login = ({setUser}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    const response = await loginApi({ email, password });

    if (response.user) {
      setUser(response.user);
      navigate("/");
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <h1 className=" text-red-700 text-2xl font-bold mb-6 text-center">
         Sign In to organize your day
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your mail"
          className="border border-gray-300 rounded px-3 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="border border-gray-300 rounded px-3 py-2 mb-6 w-full focus:outline-none focus:ring-2 focus:ring-red-400"
        />

        <button
          className="bg-red-500 text-white w-full py-2 rounded cursor-pointer hover:bg-red-700 transition"
          onClick={handleLogin}
        >
          Sign Up
        </button>
        <p className="text-sm text-gray-600 mt-4 text-center">
          Don’t have an account?{" "}
          <span
            className="text-orange-600 cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
           Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
