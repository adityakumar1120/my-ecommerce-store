import React from 'react';
import { Truck, Headphones, Shield } from 'lucide-react';

const benefits = [
  {
    icon: <Truck className="h-6 w-6" />,
    title: 'FREE AND FAST DELIVERY',
    description: 'Free delivery for all orders over $140'
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    title: '24/7 CUSTOMER SERVICE',
    description: 'Friendly 24/7 customer support'
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'MONEY BACK GUARANTEE',
    description: 'We return money within 30 days'
  }
];

const ServiceBenefits = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              {benefit.icon}
            </div>
            <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceBenefits;