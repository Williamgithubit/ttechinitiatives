import React from "react";
import HeroSection from "../components/shared/HeroSection";
import StatsSection from "../components/shared/StatsSection";
import Card from "../components/ui/Card";
import TestimonialCard from "../components/ui/TestimonialCard";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaLaptopHouse,
  FaChartLine,
  FaCalendarAlt,
  FaUserGraduate,
  FaMicrosoft
} from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";

const Home = () => {
  const programs = [
    {
      id: 1,
      title: "Digital Literacy Program",
      description:
        "Foundational computer skills for beginners including typing, internet usage, and basic software applications.",
      duration: "8 weeks",
      level: "Beginner",
      icon: <FaLaptopHouse className="text-4xl mb-4 text-[#000054]" />,
      image:
        " https://placehold.co/300x200/3b82f6/ffffff?text=Digital+Literacy",
    },
    {
      id: 2,
      title: "Web Development Bootcamp",
      description:
        "Comprehensive training in HTML, CSS, JavaScript, and modern web frameworks for aspiring developers.",
      duration: "12 weeks",
      level: "Intermediate",
      icon: <FaLaptopCode className="text-4xl mb-4 text-[#000054]" />,
      image: " https://placehold.co/300x200/8b5cf6/ffffff?text=Web+Dev",
    },
    {
      id: 3,
      title: "Graphic Design Essentials",
      description:
        "Learn the fundamentals of graphic design, including color theory, typography, layout, and visual communication using modern tools and techniques.",
      duration: "10 weeks",
      level: "Intermediate",
      icon: <FaMobileAlt className="text-4xl mb-4 text-[#000054]" />,
      image: " https://placehold.co/300x200/06b6d4/ffffff?text=Mobile+Apps",
    },
    {
      id: 3,
      title: "Microsoft Office Suite",
      description:
        "Master essential Microsoft Office tools like Word, Excel, and PowerPoint. Gain efficiency in document creation, data analysis, and presentations.",
      duration: "10 weeks",
      level: "Beginner",
      icon: <FaMicrosoft className="text-4xl mb-4 text-[#000054]" />,
      image: " https://placehold.co/300x200/06b6d4/ffffff?text=Mobile+Apps",
    }
  ];

  const testimonials = [
    {
      name: "Mary Johnson",
      role: "Student",
      content:
        "TTI changed my life. I went from never touching a computer to building my own website in just 3 months.",
      image: " https://placehold.co/80x80/f59e0b/ffffff?text=MJ",
      icon: <FaUserGraduate className="text-2xl text-[#E32845]" />,
    },
    {
      name: "James Kollie",
      role: "Web Developer",
      content:
        "The web development program gave me the skills I needed to start my own freelance business. Highly recommended!",
      image: " https://placehold.co/80x80/3b82f6/ffffff?text=JK",
      icon: <FaLaptopCode className="text-2xl text-[#E32845]" />,
    },
    {
      name: "Patricia Doe",
      role: "Mobile Developer",
      content:
        "The instructors are knowledgeable and supportive. I got my first developer job after completing the mobile app course.",
      image: " https://placehold.co/80x80/10b981/ffffff?text=PD",
      icon: <FaMobileAlt className="text-2xl text-[#E32845]" />,
    },
  ];

  return (
    <>
      <HeroSection />
      <StatsSection />

      {/* Featured Programs */}
      <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#000054] mb-3 sm:mb-4">
              Featured Programs
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive curriculum prepares students for careers in
              technology with practical, hands-on learning.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {programs.map((program) => (
              <Card
                key={program.id}
                className="h-full flex flex-col w-full hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-gray-100 p-4 sm:p-6 flex justify-center">
                  {React.cloneElement(program.icon, {
                    className: `${program.icon.props.className} w-12 h-12 sm:w-14 sm:h-14`
                  })}
                </div>
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#000054] mb-2 sm:mb-3">
                    {program.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 flex-1">
                    {program.description}
                  </p>
                  <div className="flex justify-between items-center text-xs sm:text-sm text-gray-600 mt-auto pt-2">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-1 sm:mr-2 text-[#E32845]" />
                      <span>{program.duration}</span>
                    </div>
                    <span className="bg-[#E32845] text-white px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                      {program.level}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-[#f8f9fa] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#000054] mb-3 sm:mb-4">
              Success Stories
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Hear from our students and volunteers
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard 
                key={testimonial.name} 
                {...testimonial} 
                className="h-full"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
