import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Profile from './components/Profile';
import SearchComponent from './components/Search';
import CreatePost from './components/CreatePost';
import Scan from './components/Scan';
import Network from './components/Network';
import { Login, Signup } from './components/AuthPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 border-l border-r border-gray-200">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/search" element={<SearchComponent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/post" element={<CreatePost />} />
            <Route path="/network" element={<Network />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-80 p-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-teal-700 mb-4">Verified Doctors</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-3">
                  <img
                    src={`https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150`}
                    alt="Doctor"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium text-gray-900 flex items-center">
                      Dr. Sarah Wilson
                      <CheckCircle className="w-4 h-4 text-teal-500 ml-1" />
                    </p>
                    <p className="text-sm text-gray-500">Cardiologist</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
