import React from 'react';
import Button from '../ui/Button';
import ImageSlider from '../ui/ImageSlider';
import Counter from '../ui/Counter';

// Import all slider images
import img1 from '../../../src/assets/group-diverse-teens-young-people-doing-activities-together-celebrating-world-youth-skills-day.jpg';
import img2 from '../../../src/assets/father-helping-supporting-his-daughter-with-online-school-while-staying-home.jpg';
import img3 from '../../../src/assets/full-shot-african-kids-with-laptop.jpg';
import img4 from '../../../src/assets/group-african-kids-classroom.jpg';
import img5 from '../../../src/assets/small-black-boy-elearning-computer-home.jpg';
import img6 from '../../../src/assets/study-group-african-people.jpg';
import img7 from '../../../src/assets/young-woman-studying-library.jpg';

const HeroSection = () => {
  return (
    <div className="bg-gradient-to-r from-[#000054] to-[#1a1a6e] text-white h-[100vh] pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className='mt-0 lg:mt-12'>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Empowering Liberian Youth Through Digital Education
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Free and affordable technology training for underserved communities across Liberia.
              Join us in bridging the digital divide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                as="link" 
                to="/programs"
                variant="secondary"
                size="lg"
                className="rounded-md"
              >
                Explore Programs
              </Button>
              <Button 
                as="link" 
                to="/volunteer"
                variant="custom"
                size="lg"
                className="rounded-md"
              >
                Volunteer With Us
              </Button>
            </div>
          </div>
          <div className="relative h-96 w-full">
            <ImageSlider 
              images={[
                {
                  src: img1,
                  alt: "Diverse group of young people celebrating together"
                },
                {
                  src: img2,
                  alt: "Father helping his daughter with online school"
                },
                {
                  src: img3,
                  alt: "African children learning with a laptop"
                },
                {
                  src: img4,
                  alt: "Group of African kids in a classroom"
                },
                {
                  src: img5,
                  alt: "Young boy learning on a computer at home"
                },
                {
                  src: img6,
                  alt: "Study group of African students"
                },
                {
                  src: img7,
                  alt: "Young woman studying in a library"
                }
              ]} 
              interval={4000}
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg z-10">
              <div className="text-3xl font-bold text-[#E32845]">
                <Counter end={8} duration={2000} />+
              </div>
              <div className="text-gray-600">Students Trained</div>
            </div>
            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-lg shadow-lg z-10">
              <div className="text-3xl font-bold text-[#E32845]">
                <Counter end={3} duration={2000} />+
              </div>
              <div className="text-gray-600">Volunteers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;