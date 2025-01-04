import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [focusErrorField, setFocusErrorField] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      if (user) navigate("/"); // Redirect authenticated users to home
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [navigate]);

  const validateForm = () => {
    const errors = {};

    if (!email) {
      errors.email = "Email is required.";
    } else if (!/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i.test(email)) {
      errors.email = "Invalid email address.";
    }

    if (!password) {
      errors.password = "Password is required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      if (validationErrors.email) {
        setFocusErrorField("email");
      } else if (validationErrors.password) {
        setFocusErrorField("password");
      } else if (validationErrors.confirmPassword) {
        setFocusErrorField("confirmPassword");
      }
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await sendEmailVerification(user, {
        url: "http://localhost:5173", // Redirect after verification
      });

      setAlertTitle("Signup Successful!");
      setAlertMessage("A verification email has been sent. Please check your inbox.");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setAlertTitle("Error");
      setAlertMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, provider);
      setAlertTitle("Google Signup Successful!");
      setAlertMessage("You have successfully signed up with Google.");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setAlertTitle("Error");
      setAlertMessage(error.message);
    }
  };

  if (isAuthenticated) {
    return null; 
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-white px-4">
      <div className="w-full max-w-md px-6 py-10 rounded-lg shadow-xl bg-white space-y-8 relative border-y-4 border-[#54ea54]">
        <div
          className="absolute top-5 right-5 cursor-pointer flex justify-center items-center"
          onClick={() => navigate("/")}
        >
          <GoHomeFill className="text-2xl text-[#54ea54]" />
        </div>

        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-4">Create Your Account</h2>
        <p className="text-center text-gray-600 mb-6">
          Create a new account to join us! Use your email or Google account to sign up.
        </p>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-500">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 outline-none ${
                errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-[#54ea54]"
              }`}
              placeholder="Enter your email"
              autoFocus={focusErrorField === "email"}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-500">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 outline-none ${
                errors.password ? "border-red-500 focus:ring-red-500" : "focus:ring-[#54ea54]"
              }`}
              placeholder="Enter your password"
              autoFocus={focusErrorField === "password"}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm text-gray-500">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 outline-none ${
                errors.confirmPassword ? "border-red-500 focus:ring-red-500" : "focus:ring-[#54ea54]"
              }`}
              placeholder="Confirm your password"
              autoFocus={focusErrorField === "confirmPassword"}
            />
            {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#54ea54] text-gray-700 font-semibold rounded-lg hover:bg-green-400 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-4">
          <button
            onClick={handleGoogleSignup}
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

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[#54ea54] font-semibold cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </div>
      </div>

      {alertMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center transform scale-95">
            <div className="text-lg font-semibold text-gray-800 mb-2">{alertTitle}</div>
            <div className="text-sm text-gray-700 mb-4">{alertMessage}</div>
            <button
              onClick={() => setAlertMessage("")}
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

export default Signup;
