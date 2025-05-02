import React from 'react';
import { Store, DollarSign, Package, Coins } from 'lucide-react';

const stats = [
  {
    number: '10.5k',
    text: 'Sellers active our site',
    icon: <Store className="text-black h-6 w-6" />,
  },
  {
    number: '33k',
    text: 'Monthly Prodduct Sale',
    icon: <DollarSign className="text-white h-6 w-6" />,
    highlight: true,
  },
  {
    number: '45.5k',
    text: 'Customer active in our site',
    icon: <Package className="text-black h-6 w-6" />,
  },
  {
    number: '25k',
    text: 'Anual gross sale in our site',
    icon: <Coins className="text-black h-6 w-6" />,
  },
];

const Stats = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index}
            className={`border rounded-lg p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg ${
              stat.highlight ? 'bg-red-500 text-white' : 'bg-white'
            }`}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
              stat.highlight ? 'bg-white' : 'bg-gray-200'
            }`}>
              {stat.icon}
            </div>
            <h3 className="text-2xl font-bold mb-1">{stat.number}</h3>
            <p className="text-center text-sm">{stat.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;