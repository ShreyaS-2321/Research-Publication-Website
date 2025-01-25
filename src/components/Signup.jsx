import React, { useState } from "react";
import { Link } from "react-router-dom";
import signup from "../assets/signup.svg";
import background from "../assets/background.svg";
import { auth } from "../firebase"; // Assuming you have initialized Firebase
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // Import new methods

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Helper function for email validation
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Helper function for password validation
  const isValidPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  };

  // Real-time validations
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.length < 3) {
      setNameError("Name must be at least 3 characters long.");
    } else {
      setNameError("");
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!isValidEmail(value)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!isValidPassword(value)) {
      setPasswordError(
        "Password must include at least 8 characters, an uppercase letter, a lowercase letter, a number, and a special character."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // Ensure no validation errors before proceeding
    if (nameError || emailError || passwordError) {
      setError("Please fix the errors above before submitting.");
      setSuccess("");
      return;
    }

    try {
      // Proceed with signup using Firebase Authentication (modular v9 method)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // After successful signup, update the user profile (optional)
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: name,
      });

      setSuccess(
        "Signup successful! Please check your email for verification."
      );
      setError("");
    } catch (error) {
      setError(error.message);
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
        <div className="w-[50%] mt-8">
          <h2 className="text-3xl font-bold text-center bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] bg-clip-text text-transparent font-montserrat">
            SIGN UP
          </h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          <form onSubmit={handleSignup} className="mt-4 space-y-4">
            <div>
              <label className="block text-gray-600 font-inter mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={handleNameChange}
                required
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring ${
                  nameError ? "border-red-500" : "focus:ring-blue-300"
                }`}
              />
              {nameError && <p style={{ color: "red" }}>{nameError}</p>}
            </div>
            <div>
              <label className="block text-gray-600 font-inter mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="forexample@gmail.com"
                value={email}
                onChange={handleEmailChange}
                required
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring ${
                  emailError ? "border-red-500" : "focus:ring-blue-300"
                }`}
              />
              {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            </div>
            <div>
              <label className="block text-gray-600 font-inter mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                required
                className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring ${
                  passwordError ? "border-red-500" : "focus:ring-blue-300"
                }`}
              />
              {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-[linear-gradient(to_right,_rgba(23,_40,_193,_1),_rgba(0,_109,_255,_1))] text-white py-2 rounded"
            >
              Continue
            </button>
          </form>
          <p className="text-center text-gray-500 mt-4">
            Already have an account?{" "}
            <Link to="/Login" className="text-blue-500">
              Login
            </Link>
          </p>
        </div>
        <div>
          <img className="" src={signup} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
