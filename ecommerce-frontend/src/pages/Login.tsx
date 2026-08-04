import { useState } from "react";
import { login as loginUser } from "../services/auth.service";

import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        email,
        password,
      });

      login(response.data.user, response.data.token);

      console.log("Login successful:", response);

      navigate("/products");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />

      <div className="flex justify-center items-center py-20 px-6">
        <div className="w-full max-w-md bg-slate-800 rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center">Welcome Back</h1>

          <p className="text-slate-400 text-center mt-2">
            Login to your account
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block mb-2 text-sm font-medium">Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-slate-700 border border-slate-600 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-slate-700 border border-slate-600 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
