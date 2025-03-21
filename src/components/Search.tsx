import React, { useState } from 'react';
import { Search as SearchIcon, User, CheckCircle } from 'lucide-react';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions] = useState([
    {
      id: 1,
      name: 'Dr. Sneha Tiwari',
      specialty: 'Cardiologist',
      verified: true,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150'
    },
    {
      id: 2,
      name: 'Dr. Vikram Yadav',
      specialty: 'Neurologist',
      verified: true,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150'
    },
    {
      id: 3,
      name: 'Dr. Priya Verma',
      specialty: 'Pediatrician',
      verified: false,
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150'
    }
  ]);

  return (
    <div className="max-w-2xl mx-auto py-4 px-4">
      <div className="relative">
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search doctors, specialties, or posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Searches</h2>
          <div className="flex flex-wrap gap-2">
            {['Cardiologist', 'COVID-19', 'Mental Health', 'Pediatrician', 'Dermatologist'].map((tag) => (
              <button
                key={tag}
                className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Suggested Doctors</h2>
          <div className="space-y-4">
            {suggestions.map((doctor) => (
              <div key={doctor.id} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                    {doctor.verified && (
                      <CheckCircle className="w-4 h-4 text-teal-500 ml-1" />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{doctor.specialty}</p>
                </div>
                <button className="px-4 py-2 rounded-lg border border-teal-500 text-teal-500 hover:bg-teal-50 transition-colors">
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;