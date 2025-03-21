import React from 'react';
import { UserPlus, CheckCircle, MapPin } from 'lucide-react';

const Network: React.FC = () => {
  const suggestions = [
    {
      id: 1,
      name: 'Dr. Michael Brown',
      specialty: 'Orthopedic Surgeon',
      location: 'New York, USA',
      verified: true,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150',
      mutualConnections: 12
    },
    {
      id: 2,
      name: 'Dr. Lisa Chen',
      specialty: 'Dermatologist',
      location: 'Los Angeles, USA',
      verified: true,
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=150',
      mutualConnections: 8
    },
    {
      id: 3,
      name: 'Dr. James Wilson',
      specialty: 'Cardiologist',
      location: 'Chicago, USA',
      verified: false,
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150',
      mutualConnections: 15
    }
  ];

  return (
    <div className="max-w-2xl mx-auto py-4 px-4">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Grow Your Network</h2>

        <div className="space-y-6">
          {suggestions.map((doctor) => (
            <div key={doctor.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                  {doctor.verified && (
                    <CheckCircle className="w-4 h-4 text-teal-500 ml-1" />
                  )}
                </div>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {doctor.location}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {doctor.mutualConnections} mutual connections
                </p>
              </div>
              <button className="flex items-center space-x-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                <UserPlus className="w-4 h-4" />
                <span>Connect</span>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Specialties You Might Be Interested In</h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Cardiology',
              'Neurology',
              'Pediatrics',
              'Oncology',
              'Dermatology',
              'Orthopedics',
              'Psychiatry',
              'Radiology'
            ].map((specialty) => (
              <button
                key={specialty}
                className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                {specialty}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Network;