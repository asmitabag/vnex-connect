
import React from 'react';
import { Building, Search } from 'lucide-react';

const LostFound = () => {
  return (
    <div className="vnex-container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-2 mb-8">
          <Building className="w-8 h-8 text-primary-600" />
          <h1 className="text-3xl font-bold">Lost & Found</h1>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
          <p className="text-yellow-700">
            This feature is currently under development. Check back soon to report lost items or find items others have reported.
          </p>
        </div>
        
        <div className="grid gap-8">
          <div className="vnex-card">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Search className="w-6 h-6 mr-2 text-primary-600" />
              Coming Soon
            </h2>
            <p className="text-gray-600 mb-4">
              The Lost & Found feature will allow you to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600">
              <li>Report items you've lost on campus</li>
              <li>Post about items you've found</li>
              <li>Browse through lost and found listings</li>
              <li>Contact the person who posted the listing</li>
              <li>Mark items as claimed/returned</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostFound;
