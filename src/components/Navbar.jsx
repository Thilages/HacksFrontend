import { useState, useEffect } from "react";
import { Link } from "react-scroll"; // For smooth scrolling navigation
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Firebase Auth

const Navbar = () => {
  const [user, setUser] = useState(null); // User state
  const [isLogoutPressed, setIsLogoutPressed] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false); // Tooltip for email display
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Set logged-in user
      } else {
        setUser(null); // Reset user state if logged out
      }
    });
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setUser(null); // Clear user state
        setIsLogoutPressed(false); // Close modal
         // Redirect to login page (optional)
      })
      .catch((error) => {
        console.error("Error logging out:", error.message); // Handle errors
      });
  };

  return (
    <nav className="bg-white shadow-md z-50 fixed w-full">
      <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8">
        <div className="flex px-2 justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="home"
              smooth={true}
              duration={500}
              offset={-70}
              className="text-2xl font-bold text-[#181a1b] cursor-pointer"
            >
              Hackathon
            </Link>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="problems"
              smooth={true}
              duration={500}
              offset={-70}
              className="text-gray-600 hover:text-[#54ea54] cursor-pointer"
            >
              Problems
            </Link>
            <Link
              to="timeline"
              smooth={true}
              duration={500}
              offset={-70}
              className="text-gray-600 hover:text-[#54ea54] cursor-pointer"
            >
              Timeline
            </Link>
            <Link
              to="about-us"
              smooth={true}
              duration={500}
              offset={-70}
              className="text-gray-600 hover:text-[#54ea54] cursor-pointer"
            >
              About Us
            </Link>
          </div>

          {/* User Info and Logout */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative flex items-center">
                {/* Logout Button */}
                <button
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
                  onClick={() => setIsLogoutPressed(true)}
                  className="underline text-red-500 text-sm"
                >
                  Logout
                </button>

                {/* Tooltip */}
                {showTooltip && (
                  <div className="absolute top-8 right-0 bg-gray-700 text-white text-xs rounded-md px-2 py-1 shadow-lg">
                    {user.email}
                  </div>
                )}

                {/* Logout Confirmation Modal */}
                {isLogoutPressed && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white max-w-sm p-6 rounded-md shadow-lg">
                      <h2 className="text-lg font-semibold text-gray-700">Confirm Logout</h2>
                      <p className="text-sm text-gray-500 mt-2">
                        Are you sure you want to log out from{" "}
                        <span className="font-bold">{user.email}</span>?
                      </p>
                      <div className="mt-4 flex justify-between space-x-4">
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                          Yes, Logout
                        </button>
                        <button
                          onClick={() => setIsLogoutPressed(false)}
                          className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/signup")}
                className="px-3 py-2 sm:px-5 sm:py-3 bg-[#54ea54] text-[#181a1b] rounded-3xl text-sm font-medium hover:bg-green-300"
              >
                Sign Up / Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
