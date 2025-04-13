import React from 'react';

const FeaturesGrid = () => {
  const features = [
    {
      title: 'Events from Users around you.',
      description: 'Create and Discover happenings in your area - follow, discuss or participate!',
      image: '/images/events.png',
    },
    {
      title: 'Fun starts together',
      description: 'Follow and join places or groups to keep in touch. Organising anything? Create your own to gather people around you!',
      image: '/images/places.png',
    },
    {
      title: 'Its a group effort',
      description: 'Memories are build together, seek help or start helping at events.',
      image: '/images/helpers.png',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-6xl">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md p-6 flex flex-col items-center text-center"
          >
            <div className="w-full h-32 rounded-xl mb-4">
              <img 
                src={feature.image} 
                alt={feature.title} 
                className="w-full h-full object-cover rounded-xl" 
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{feature.title}</h2>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesGrid;
