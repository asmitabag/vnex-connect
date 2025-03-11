
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, PlusCircle, Camera, Upload, X } from 'lucide-react';
import ComplaintForm from '@/components/ComplaintForm';
import ComplaintCard, { ComplaintData } from '@/components/ComplaintCard';
import { useToast } from '@/hooks/use-toast';

const HostelComplaints = () => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [complaints, setComplaints] = useState<ComplaintData[]>([
    {
      id: '1',
      regNo: '23BCE1701',
      block: 'A',
      roomNo: '123',
      name: 'Rishi Garg',
      description: 'Fan not working properly in my room. It makes noise and doesn\'t rotate at full speed.',
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      resolved: false,
      imageUrl: null,
    },
    {
      id: '2',
      regNo: '22BCE1234',
      block: 'B',
      roomNo: '456',
      name: 'Trisha Singh',
      description: 'Light bulb in bathroom needs replacement.',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      resolved: true,
      imageUrl: null,
    },
  ]);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (values: any) => {
    const newComplaint: ComplaintData = {
      id: Date.now().toString(),
      regNo: values.regNo,
      block: values.block,
      roomNo: values.roomNo,
      name: values.name,
      description: values.description,
      createdAt: new Date().toISOString(),
      resolved: false,
      imageUrl: values.imageUrl,
    };

    setComplaints([newComplaint, ...complaints]);
    setShowForm(false);
  };

  const handleResolve = (id: string) => {
    setComplaints(
      complaints.map((complaint) =>
        complaint.id === id ? { ...complaint, resolved: true } : complaint
      )
    );
    toast({
      title: "Complaint Resolved",
      description: "The complaint has been marked as resolved.",
    });
  };

  const handleDelete = (id: string) => {
    setComplaints(complaints.filter((complaint) => complaint.id !== id));
    toast({
      title: "Complaint Deleted",
      description: "The complaint has been deleted successfully.",
    });
  };

  return (
    <div className="vnex-container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Hostel Complaints</h1>
        <button
          onClick={toggleForm}
          className="vnex-button-primary flex items-center space-x-2"
        >
          {showForm ? (
            <>
              <ChevronUp className="w-5 h-5" />
              <span>Hide Form</span>
            </>
          ) : (
            <>
              <PlusCircle className="w-5 h-5" />
              <span>New Complaint</span>
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="mb-8 animate-slideUp">
          <ComplaintForm type="hostel" onSubmit={handleSubmit} />
        </div>
      )}

      <div className="space-y-4">
        {complaints.length === 0 ? (
          <div className="vnex-card text-center py-8">
            <p className="text-gray-500">No complaints yet. Be the first to submit one!</p>
          </div>
        ) : (
          complaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              onResolve={handleResolve}
              onDelete={handleDelete}
              type="hostel"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HostelComplaints;
