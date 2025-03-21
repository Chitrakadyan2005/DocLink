import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, User, Camera, MessageSquarePlus, Users } from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/profile', icon: User, label: 'Profile' },
    { path: '/scan', icon: Camera, label: 'Scan' },
    { path: '/post', icon: MessageSquarePlus, label: 'Post' },
    { path: '/network', icon: Users, label: 'Network' },
    { path: '/login', icon: User, label: 'Login' },
    { path: '/signup', icon: User, label: 'Sign Up' },
  ];

  return (
    <div className="w-64 p-4 flex flex-col h-screen sticky top-0">
      <h1 className="text-2xl font-bold text-teal-600 mb-8 flex items-center">
        <User className="mr-2" />
        DocSphere
      </h1>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="flex items-center space-x-3 p-3 w-full rounded-lg transition-colors text-gray-700 hover:bg-gray-50"
          >
            <item.icon className="w-6 h-6" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <button className="mt-auto bg-teal-600 text-white rounded-lg py-3 px-4 font-medium hover:bg-teal-700 transition-colors">
        Start Live Session
      </button>
    </div>
  );
}

export default Sidebar;
