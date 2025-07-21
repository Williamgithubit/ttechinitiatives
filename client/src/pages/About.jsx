import React from 'react';
import Card from '../components/ui/Card';
import teamImage from '../assets/group-african-kids-classroom.jpg';
import { FaBullseye, FaHandsHelping, FaLightbulb, FaGlobeAfrica, FaUserGraduate, FaChalkboardTeacher, FaLaptopCode, FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { GiGraduateCap, GiTeacher } from 'react-icons/gi';
import { MdDateRange, MdLocationOn, MdEmail } from 'react-icons/md';
import { motion } from 'framer-motion';
import ceo from "../assets/ceo.jpg";


const About = () => {
  const values = [
    { 
      icon: <FaBullseye className="mx-auto text-4xl text-[#000054] mb-4" />, 
      title: 'Excellence', 
      description: 'We strive for the highest quality in education and service delivery.' 
    },
    { 
      icon: <FaHandsHelping className="mx-auto text-4xl text-[#000054] mb-4" />, 
      title: 'Community', 
      description: 'We build strong relationships with learners and partners.' 
    },
    { 
      icon: <FaLightbulb className="mx-auto text-4xl text-[#000054] mb-4" />, 
      title: 'Innovation', 
      description: 'We embrace creative solutions to educational challenges.' 
    },
    { 
      icon: <FaGlobeAfrica className="mx-auto text-4xl text-[#000054] mb-4" />, 
      title: 'Accessibility', 
      description: 'We ensure education reaches those who need it most.' 
    }
  ];

  const impactStats = [
    { 
      number: '500+', 
      label: 'Students Trained', 
      description: 'Across various technology programs',
      icon: <FaUserGraduate className="text-5xl text-[#E32845] mb-4 mx-auto" />
    },
    { 
      number: '25+', 
      label: 'Volunteers', 
      description: 'Dedicated tech professionals teaching',
      icon: <GiTeacher className="text-5xl text-[#E32845] mb-4 mx-auto" />
    },
    { 
      number: '12', 
      label: 'Programs', 
      description: 'Covering diverse technology fields',
      icon: <FaLaptopCode className="text-5xl text-[#E32845] mb-4 mx-auto" />
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-4xl font-bold text-[#000054] mb-6">About T-Tech Initiatives</h1>
            <p className="text-lg text-gray-700 mb-6">
        
              <p className="mb-6">
                Founded July 4, 2025 by a group of passionate young technologists name William T. Johnson Jr, T-Tech Initiatives is dedicated to 
                providing free digital education to underserved communities across Liberia. We believe that access to 
                technology education should not be limited by socioeconomic status.
              </p>
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Our mission is to bridge the digital divide by equipping Liberian youth with the skills they need to 
              succeed in the modern workforce and contribute to the country's technological advancement.
              
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:border-[#E32845] transition-colors duration-300">
                <div className="flex items-center justify-center text-[#E32845] mb-2">
                  <MdDateRange className="text-3xl mr-2" />
                  <span className="text-3xl font-bold text-[#000054]">2025</span>
                </div>
                <div className="text-gray-600 text-center">Founded</div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:border-[#E32845] transition-colors duration-300">
                <div className="flex items-center justify-center text-[#E32845] mb-2">
                  <MdLocationOn className="text-3xl mr-2" />
                  <span className="text-3xl font-bold text-[#000054]">8</span>
                </div>
                <div className="text-gray-600 text-center">Locations</div>
              </div>
            </div>
          </div>
          <div>
            <img
              src={teamImage}
              alt="T-Tech Initiatives team working with students"
              className="rounded-lg shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>

 {/* Founder/CEO Section */}
        <div className="mt-24 mb-16">
          <div className="bg-gradient-to-r from-[#000054] to-[#1e1e8f] rounded-2xl p-10 text-white overflow-hidden relative">
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Message From Our Founder</h2>
                <div className="w-20 h-1 bg-[#E32845] mx-auto mb-6"></div>
                <p className="text-blue-100 max-w-3xl mx-auto">
                  Leading the charge in transforming technology education in Liberia
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3 flex justify-center">
                  <div className="relative">
                    <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/20">
                      <img 
                        src={ceo} 
                        alt="William T. Johnson Jr, Founder & CEO"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-[#000054] px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                      Founder & CEO
                    </div>
                  </div>
                </div>
                
                <div className="w-full md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4">William T. Johnson Jr</h3>
                  <p className="text-blue-100 mb-6 leading-relaxed">
                    "Our vision at T-Tech Initiatives is to create a future where every young Liberian has access to quality technology education, 
                    regardless of their background or circumstances. We believe that by equipping our youth with digital skills, we're not just 
                    changing individual lives, but we're building the foundation for Liberia's technological future."
                  </p>
                  <p className="text-blue-100 mb-8 leading-relaxed">
                    With over a decade of experience in the tech industry, I've seen firsthand how technology can transform communities. 
                    T-Tech Initiatives is my commitment to bringing that transformation to Liberia, one student at a time.
                  </p>
                  
                  <div className="flex flex-wrap gap-4">
                    <motion.a 
                      href="https://www.linkedin.com/in/william-t-johnson-jr-a45519246/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors duration-200"
                      whileHover={{ y: -2 }}
                    >
                      <FaLinkedin className="text-xl" />
                      <span>LinkedIn</span>
                    </motion.a>
                    <motion.a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors duration-200"
                      whileHover={{ y: -2 }}
                    >
                      <FaTwitter className="text-xl" />
                      <span>Twitter</span>
                    </motion.a>
                    <motion.a 
                      href="https://github.com/williamjohnson" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors duration-200"
                      whileHover={{ y: -2 }}
                    >
                      <FaGithub className="text-xl" />
                      <span>GitHub</span>
                    </motion.a>
                    <motion.a 
                      href="https://github.com/Williamgithubit" 
                      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors duration-200"
                      whileHover={{ y: -2 }}
                    >
                      <MdEmail className="text-xl" />
                      <span>Email</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#E32845] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#0000ff] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#000054] mb-8 text-center">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                {stat.icon}
                <div className="text-4xl font-bold text-[#000054] mb-2">{stat.number}</div>
                <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-[#000054] mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index}>
                <div className="flex flex-col h-full p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#000054] mb-3 text-center">{value.title}</h3>
                  <p className="text-gray-600 text-center flex-1">{value.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default About;