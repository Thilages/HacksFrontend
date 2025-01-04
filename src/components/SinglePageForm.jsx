import React, { useEffect, useState } from 'react';
import { FaHome, FaInfoCircle } from 'react-icons/fa';
import { problems } from './constants';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const HackathonForm = () => {
  const [formData, setFormData] = useState({
    selectedProblem: '',
    teamName: '',
    teamLeader: '',
    mobileNumber: '',
    secondaryEmail: '',
    secondaryPhone: '',
    teamCount: 1,
    ppt: '',
    video: '',
  });

  const [alertMessage, setAlertMessage] = useState('');
  const [alertTitle, setAlertTitle] = useState('');
  const [IsAuthenticated, setIsAuthenticated] = useState(false)

  const navigate = useNavigate()
  // useEffect(() => {
  //   const auth = getAuth();

  //   onAuthStateChanged(auth, (user) => {
  //     if (user && user.emailVerified && user.email) {
  //       // Set authenticated only if the user details are valid
  //       setIsAuthenticated(false);

  //     } else {
  //       // Invalid user or not logged in
  //       setIsAuthenticated(true);
  //       setAlertMessage("login to continue")
  //       setAlertTitle("Authentication requeired")
  //     }
  //   });
  // }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setAlertTitle('Authentication Required');
      setAlertMessage('Please log in to submit the application.');
      return;
    }

    // Prepare the application data
    const applicationData = {
      problem_statement: formData.selectedProblem,
      team_name: formData.teamName,
      leader_name: formData.teamLeader,
      email1: user.email,
      email2: formData.secondaryEmail,
      phone1: formData.mobileNumber,
      phone2: formData.secondaryPhone,
      team_size: formData.teamCount,
      document_link: formData.ppt,
      video_link: formData.video,
    };

    try {
      const token = await user.getIdToken();
      const response = await fetch('http://127.0.0.1:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();
      console.log(result)
      console.log(response)
      if (response.ok) {
        console.log("works")
        setAlertTitle('Application Submitted');
        setAlertMessage(result.message || 'Your application has been successfully submitted!');
        
      } else {
        console.log("works")

        setAlertTitle('Submission Error');
        setAlertMessage(result.error || 'There was an issue with your submission.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setAlertTitle('Submission Error');
      setAlertMessage('An error occurred. Please try again later.');
    }
  };



  const handleAlert = () => {
    if(alertMessage == "Please log in to submit the application."){
      navigate("/signup")
      setAlertMessage("")
    }
    else{
      setAlertMessage("")
    }


  };

  const navigateHome = () => {
    navigate("/")
  }

  return (
    <>
      {alertMessage ? (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center transform scale-95 z-60">
            <div className="text-lg font-semibold text-gray-800 mb-2">{alertTitle}</div>
            <div className="text-sm text-gray-700 mb-4">{alertMessage}</div>
            <button
              onClick={handleAlert}
              className="w-full py-2 bg-[#54ea54] text-white rounded-md hover:bg-green-400 transition"
            >
              OK
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#181a1b] to-[#0f1011] pb-10 pt-5">
          {/* Home Icon and Link */}
          <div
            className="absolute top-4 left-4 text-white flex items-center cursor-pointer z-50 hover:text-[#54ea54]"
            onClick={navigateHome}
          >
            <FaHome className="text-3xl mr-2" />
            <span className="text-xl">Home</span>
          </div>

          <div className="flex-1 px-4 flex flex-col items-center lg:justify-between relative z-10">
            <div className="text-left md:w-1/2 max-w-2xl py-10 pl-0 sm:pl-10">
              <h1 className="text-4xl-custom text-center font-bold text-white md:text-6xl-custom">
                Apply for Hackathon
              </h1>
              <p className="mt-4 text-md-custom text-center text-gray-400 md:text-xl-custom">
                Please fill in the details to apply for the hackathon.
              </p>

              <form onSubmit={handleSubmit} className="mt-10 bg-[#202325] p-6 rounded-lg shadow-lg space-y-6">
                <div>
                  <label htmlFor="problem" className="block text-md-custom font-medium text-white">
                    Select Problem Statement
                  </label>
                  <select
                    id="problem"
                    name="selectedProblem"
                    value={formData.selectedProblem}
                    onChange={handleChange}
                    required
                    className="w-full p-3 mt-2 text-md-custom rounded-md border border-gray-300 bg-[#181a1b] text-white focus:outline-none focus:ring-2 focus:ring-[#54ea54] focus:border-transparent"
                  >
                    <option value="">Select a problem</option>
                    {problems.map((problem, index) => (
                      <option key={index} value={problem.title}>
                        {problem.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="teamName" className="block text-md-custom font-medium text-white">
                    Team Name
                  </label>
                  <input
                    type="text"
                    id="teamName"
                    name="teamName"
                    value={formData.teamName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 mt-2 text-md-custom rounded-md border border-gray-300 bg-[#181a1b] text-white focus:outline-none focus:ring-2 focus:ring-[#54ea54] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="teamLeader" className="block text-md-custom font-medium text-white">
                    Team Leader’s Name
                  </label>
                  <input
                    type="text"
                    id="teamLeader"
                    name="teamLeader"
                    value={formData.teamLeader}
                    onChange={handleChange}
                    required
                    className="w-full p-3 mt-2 text-md-custom rounded-md border border-gray-300 bg-[#181a1b] text-white focus:outline-none focus:ring-2 focus:ring-[#54ea54] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="mobileNumber" className="block text-md-custom font-medium text-white">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    id="mobileNumber"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    className="w-full p-3 mt-2 text-md-custom rounded-md border border-gray-300 bg-[#181a1b] text-white focus:outline-none focus:ring-2 focus:ring-[#54ea54] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="secondaryEmail" className="block text-md-custom font-medium text-white">
                    Secondary Email
                  </label>
                  <input
                    type="email"
                    id="secondaryEmail"
                    name="secondaryEmail"
                    value={formData.secondaryEmail}
                    onChange={handleChange}
                    required
                    className="w-full p-3 mt-2 text-md-custom rounded-md border border-gray-300 bg-[#181a1b] text-white focus:outline-none focus:ring-2 focus:ring-[#54ea54] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="secondaryPhone" className="block text-md-custom font-medium text-white">
                    Secondary Phone Number
                  </label>
                  <input
                    type="text"
                    id="secondaryPhone"
                    name="secondaryPhone"
                    value={formData.secondaryPhone}
                    onChange={handleChange}
                    required
                    className="w-full p-3 mt-2 text-md-custom rounded-md border border-gray-300 bg-[#181a1b] text-white focus:outline-none focus:ring-2 focus:ring-[#54ea54] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="teamCount" className="block text-md-custom font-medium text-white">
                    Number of Team Members (Max 5)
                  </label>
                  <input
                    type="number"
                    id="teamCount"
                    name="teamCount"
                    value={formData.teamCount}
                    onChange={handleChange}
                    min={1}
                    max={5}
                    required
                    className="w-full p-3 mt-2 text-md-custom rounded-md border border-gray-300 bg-[#181a1b] text-white focus:outline-none focus:ring-2 focus:ring-[#54ea54] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="ppt" className="block text-md-custom font-medium text-white">
                    PPT Link
                  </label>
                  <input
                    type="url"
                    id="ppt"
                    name="ppt"
                    value={formData.ppt}
                    onChange={handleChange}
                    required
                    className="w-full p-3 mt-2 text-md-custom rounded-md border border-gray-300 bg-[#181a1b] text-white focus:outline-none focus:ring-2 focus:ring-[#54ea54] focus:border-transparent"
                  />
                  <div className="text-gray-400 mt-2 flex items-center">
                    <FaInfoCircle className="mr-2" />
                    <span className="text-sm">
                      The PPT should be uploaded to a file-sharing service (e.g., Google Drive) and the link should be provided here.
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="video" className="block text-md-custom font-medium text-white">
                    Video Link
                  </label>
                  <input
                    type="url"
                    id="video"
                    name="video"
                    value={formData.video}
                    onChange={handleChange}
                    required
                    className="w-full p-3 mt-2 text-md-custom rounded-md border border-gray-300 bg-[#181a1b] text-white focus:outline-none focus:ring-2 focus:ring-[#54ea54] focus:border-transparent"
                  />
                  <div className="text-gray-400 mt-2 flex items-center">
                    <FaInfoCircle className="mr-2" />
                    <span className="text-sm">
                      The video should be uploaded to YouTube and the link should be provided here.
                    </span>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    className="px-6 py-3 text-md-custom text-[#181a1b] bg-[#54ea54] rounded-full hover:bg-[#43c943] transition"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HackathonForm;
