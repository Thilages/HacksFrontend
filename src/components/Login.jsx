import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState(""); 
  const [loading, setLoading] = useState(false);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/"); // Redirect authenticated users to home
      }
    });
    return () => unsubscribe(); // Clean up listener on unmount
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setPasswordError("Password is required.");
      return;
    }

    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAlertTitle("Login Successful");
      setAlertMessage("You have logged in successfully.");
      setTimeout(() => {
        navigate("/"); // Redirect to home after successful login
      }, 1500);
    } catch (error) {
      setAlertTitle("Error");
      setAlertMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      setAlertTitle("Login Successful");
      setAlertMessage("You have logged in with Google.");
      setTimeout(() => {
        navigate("/"); // Redirect to home after successful Google login
      }, 1500);
    } catch (error) {
      setAlertTitle("Error");
      setAlertMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setEmailError("Please enter your email to reset your password.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setAlertTitle("Password Reset");
      setAlertMessage("Password reset email sent! Please check your inbox.");
    } catch (error) {
      setAlertTitle("Error");
      setAlertMessage("Error sending password reset email.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-600 to-white px-4">
      <div className="relative flex flex-col items-center justify-center bg-white shadow-xl rounded-lg w-full max-w-md py-10 px-6 mt-4 space-y-8 border-y-4 border-[#54ea54]">
        <div
          className="absolute top-5 left-5 cursor-pointer flex justify-center items-center"
          onClick={() => navigate("/")}
        >
          <GoHomeFill className="text-2xl text-[#54ea54]" />
        </div>
        <h2 className="text-3xl font-semibold text-gray-700 mb-4">Welcome Back!</h2>
        <p className="text-center text-gray-600 mb-6">
          Welcome back! Please log in with your credentials or use your Google account to sign in.
        </p>

        <form onSubmit={handleLogin} className="space-y-4 w-full">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-500">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border  rounded-lg  focus:ring-2 outline-none ${emailError ? "border-red-500 focus:ring-red-500" : "focus:ring-[#54ea54]"}`}
              placeholder="Enter your email"
            />
            {emailError && <p className="text-sm text-red-500 mt-1">{emailError}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-500">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 outline-none  ${passwordError ? "border-red-500 focus:ring-red-500" : "focus:ring-[#54ea54]"}`}
              placeholder="Enter your password"
            />
            {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 bg-[#54ea54] text-gray-700 font-semibold rounded-lg hover:bg-green-400 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Log In
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-2 text-center">
          <p
            onClick={handleForgotPassword}
            className="text-sm text-[#54ea54] font-semibold cursor-pointer hover:underline"
          >
            Forgot Password?
          </p>
        </div>

        {/* Google Login Button */}
        <div className="mt-4 w-full">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 border border-green-300 text-gray-700 rounded-lg hover:bg-green-200 transition flex items-center justify-center space-x-4"
          >
            <img
              src="https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png"
              alt="Google Logo"
              className="h-6 w-6"
            />
            <span>Continue with Google</span>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#54ea54] font-semibold cursor-pointer hover:underline"
            >
              Sign up here
            </span>
          </p>
        </div>
      </div>

      {/* Alert Popup */}
      {alertMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center transform scale-95 z-60">
            <div className="text-lg font-semibold text-gray-800 mb-2">{alertTitle}</div>
            <div className="text-sm text-gray-700 mb-4">{alertMessage}</div>
            <button
              onClick={() => setAlertMessage('')}
              className="w-full py-2 bg-[#54ea54] text-white rounded-md hover:bg-green-400 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
