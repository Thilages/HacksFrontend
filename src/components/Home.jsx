import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Problems from './Problems';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Timeline from './Timeline';
import AboutUs from './AboutUs';
// import ContactUs from './ContactUs';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [IsAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const auth = getAuth();
    
    onAuthStateChanged(auth, (user) => {
      console.log(user)
      console.log(IsAuthenticated)
      setIsAuthenticated(!!user);
    });
  }, []);

  const navigate = useNavigate()

  const handleApplication = () => {
    if (IsAuthenticated) {
      navigate("/applynow")
    }
    else {
      navigate("/signup")
    }
  }

  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#181a1b] to-[#0f1011] relative overflow-hidden pb-10">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-[#54ea54] opacity-20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#54ea54] opacity-10 blur-2xl rounded-full"></div>

        <Navbar />
        <div className="flex-1 px-4 max-sm:py-10 flex flex-col md:flex-row items-center lg:justify-between relative z-10">
          {/* Hero Section */}
          <div className="text-left md:w-1/2 max-w-2xl py-10 pl-0 sm:pl-10 ">
            <h1 className="text-4xl-custom font-bold text-white md:text-6xl-custom ">
              Welcome to <span className="text-white">Hackathon Central</span>
            </h1>
            <p className="mt-4 text-md-custom text-gray-400 md:text-xl-custom">
              Join us to innovate, create, and transform ideas into reality. Let’s build the future together.
            </p>
            <div className="mt-6 flex items-center space-x-8">
              <button onClick={handleApplication} className="px-6 py-3 text-md-custom font-medium flex items-center text-[#181a1b] bg-[#54ea54] rounded-full hover:bg-[#43c943] transition">
                Apply Now <FaArrowRight className="ml-2" />
              </button>
              <button className="flex items-center text-md-custom text-white hover:underline">
                More
              </button>
            </div>
            <div className="mt-10 flex gap-6">
              <div className="">
                <h3 className="text-2xl-custom font-semibold text-white">$10,000</h3>
                <p className="mt-2 text-sm-custom text-gray-400">Prize Money</p>
              </div>
              <div className="">
                <h3 className="text-2xl-custom font-semibold text-white">48 Hours</h3>
                <p className="mt-2 text-sm-custom text-gray-400">Non-stop Coding</p>
              </div>
            </div>
          </div>

          {/* Highlights Section */}
          <div className="grid sm:grid-cols-2 gap-6 md:w-1/2 mt-10 md:mt-0 w-full justify-center">
            <div className="p-6 bg-[#202325] max-w-md rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform">
              <h3 className="text-lg-custom font-semibold text-[#54ea54]">Collaborate</h3>
              <p className="mt-2 text-sm-custom text-gray-400">
                Connect with peers and mentors to bring your ideas to life.
              </p>
            </div>
            <div className="p-6 bg-[#202325] max-w-md rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform">
              <h3 className="text-lg-custom font-semibold text-[#54ea54]">Innovate</h3>
              <p className="mt-2 text-sm-custom text-gray-400">
                Leverage cutting-edge technologies to solve real-world problems.
              </p>
            </div>
            <div className="p-6 bg-[#202325] max-w-md rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform">
              <h3 className="text-lg-custom font-semibold text-[#54ea54]">Compete</h3>
              <p className="mt-2 text-sm-custom text-gray-400">
                Showcase your skills and compete for exciting prizes.
              </p>
            </div>
            <div className="p-6 bg-[#202325] max-w-md rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform">
              <h3 className="text-lg-custom font-semibold text-[#54ea54]">Learn</h3>
              <p className="mt-2 text-sm-custom text-gray-400">
                Gain knowledge from experts through workshops and sessions.
              </p>
            </div>
          </div>
        </div>



      </div>

      <div id="problems">
        <Problems />
      </div>
      <div id="timeline">
        <Timeline />
      </div>
      <div id="about-us">
        <AboutUs />
      </div>
      <div id='footer'>
        <Footer />
      </div>

    </div>
  );
};

export default Home;
