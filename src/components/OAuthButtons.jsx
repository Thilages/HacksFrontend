import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../firebase";

const OAuthButtons = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User Info:", result.user);
    } catch (error) {
      console.error("Google Login Error:", error.message);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      console.log("User Info:", result.user);
    } catch (error) {
      console.error("GitHub Login Error:", error.message);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleGoogleLogin}
        className="p-2 bg-blue-500 text-white rounded-md"
      >
        Sign in with Google
      </button>
      <button
        onClick={handleGitHubLogin}
        className="p-2 bg-gray-800 text-white rounded-md"
      >
        Sign in with GitHub
      </button>
    </div>
  );
};

export default OAuthButtons;
