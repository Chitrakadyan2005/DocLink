import React, { useState } from 'react';
import { Camera, Upload, FileText } from 'lucide-react';

const Scan: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      alert('Scan completed! This would process the medical image in a real implementation.');
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto py-4 px-4">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Medical Image Scanner</h2>
        
        <div className="space-y-6">
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="flex flex-col items-center">
              <Camera className="w-16 h-16 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Scan Medical Documents</h3>
              <p className="text-gray-500 mb-4">Position your medical document, prescription, or X-ray for scanning</p>
              <button
                onClick={handleScan}
                disabled={isScanning}
                className={`px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors ${
                  isScanning ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isScanning ? 'Scanning...' : 'Start Scan'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Upload className="w-5 h-5 text-gray-600" />
              <span>Upload Image</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FileText className="w-5 h-5 text-gray-600" />
              <span>View History</span>
            </button>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Scanning Tips</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Ensure good lighting for better scan quality</li>
              <li>• Keep the document flat and steady</li>
              <li>• Center the document in the scanning area</li>
              <li>• Avoid shadows and glare</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scan;