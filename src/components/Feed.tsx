import React from 'react';
import { Heart, MessageCircle, Share2, CheckCircle } from 'lucide-react';

const Feed: React.FC = () => {
  const posts = [
    {
      id: 1,
      author: 'Dr. John Smith',
      specialty: 'Neurologist',
      verified: true,
      content: 'New research findings on cognitive health and prevention of neurodegenerative diseases. #Neurology #Healthcare',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500',
      likes: 245,
      comments: 42,
    },
    {
      id: 2,
      author: 'Dr. Emily Chen',
      specialty: 'Cardiologist',
      verified: true,
      content: 'Important update on latest cardiovascular treatment protocols. Thread below 🧵',
      likes: 189,
      comments: 56,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto py-4">
      {/* Create Post */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
        <div className="flex items-center space-x-4">
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150"
            alt="Profile"
            className="w-12 h-12 rounded-full"
          />
          <input
            type="text"
            placeholder="Share your medical expertise..."
            className="flex-1 rounded-full bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150"
                alt={post.author}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="flex items-center">
                  <h3 className="font-semibold text-gray-900">{post.author}</h3>
                  {post.verified && (
                    <CheckCircle className="w-4 h-4 text-teal-500 ml-1" />
                  )}
                </div>
                <p className="text-sm text-gray-500">{post.specialty}</p>
              </div>
            </div>
            
            <p className="text-gray-800 mb-4">{post.content}</p>
            
            {post.image && (
              <img
                src={post.image}
                alt="Post content"
                className="rounded-lg mb-4 w-full"
              />
            )}
            
            <div className="flex items-center space-x-6 text-gray-500">
              <button className="flex items-center space-x-2 hover:text-teal-600">
                <Heart className="w-5 h-5" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-teal-600">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-teal-600">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed