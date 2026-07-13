import { useState } from "react";
import { login } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await login({
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/products");
      //  console.log("Login successful:", response);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>Login</button>
    </>
  );
}

export default Login;
