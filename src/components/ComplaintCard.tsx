
import React, { useState } from 'react';
import { Check, Trash2, X, Image as ImageIcon, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";

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
  imageUrl?: string | null;
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
  const [imageOpen, setImageOpen] = useState(false);

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
      
      {complaint.imageUrl && (
        <div className="mt-4">
          <div 
            className="relative w-full max-w-sm rounded-md shadow-sm overflow-hidden cursor-pointer group"
            onClick={() => setImageOpen(true)}
          >
            <img 
              src={complaint.imageUrl} 
              alt="Complaint evidence" 
              className="w-full object-cover h-48 rounded-md transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <ExternalLink className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      <Dialog open={imageOpen} onOpenChange={setImageOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/95">
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none z-10">
            <X className="h-6 w-6 text-white" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <div className="flex items-center justify-center p-1">
            <img 
              src={complaint.imageUrl!} 
              alt="Complaint evidence" 
              className="max-h-[80vh] max-w-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ComplaintCard;
