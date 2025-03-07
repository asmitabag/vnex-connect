
import React from 'react';
import { Check, Trash2 } from 'lucide-react';

export interface ComplaintData {
  id: string;
  regNo: string;
  block: string;
  roomNo: string;
  name: string;
  description: string;
  createdAt: string;
  resolved: boolean;
  mess?: string;
  mealType?: string;
}

interface ComplaintCardProps {
  complaint: ComplaintData;
  onResolve: (id: string) => void;
  onDelete: (id: string) => void;
  type: 'hostel' | 'mess';
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({ 
  complaint, 
  onResolve, 
  onDelete,
  type
}) => {
  return (
    <div className={`vnex-card hover:border-primary-300 transition-all ${complaint.resolved ? 'bg-gray-50' : ''}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg flex items-center">
            {complaint.name}
            {complaint.resolved && (
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Resolved
              </span>
            )}
          </h3>
          <p className="text-sm text-gray-500">
            {complaint.regNo} • Block {complaint.block}, Room {complaint.roomNo}
          </p>
          {type === 'mess' && (
            <p className="text-sm text-gray-500">
              Mess: {complaint.mess} • Meal: {complaint.mealType}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-1">
            {new Date(complaint.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="flex space-x-2">
          {!complaint.resolved && (
            <button
              onClick={() => onResolve(complaint.id)}
              className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
              title="Mark as Resolved"
            >
              <Check className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => onDelete(complaint.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            title="Delete Complaint"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      <p className="mt-3 text-gray-700">{complaint.description}</p>
    </div>
  );
};

export default ComplaintCard;
