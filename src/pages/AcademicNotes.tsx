
import React, { useState, useEffect } from 'react';
import { useProfile } from '../contexts/ProfileContext';
import { BookOpen, Upload, Download, FileText, Search, Filter, Plus, ChevronDown, ChevronUp } from 'lucide-react';
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface NoteFile {
  id: string;
  title: string;
  uploadedBy: string;
  uploadDate: string;
  downloads: number;
  fileSize: string;
  fileType: string;
}

interface Subject {
  id: string;
  name: string;
  course: string;
  semester: string;
  files: NoteFile[];
}

const AcademicNotes = () => {
  const { campus, profileType } = useProfile();
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: '1',
      name: 'Data Structures',
      course: 'Computer Science',
      semester: '3',
      files: [
        {
          id: '1-1',
          title: 'Data Structures and Algorithms Notes',
          uploadedBy: 'Prof. Sharma',
          uploadDate: '2025-01-15',
          downloads: 127,
          fileSize: '2.4 MB',
          fileType: 'PDF'
        }
      ]
    },
    {
      id: '2',
      name: 'Thermodynamics',
      course: 'Mechanical Engineering',
      semester: '4',
      files: [
        {
          id: '2-1',
          title: 'Thermodynamics Complete Guide',
          uploadedBy: 'Dr. Patel',
          uploadDate: '2025-02-22',
          downloads: 89,
          fileSize: '3.7 MB',
          fileType: 'PDF'
        }
      ]
    },
    {
      id: '3',
      name: 'Database Management',
      course: 'Computer Science',
      semester: '5',
      files: [
        {
          id: '3-1',
          title: 'DBMS Tutorial & Sample Questions',
          uploadedBy: 'Prof. Kumar',
          uploadDate: '2025-03-01',
          downloads: 156,
          fileSize: '1.8 MB',
          fileType: 'PDF'
        }
      ]
    }
  ]);
  
  const [newNote, setNewNote] = useState({
    title: '',
    subject: '',
    course: '',
    semester: '',
    uploadedBy: '',
    uploadDate: new Date().toISOString().split('T')[0],
    fileSize: '',
    fileType: 'PDF',
    existingSubjectId: ''
  });

  const [isAddingToExisting, setIsAddingToExisting] = useState(false);
  const [expandedSubjects, setExpandedSubjects] = useState<Record<string, boolean>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewNote(prev => ({ ...prev, [name]: value }));
  };

  const toggleSubjectExpand = (subjectId: string) => {
    setExpandedSubjects(prev => ({
      ...prev,
      [subjectId]: !prev[subjectId]
    }));
  };

  const addNote = () => {
    if (isAddingToExisting) {
      if (!newNote.existingSubjectId || !newNote.title) {
        toast({
          title: "Missing Information",
          description: "Please select a subject and provide a title",
          variant: "destructive",
        });
        return;
      }

      const newFile = {
        id: `${Date.now()}`,
        title: newNote.title,
        uploadedBy: newNote.uploadedBy,
        uploadDate: newNote.uploadDate,
        downloads: 0,
        fileSize: newNote.fileSize,
        fileType: newNote.fileType
      };

      setSubjects(prev => prev.map(subject => 
        subject.id === newNote.existingSubjectId
          ? { ...subject, files: [...subject.files, newFile] }
          : subject
      ));

    } else {
      if (!newNote.subject || !newNote.course || !newNote.title) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }

      const newSubject = {
        id: `${Date.now()}`,
        name: newNote.subject,
        course: newNote.course,
        semester: newNote.semester,
        files: [{
          id: `${Date.now()}-1`,
          title: newNote.title,
          uploadedBy: newNote.uploadedBy,
          uploadDate: newNote.uploadDate,
          downloads: 0,
          fileSize: newNote.fileSize,
          fileType: newNote.fileType
        }]
      };

      setSubjects(prev => [...prev, newSubject]);
    }

    setOpenDialog(false);
    setNewNote({
      title: '',
      subject: '',
      course: '',
      semester: '',
      uploadedBy: '',
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: '',
      fileType: 'PDF',
      existingSubjectId: ''
    });
    setIsAddingToExisting(false);

    toast({
      title: "Note Added",
      description: "Your academic note has been added successfully",
    });
  };

  const handleDownload = (subjectId: string, fileId: string) => {
    // Update the download count for the specific file
    setSubjects(prev => 
      prev.map(subject => 
        subject.id === subjectId
          ? {
              ...subject,
              files: subject.files.map(file => 
                file.id === fileId
                  ? { ...file, downloads: file.downloads + 1 }
                  : file
              )
            }
          : subject
      )
    );
    
    toast({
      title: "Download Started",
      description: "Your file is downloading...",
    });
  };

  const filteredSubjects = searchTerm 
    ? subjects.filter(subject => 
        subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subject.files.some(file => 
          file.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : subjects;

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
                placeholder="Search by subject, course or note title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
        
        {filteredSubjects.length === 0 ? (
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
            {filteredSubjects.map(subject => (
              <Collapsible 
                key={subject.id} 
                open={expandedSubjects[subject.id]} 
                onOpenChange={() => toggleSubjectExpand(subject.id)}
                className="vnex-card hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{subject.name}</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full text-sm font-medium">
                        {subject.course}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-sm font-medium">
                        Semester {subject.semester}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-sm font-medium">
                        {subject.files.length} {subject.files.length === 1 ? 'file' : 'files'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAddingToExisting(true);
                        setNewNote(prev => ({ ...prev, existingSubjectId: subject.id }));
                        setOpenDialog(true);
                      }}
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Add Note
                    </Button>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        {expandedSubjects[subject.id] ? 
                          <ChevronUp className="h-4 w-4" /> : 
                          <ChevronDown className="h-4 w-4" />
                        }
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                
                <CollapsibleContent>
                  <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
                    {subject.files.map(file => (
                      <div key={file.id} className="p-4 bg-gray-50 rounded-md">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{file.title}</h3>
                            <div className="mt-1 text-sm text-gray-500">
                              Uploaded by {file.uploadedBy} on {new Date(file.uploadDate).toLocaleDateString()}
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownload(subject.id, file.id)}
                            className="flex items-center gap-1"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </Button>
                        </div>
                        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                          <span>{file.fileType} · {file.fileSize}</span>
                          <span>{file.downloads} downloads</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        )}
      </div>

      {/* Upload Note Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isAddingToExisting ? "Add Note to Existing Subject" : "Upload New Academic Notes"}
            </DialogTitle>
            <DialogDescription>
              Share your notes and study materials with other students.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {isAddingToExisting ? (
              <div>
                <Label>Selected Subject</Label>
                <div className="mt-1 p-2 bg-gray-50 rounded-md">
                  {subjects.find(s => s.id === newNote.existingSubjectId)?.name || "Select a subject"}
                </div>
              </div>
            ) : (
              <>
                <div>
                  <Label htmlFor="subject">Subject Name *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={newNote.subject}
                    onChange={handleInputChange}
                    placeholder="e.g., Machine Learning"
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
                </div>
              </>
            )}
            
            <div>
              <Label htmlFor="title">Note Title *</Label>
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
            <Button 
              variant="outline" 
              onClick={() => {
                setOpenDialog(false);
                setIsAddingToExisting(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={addNote}>Upload Notes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AcademicNotes;
