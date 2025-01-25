import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/login.svg";
import background from "../assets/background.svg";
import { account } from "../../appwrite";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear previous error or success messages
    setError("");
    setSuccess("");

    // Validation check
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required!");
      return;
    }

    try {
      const session = await account.createEmailPasswordSession(email, password);
  console.log("Login successful:", session);
  setSuccess("Login successful!");
  navigate("/Home");
    } catch (loginError) {
      console.error("Login Error:", loginError);
      setError(
        loginError.message || "An error occurred while logging in. Please try again."
      );
      setSuccess("");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white p-8 rounded-[8px] shadow-md w-[60%] flex space-x-10">
        <div>
          <img className="" src={loginImage} alt="Login" />
        </div>
        <div className="w-[50%] mt-16">
          <h2 className="text-3xl font-bold text-center bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] bg-clip-text text-transparent font-montserrat">
            LOGIN
          </h2>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <form onSubmit={handleLogin} className="mt-4 space-y-4">
            <div>
              <label className="block text-gray-600 font-inter mb-2">Email</label>
              <input
                type="email"
                placeholder="forexample@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-inter mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300 mb-4"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] text-white py-2 rounded"
            >
              Continue
            </button>
          </form>

          <p className="text-center text-gray-500 mt-4">
            Don't have an account? <Link to="/" className="text-blue-500">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
