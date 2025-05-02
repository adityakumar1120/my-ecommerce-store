import React from 'react';

const AboutHero = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h1>
          <div className="space-y-4 text-gray-700">
            <p>
              Launched in 2015, Exclusive is South Asia's premier online shopping 
              marketplace with an active presence in Bangladesh. Supported 
              by wide range of tailored marketing, data and service solutions, 
              Exclusive has 10,500 sellers and 300 brands and serves 3 
              millions customers across the region.
            </p>
            <p>
              Exclusive has more than 1 Million products to offer, growing at a 
              very fast. Exclusive offers a diverse assortment in categories 
              ranging from consumer.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <img 
            src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Happy shoppers with shopping bags" 
            className="w-full max-w-lg rounded-lg object-cover h-auto shadow-lg transform transition duration-500 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;