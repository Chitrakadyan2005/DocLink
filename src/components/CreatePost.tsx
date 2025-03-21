import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, X } from 'lucide-react';
import axios from 'axios';

const CreatePost: React.FC = () => {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraClick = () => {
    // This would trigger the device camera in a real implementation
    alert('Camera functionality would open here');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    try {
      // Here you would implement the actual post creation logic
      const response = await axios.post('http://localhost:5000/api/posts', {
        author: 'user_id_here', // Replace with actual user ID from auth context
        content,
        image: selectedImage,
      });
      console.log('Post created:', response.data);
      setContent('');
      setSelectedImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow p-4">
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Share your medical expertise..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 rounded-lg border border-gray-200 resize-none"
            rows={4}
          />
          {selectedImage && (
            <div className="relative mt-4">
              <img src={selectedImage} alt="Selected" className="max-h-64 rounded-lg" />
              <button type="button" onClick={() => setSelectedImage(null)} className="absolute top-2 right-2">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
          <div className="mt-4 flex items-center justify-between">
            <button type="button" onClick={() => fileInputRef.current?.click()} className="text-gray-600">
              <ImageIcon className="w-5 h-5" /> Gallery
            </button>
            <button type="submit" disabled={isUploading || (!content && !selectedImage)} className="bg-teal-600 text-white px-6 py-2 rounded-lg">
              {isUploading ? 'Posting...' : 'Post'}
            </button>
          </div>
          <input type="file" ref={fileInputRef} onChange={handleImageSelect} accept="image/*" className="hidden" />
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
