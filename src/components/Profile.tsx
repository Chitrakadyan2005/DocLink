import React from 'react';
import { MapPin, Calendar, CheckCircle, Link, Video } from 'lucide-react';

const Profile: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-4 px-4">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800"
          alt="Cover"
          className="w-full h-48 object-cover rounded-lg"
        />
        <img
          src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150"
          alt="Profile"
          className="absolute -bottom-16 left-4 w-32 h-32 rounded-full border-4 border-white"
        />
      </div>

      <div className="mt-20">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Dr. Sarah Wilson</h1>
              <CheckCircle className="w-6 h-6 text-teal-500 ml-2" />
            </div>
            <p className="text-gray-600">Cardiologist at Heart Care Center</p>
          </div>
          <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
            Start Live Session
          </button>
        </div>

        <div className="flex items-center space-x-4 mt-4 text-gray-600">
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            New York, USA
          </span>
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            Joined 2023
          </span>
          <span className="flex items-center">
            <Link className="w-4 h-4 mr-1" />
            heartcarecenter.com
          </span>
        </div>

        <p className="mt-4 text-gray-800">
          Experienced cardiologist specializing in preventive cardiology and heart disease management.
          Board certified with over 15 years of clinical experience.
        </p>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-teal-600">1.2K</div>
            <div className="text-gray-600">Followers</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-teal-600">856</div>
            <div className="text-gray-600">Following</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-teal-600">245</div>
            <div className="text-gray-600">Posts</div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Live Sessions</h2>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Video className="w-5 h-5 text-teal-600" />
                  <span className="font-medium">Heart Health Q&A Session #{i}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Duration: 45 minutes</p>
                <p className="text-sm text-gray-600">Viewers: 234</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile