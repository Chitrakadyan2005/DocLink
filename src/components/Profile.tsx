import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, CheckCircle, Link } from 'lucide-react';
import axios from 'axios';

const Profile: React.FC = () => {
  const [user, setUser] = useState<{ name: string; specialty: string; profileImage: string; coverImage: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/api/profile", { withCredentials: true });
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);
  return (
    <div className="max-w-2xl mx-auto py-4 px-4">
      <div className="relative">
        <img
          src="https://th.bing.com/th/id/R.0a811db09d0afc29c04f0be0dfa64cc0?rik=3NNwDjtip5V9yA&riu=http%3a%2f%2fwww.solidbackgrounds.com%2fimages%2f2560x1440%2f2560x1440-teal-green-solid-color-background.jpg&ehk=9PoDRbIFwE%2bNPaEbdKCVGNMtHpQWYtf%2bCT%2boM7NS%2bns%3d&risl=&pid=ImgRaw&r=0"
          alt="Cover"
          className="w-full h-48 object-cover rounded-lg"
        />
        <img
          src="https://static.vecteezy.com/system/resources/previews/002/318/271/non_2x/user-profile-icon-free-vector.jpg"
          alt="Profile"
          className="absolute -bottom-16 left-4 w-32 h-32 rounded-full border-4 border-white"
        />
      </div>
      <div className="mt-20">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">
                {user?.name || "Loading..."}
              </h1>
              <CheckCircle className="w-6 h-6 text-teal-500 ml-2" />
            </div>
            <p className="text-gray-600">{user?.specialty || "Loading..."}</p>
          </div>
          
        </div>

        <div className="flex items-center space-x-4 mt-4 text-gray-600">
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Jaipur, India
          </span>
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            Joined 2025
          </span>
          <span className="flex items-center">
            <Link className="w-4 h-4 mr-1" />
            heartcarecenter.com
          </span>
        </div>


        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-teal-600">0</div>
            <div className="text-gray-600">Followers</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-teal-600">0</div>
            <div className="text-gray-600">Following</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-teal-600">0</div>
            <div className="text-gray-600">Posts</div>
          </div>
        </div>

        
        </div>
      </div>
  );
}

export default Profile