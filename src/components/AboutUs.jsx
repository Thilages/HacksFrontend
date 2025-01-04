import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#181a1b] to-[#0f1011] text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-10">About Us</h1>
        <div className="space-y-8">
          <section className="bg-[#202325] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
            <p className="text-gray-400 text-md leading-relaxed">
              Welcome to <span className="text-[#54ea54] font-medium">Placeholder</span>, a platform where innovation meets collaboration. We bring together passionate individuals who are eager to solve problems, build innovative solutions, and create a lasting impact in the tech community.
            </p>
          </section>
          <section className="bg-[#202325] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-400 text-md leading-relaxed">
              Our mission is to inspire and empower participants to unleash their creativity, tackle real-world challenges, and build transformative solutions. We aim to create a vibrant ecosystem where ideas thrive and collaboration knows no bounds.
            </p>
          </section>
          <section className="bg-[#202325] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
            <p className="text-gray-400 text-md leading-relaxed">
              Through <span className="text-[#54ea54] font-medium">Placeholder</span>, we provide participants with:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2">
              <li className="text-gray-400 text-md">
                <span className='font-semibold text-[#ffffff]'> Opportunities</span> to collaborate with diverse teams and industry mentors.
              </li>
              <li className="text-gray-400 text-md">
                <span className='font-semibold text-[#ffffff]'> Resources</span> to upskill through workshops, webinars, and hands-on learning.
              </li>
              <li className="text-gray-400 text-md">
                <span className='font-semibold text-[#ffffff]'> Platforms</span> to present innovative projects to a panel of experts.
              </li>
            </ul>
          </section>
          <section className="bg-[#202325] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Why Join Us?</h2>
            <p className="text-gray-400 text-md leading-relaxed">
              Whether you're a beginner or a seasoned coder, <span className="text-[#54ea54] font-medium">Placeholder</span> offers a unique opportunity to grow, connect, and innovate. Be a part of a dynamic community that’s shaping the future, one idea at a time.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
