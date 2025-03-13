
import React, { useState } from 'react';
import { useProfile } from '../contexts/ProfileContext';
import { BookOpen, Upload, Download, FileText, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface Note {
  id: string;
  title: string;
  course: string;
  subject: string;
  semester: string;
  uploadedBy: string;
  uploadDate: string;
  downloads: number;
  fileSize: string;
  fileType: string;
}

const AcademicNotes = () => {
  const { campus, profileType } = useProfile();
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Data Structures and Algorithms Notes',
      course: 'Computer Science',
      subject: 'Data Structures',
      semester: '3',
      uploadedBy: 'Prof. Sharma',
      uploadDate: '2023-09-15',
      downloads: 127,
      fileSize: '2.4 MB',
      fileType: 'PDF'
    },
    {
      id: '2',
      title: 'Thermodynamics Complete Guide',
      course: 'Mechanical Engineering',
      subject: 'Thermodynamics',
      semester: '4',
      uploadedBy: 'Dr. Patel',
      uploadDate: '2023-08-22',
      downloads: 89,
      fileSize: '3.7 MB',
      fileType: 'PDF'
    },
    {
      id: '3',
      title: 'DBMS Tutorial & Sample Questions',
      course: 'Computer Science',
      subject: 'Database Management',
      semester: '5',
      uploadedBy: 'Prof. Kumar',
      uploadDate: '2023-10-01',
      downloads: 156,
      fileSize: '1.8 MB',
      fileType: 'PDF'
    }
  ]);
  
  const [newNote, setNewNote] = useState<Omit<Note, 'id' | 'downloads'>>({
    title: '',
    course: '',
    subject: '',
    semester: '',
    uploadedBy: '',
    uploadDate: new Date().toISOString().split('T')[0],
    fileSize: '',
    fileType: 'PDF'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewNote(prev => ({ ...prev, [name]: value }));
  };

  const addNote = () => {
    if (!newNote.title || !newNote.course || !newNote.subject) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newNoteWithId = {
      ...newNote,
      id: `${Date.now()}`,
      downloads: 0,
    };

    setNotes(prev => [...prev, newNoteWithId]);
    setOpenDialog(false);
    setNewNote({
      title: '',
      course: '',
      subject: '',
      semester: '',
      uploadedBy: '',
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: '',
      fileType: 'PDF'
    });

    toast({
      title: "Note Added",
      description: "Your academic note has been added successfully",
    });
  };

  const handleDownload = (noteId: string) => {
    // In a real app, this would trigger a file download
    // For now, we'll just update the download count
    setNotes(prev => 
      prev.map(note => 
        note.id === noteId 
          ? { ...note, downloads: note.downloads + 1 } 
          : note
      )
    );
    
    toast({
      title: "Download Started",
      description: "Your file is downloading...",
    });
  };

  const filteredNotes = searchTerm 
    ? notes.filter(note => 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.course.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : notes;

  return (
    <div className="vnex-container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold">Academic Notes</h1>
          </div>
          
          <Button 
            onClick={() => setOpenDialog(true)}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload Notes
          </Button>
        </div>

        {!campus && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <p className="text-yellow-700">
              Please select a campus in your profile to see academic notes for your campus.
            </p>
          </div>
        )}
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by title, subject or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
        
        {filteredNotes.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600">No notes found</h3>
            <p className="text-gray-500 mt-2">
              {searchTerm 
                ? 'No notes match your search criteria.' 
                : 'There are no academic notes available yet.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredNotes.map(note => (
              <div key={note.id} className="vnex-card hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{note.title}</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full text-sm font-medium">
                        {note.course}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-sm font-medium">
                        {note.subject}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-sm font-medium">
                        Semester {note.semester}
                      </span>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(note.id)}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                  <div>
                    Uploaded by {note.uploadedBy} on {new Date(note.uploadDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-4">
                    <span>{note.fileType} · {note.fileSize}</span>
                    <span>{note.downloads} downloads</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Note Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Upload Academic Notes</DialogTitle>
            <DialogDescription>
              Share your notes and study materials with other students.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                name="title"
                value={newNote.title}
                onChange={handleInputChange}
                placeholder="e.g., Machine Learning Basics"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="course">Course *</Label>
                <Input
                  id="course"
                  name="course"
                  value={newNote.course}
                  onChange={handleInputChange}
                  placeholder="e.g., Computer Science"
                />
              </div>
              
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={newNote.subject}
                  onChange={handleInputChange}
                  placeholder="e.g., Artificial Intelligence"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="semester">Semester</Label>
                <select
                  id="semester"
                  name="semester"
                  value={newNote.semester}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Select Semester</option>
                  <option value="1">Semester 1</option>
                  <option value="2">Semester 2</option>
                  <option value="3">Semester 3</option>
                  <option value="4">Semester 4</option>
                  <option value="5">Semester 5</option>
                  <option value="6">Semester 6</option>
                  <option value="7">Semester 7</option>
                  <option value="8">Semester 8</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="fileType">File Type</Label>
                <select
                  id="fileType"
                  name="fileType"
                  value={newNote.fileType}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="PDF">PDF</option>
                  <option value="DOCX">DOCX</option>
                  <option value="PPT">PPT</option>
                  <option value="ZIP">ZIP</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="uploadedBy">Uploaded By</Label>
                <Input
                  id="uploadedBy"
                  name="uploadedBy"
                  value={newNote.uploadedBy}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <Label htmlFor="fileSize">File Size</Label>
                <Input
                  id="fileSize"
                  name="fileSize"
                  value={newNote.fileSize}
                  onChange={handleInputChange}
                  placeholder="e.g., 2.4 MB"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="fileUpload">Upload File *</Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="fileUpload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500"
                    >
                      <span>Upload a file</span>
                      <input id="fileUpload" name="fileUpload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PDF, DOC, DOCX, PPT, PPTX up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={addNote}>Upload Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AcademicNotes;
