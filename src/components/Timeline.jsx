import React from 'react';

const Timeline = () => {
  const events = [
    {
      date: "January 10, 2024",
      time: "12:00 PM IST",
      title: "Registrations Open",
      description: "Start building your team and register for the event.",
      icon: "📝",
      details: "Registrations are open to all participants. Early registration gives you a chance for special perks.",
    },
    {
      date: "January 20, 2024",
      time: "11:59 PM IST",
      title: "Idea Submission Deadline",
      description: "Submit your innovative ideas for the hackathon.",
      icon: "💡",
      details: "Provide a detailed description of your idea, including potential challenges and solutions.",
    },
    {
      date: "January 25, 2024",
      time: "6:00 PM IST",
      title: "Shortlisting Announcement",
      description: "Selected teams will be announced for the main event.",
      icon: "📢",
      details: "Check your registered email for the shortlisting results and further instructions.",
    },
    {
      date: "February 5, 2024",
      time: "10:00 AM IST",
      title: "Hackathon Kickoff",
      description: "Start coding and bring your ideas to life!",
      icon: "🚀",
      details: "Access to mentor sessions and a dedicated communication channel will be provided.",
    },
    {
      date: "February 7, 2024",
      time: "3:00 PM IST",
      title: "Final Presentation",
      description: "Showcase your project to the judges and audience.",
      icon: "🎤",
      details: "Present your project within the 10-minute slot assigned to your team.",
    },
    {
      date: "February 8, 2024",
      time: "5:00 PM IST",
      title: "Winner Announcement",
      description: "Celebrate the champions of the hackathon!",
      icon: "🏆",
      details: "Join us for the award ceremony and a networking session with industry leaders.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#181a1b] to-[#0f1011] text-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">Event Timeline</h1>
        <div className="relative border-l border-gray-600">
          {events.map((event, index) => (
            <div key={index} className="mb-14 ml-6">
              <div className="absolute -left-4 w-8 h-8 flex items-center justify-center bg-[#54ea54] rounded-full border-2 border-white text-xl">

              </div>
              <div className="bg-[#202325] p-6 rounded-lg shadow-lg">
                <div className="flex justify-between items-center">
                  <p className="text-md text-[#54ea54] font-medium">{event.date}</p>
                  <p className="text-sm text-gray-400">{event.time}</p>
                </div>
                <h2 className="text-xl font-semibold mt-2">{event.title}</h2>
                <p className="text-gray-400 mt-2">{event.description}</p>
                <p className="text-gray-500 mt-2 italic">{event.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
