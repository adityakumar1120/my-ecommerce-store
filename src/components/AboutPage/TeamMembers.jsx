import React from 'react';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

const teamMembers = [
  {
    name: 'Tom Cruise',
    role: 'Founder & Chairman',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'Emma Watson',
    role: 'Managing Director',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    name: 'Will Smith',
    role: 'Product Designer',
    image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

const TeamMembers = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="mb-4 overflow-hidden rounded-lg transition-all duration-300 hover:shadow-xl">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-80 object-cover object-center transform transition duration-500 hover:scale-105"
              />
            </div>
            <h3 className="text-xl font-bold">{member.name}</h3>
            <p className="text-gray-600 mb-3">{member.role}</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-black transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((dot) => (
            <span 
              key={dot} 
              className={`block h-2 w-2 rounded-full ${dot === 1 ? 'bg-black' : 'bg-gray-300'}`}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;