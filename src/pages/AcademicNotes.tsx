
import React, { useState } from 'react';
import { useProfile } from '../contexts/ProfileContext';
import { File, Book, Upload, Camera, Plus, Download, ChevronDown, ChevronUp } from 'lucide-react';
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
import CameraCapture from '@/components/CameraCapture';

interface NoteFile {
  id: string;
  name: string;
  uploader: string;
  uploadDate: string;
  fileUrl: string;
  size: string;
}

interface Subject {
  id: string;
  name: string;
  code: string;
  files: NoteFile[];
  isExpanded: boolean;
}

const AcademicNotes: React.FC = () => {
  const { profileType, campus } = useProfile();
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: '1',
      name: 'Data Structures and Algorithms',
      code: 'CSE2003',
      isExpanded: false,
      files: [
        {
          id: '1',
          name: 'Sorting Algorithms.pdf',
          uploader: 'Dr. Anand Kumar',
          uploadDate: '2025-01-15',
          fileUrl: '#',
          size: '2.4 MB'
        },
        {
          id: '2',
          name: 'Graph Algorithms.pdf',
          uploader: 'Dr. Anand Kumar',
          uploadDate: '2025-01-20',
          fileUrl: '#',
          size: '3.1 MB'
        }
      ]
    },
    {
      id: '2',
      name: 'Database Management Systems',
      code: 'CSE2004',
      isExpanded: false,
      files: [
        {
          id: '3',
          name: 'SQL Basics.pdf',
          uploader: 'Dr. Priya Venkat',
          uploadDate: '2025-02-05',
          fileUrl: '#',
          size: '1.8 MB'
        }
      ]
    },
    {
      id: '3',
      name: 'Computer Networks',
      code: 'CSE3001',
      isExpanded: false,
      files: [
        {
          id: '4',
          name: 'TCP/IP Protocol.pdf',
          uploader: 'Dr. Ramesh Kumar',
          uploadDate: '2025-02-10',
          fileUrl: '#',
          size: '2.2 MB'
        }
      ]
    }
  ]);

  const [newSubject, setNewSubject] = useState({
    name: '',
    code: ''
  });

  const [uploadInfo, setUploadInfo] = useState({
    subjectId: '',
    file: null as File | null,
    filePreview: ''
  });

  const [fileUploadDialog, setFileUploadDialog] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSubject(prev => ({ ...prev, [name]: value }));
  };

  const addSubject = () => {
    if (!newSubject.name || !newSubject.code) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newSubjectWithId = {
      ...newSubject,
      id: Date.now().toString(),
      files: [],
      isExpanded: false
    };

    setSubjects(prev => [...prev, newSubjectWithId]);
    setOpenDialog(false);
    setNewSubject({
      name: '',
      code: ''
    });

    toast({
      title: "Subject Added",
      description: `${newSubject.name} has been added successfully`,
    });
  };

  const toggleExpand = (id: string) => {
    setSubjects(prev => 
      prev.map(subject => 
        subject.id === id 
          ? { ...subject, isExpanded: !subject.isExpanded } 
          : subject
      )
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadInfo(prev => ({
        ...prev,
        file,
        filePreview: URL.createObjectURL(file)
      }));
    }
  };

  const handleCameraCapture = (file: File) => {
    setUploadInfo(prev => ({
      ...prev,
      file,
      filePreview: URL.createObjectURL(file)
    }));
  };

  const uploadFile = () => {
    if (!uploadInfo.subjectId || !uploadInfo.file) {
      toast({
        title: "Missing Information",
        description: "Please select both a subject and a file",
        variant: "destructive",
      });
      return;
    }

    // Create a new file entry
    const newFile: NoteFile = {
      id: Date.now().toString(),
      name: uploadInfo.file.name,
      uploader: profileType === 'faculty' ? 'Faculty' : 'Student',
      uploadDate: new Date().toISOString().split('T')[0],
      fileUrl: URL.createObjectURL(uploadInfo.file),
      size: `${(uploadInfo.file.size / (1024 * 1024)).toFixed(1)} MB`
    };

    // Add the file to the correct subject
    setSubjects(prev => 
      prev.map(subject => 
        subject.id === uploadInfo.subjectId
          ? { 
              ...subject, 
              files: [...subject.files, newFile],
              isExpanded: true // Auto-expand to show the new file
            }
          : subject
      )
    );
    
    setFileUploadDialog(false);
    
    // Reset upload info
    setUploadInfo({
      subjectId: '',
      file: null,
      filePreview: ''
    });

    toast({
      title: "File Uploaded",
      description: "The file has been uploaded successfully",
    });
  };

  return (
    <div className="vnex-container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <Book className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold">Academic Notes</h1>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              onClick={() => setFileUploadDialog(true)}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              Upload Notes
            </Button>
            
            {profileType === 'faculty' && (
              <Button 
                onClick={() => setOpenDialog(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Subject
              </Button>
            )}
          </div>
        </div>

        {subjects.length === 0 ? (
          <div className="text-center py-12">
            <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600">No subjects available</h3>
            <p className="text-gray-500 mt-2">
              {profileType === 'faculty' 
                ? 'Click "Add Subject" to create a new subject.' 
                : 'No subjects have been added yet.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {subjects.map(subject => (
              <div key={subject.id} className="vnex-card">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleExpand(subject.id)}
                >
                  <div>
                    <h2 className="text-xl font-semibold">{subject.name}</h2>
                    <p className="text-gray-500">{subject.code}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">{subject.files.length} files</span>
                    {subject.isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                </div>
                
                {subject.isExpanded && subject.files.length > 0 && (
                  <div className="mt-4 border-t pt-4">
                    <div className="rounded-lg border overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              File Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Uploaded By
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Size
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Action
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {subject.files.map(file => (
                            <tr key={file.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <File className="h-5 w-5 text-primary-500 mr-2" />
                                  <span className="text-sm font-medium text-gray-900">{file.name}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {file.uploader}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {file.uploadDate}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {file.size}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <a 
                                  href={file.fileUrl} 
                                  download 
                                  className="text-primary-600 hover:text-primary-900 flex items-center justify-end"
                                >
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                
                {subject.isExpanded && subject.files.length === 0 && (
                  <div className="mt-4 border-t pt-4 text-center py-6">
                    <File className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No files have been uploaded for this subject yet.</p>
                    <Button 
                      onClick={() => {
                        setUploadInfo(prev => ({ ...prev, subjectId: subject.id }));
                        setFileUploadDialog(true);
                      }}
                      variant="outline" 
                      className="mt-2"
                    >
                      Upload Now
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Subject Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
            <DialogDescription>
              Create a new subject for academic notes.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name">Subject Name</Label>
              <Input
                id="name"
                name="name"
                value={newSubject.name}
                onChange={handleInputChange}
                placeholder="e.g., Data Structures and Algorithms"
              />
            </div>
            
            <div>
              <Label htmlFor="code">Subject Code</Label>
              <Input
                id="code"
                name="code"
                value={newSubject.code}
                onChange={handleInputChange}
                placeholder="e.g., CSE2003"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={addSubject}>Add Subject</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* File Upload Dialog */}
      <Dialog open={fileUploadDialog} onOpenChange={setFileUploadDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Notes</DialogTitle>
            <DialogDescription>
              Upload notes for a specific subject.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="subject">Subject</Label>
              <select
                id="subject"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={uploadInfo.subjectId}
                onChange={(e) => setUploadInfo(prev => ({ ...prev, subjectId: e.target.value }))}
              >
                <option value="">Select a subject</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name} ({subject.code})
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <Label>Upload Method</Label>
              <div className="flex gap-2 mt-2">
                <div className="flex-1">
                  <Label 
                    htmlFor="file-upload" 
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-500" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, PPT, etc.
                      </p>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </Label>
                </div>
                
                <div className="flex items-center justify-center">
                  <span className="text-gray-500">OR</span>
                </div>
                
                <div className="flex-1 flex items-center justify-center">
                  <CameraCapture onImageCapture={handleCameraCapture} buttonText="Capture Document" />
                </div>
              </div>
            </div>
            
            {uploadInfo.filePreview && (
              <div>
                <Label>Selected File</Label>
                <div className="mt-2 p-2 border rounded-md">
                  <div className="flex items-center">
                    <File className="h-8 w-8 text-primary-500 mr-2" />
                    <div>
                      <p className="font-medium">{uploadInfo.file?.name}</p>
                      <p className="text-sm text-gray-500">
                        {uploadInfo.file && 
                          `${(uploadInfo.file.size / (1024 * 1024)).toFixed(2)} MB`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setFileUploadDialog(false);
              setUploadInfo({
                subjectId: '',
                file: null,
                filePreview: ''
              });
            }}>
              Cancel
            </Button>
            <Button 
              onClick={uploadFile}
              disabled={!uploadInfo.subjectId || !uploadInfo.file}
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AcademicNotes;
