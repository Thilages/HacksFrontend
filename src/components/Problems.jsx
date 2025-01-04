import React, { useState, useEffect } from 'react';
import { problems } from './constants'; // Import the problems array
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase authentication
import axios from 'axios'; // For making API requests
import { useNavigate } from 'react-router-dom';

const Problems = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null); // To store the selected problem
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertTitle, setAlertTitle] = useState(""); // Firebase auth status
  const navigate = useNavigate()

  
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
  }, []);

  const handleToggleShow = () => {
    setShowAll((prev) => !prev); 
  };

  const getFirebaseToken = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser; 
      if (user) {
        
        const token = await user.getIdToken();
        return token;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting Firebase token:", error);
      return null;
    }
  };

  const handleLearnMore = async (problem) => {
    if (isAuthenticated) {
      try {
        
        const token = await getFirebaseToken(); 
  
        if (token) {
          console.log(problem.title);
          
          
          const response = await axios.get(`http://127.0.0.1:5000/problems/${problem.title}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
  
          const problemWithFullDetails = response.data;
  
          
          if (Array.isArray(problemWithFullDetails.expectedStack)) {
            setSelectedProblem(problemWithFullDetails);
          } else {
            setSelectedProblem({
              ...problemWithFullDetails,
              expectedStack: [],
            });
          }
  
          
          document.body.style.overflow = 'hidden';
        } else {
          console.log("No token available, user might not be authenticated");
        }
      } catch (error) {
        console.error("Error fetching problem details:", error);
        setAlertMessage("Failed to load problem details.");
        setAlertTitle("Error");
      }
    } else {
      setAlertMessage("Please Authenticate to Continue");
      setAlertTitle("Authentication Error");
    }
  };
  

  const closeFullScreenView = () => {
    setSelectedProblem(null);
    document.body.style.overflow = 'auto';
  };

  const handleAuthenticationAlert = () => {
    setAlertMessage("");
    window.location.href = "/signup";
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-16 px-6 sm:px-10">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-[#2d3748] w-full">Problem Statements</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-0 sm:px-6 md:px-10 lg:px-24">
        {problems.slice(0, showAll ? problems.length : 3).map((problem, index) => (
          <div key={index} className="bg-white p-4 relative rounded-lg text-left shadow-lg hover:shadow-2xl transition duration-300">
            {/* "Learn More" button with subtle animation */}
            <div
              className="absolute left-6 top-8 z-50 bg-white p-2 rounded-3xl shadow-md text-sm text-gray-700 cursor-pointer 
                        duration-300 hover:scale-105 hover:bg-gray-300 hover:shadow-xl"
              onClick={() => handleLearnMore(problem)}
            >
              Learn More
            </div>

            <div className="w-full h-56 sm:h-64 lg:h-80 mb-2 flex justify-center items-center">
              <img
                src={problem.img}
                alt="Problem illustration"
                className="object-cover w-full h-full rounded-3xl"
              />
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-[#2d3748] mb-2">{problem.title}</h3>
            <p className="text-sm text-[#4a5568] w-full sm:w-80 mb-4">{problem.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={handleToggleShow}
          className="bg-[#54ea54] text-white px-6 py-2 rounded-full hover:bg-[#43c943] transition duration-300"
        >
          {showAll ? 'Show Less' : 'Reveal All'}
        </button>
      </div>

      {/* Full-screen View for the Selected Problem */}
      {selectedProblem && (
        <div className="fixed inset-0  bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 overflow-auto backdrop-blur-md">
          <div className="bg-white relative p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/3 xl:w-1/2 max-h-screen overflow-y-auto">
            <button
              onClick={closeFullScreenView}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-3xl font-bold text-[#2d3748] mb-4">{selectedProblem.title}</h2>

            {/* Scenario Section */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-[#2d3748]">Scenario</h3>
              <p className="text-sm text-[#4a5568]">{selectedProblem.scenario}</p>
            </div>

            {/* Problem Statement Section */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-[#2d3748]">Problem Statement:</h3>
              <p className="text-sm text-[#4a5568]">{selectedProblem.details}</p>
            </div>

            {/* Expected Stack Section */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-[#2d3748]">Expected Stack:</h3>
              <ul className="list-disc ml-5 text-sm text-[#4a5568]">
                {selectedProblem.expectedStack.map((stack, index) => (
                  <li key={index}>{stack}</li>
                ))}
              </ul>
            </div>

            {/* Download PDF Button */}
            <div className="flex gap-3">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                onClick={() => window.open(selectedProblem.pdfUrl, '_blank')}
              >
                Download PDF
              </button>

              {/* Apply Now Button */}
              <button
                className="bg-[#54ea54] text-white px-4 py-2 rounded-lg hover:bg-[#43c943] transition duration-300"
                onClick={() => navigate("/applynow")}
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      )}

      {alertMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center transform scale-95 z-60">
            <div className="text-lg font-semibold text-gray-800 mb-2">{alertTitle}</div>
            <div className="text-sm text-gray-700 mb-4">{alertMessage}</div>
            <button
              onClick={handleAuthenticationAlert}
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

export default Problems;
