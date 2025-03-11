
import React, { useState } from 'react';
import { Plus, FileText, Download, Search, Book, Calendar, User, Filter, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Note {
  id: string;
  title: string;
  subject: string;
  semester: string;
  uploadedBy: string;
  uploadedOn: string;
  fileType: 'pdf' | 'doc' | 'ppt' | 'img';
  downloadUrl: string;
  thumbnail?: string;
  description?: string;
}

const AcademicNotes = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [selectedFileType, setSelectedFileType] = useState<string | null>(null);

  const notes: Note[] = [
    {
      id: '1',
      title: 'Data Structures and Algorithms Notes',
      subject: 'Computer Science',
      semester: '3',
      uploadedBy: 'Karan Jain',
      uploadedOn: '2023-09-15',
      fileType: 'pdf',
      downloadUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=500&auto=format&fit=crop',
      description: 'Complete notes on arrays, linked lists, trees, graphs, and sorting algorithms.'
    },
    {
      id: '2',
      title: 'Operating Systems Lab Manual',
      subject: 'Computer Science',
      semester: '4',
      uploadedBy: 'Naman Sharma',
      uploadedOn: '2023-09-10',
      fileType: 'doc',
      downloadUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=500&auto=format&fit=crop',
      description: 'Lab manual with all experiments for VIT Operating Systems course.'
    },
    {
      id: '3',
      title: 'Digital Electronics Lecture Slides',
      subject: 'Electronics',
      semester: '2',
      uploadedBy: 'Chahanaa Sheth',
      uploadedOn: '2023-09-05',
      fileType: 'ppt',
      downloadUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1555066932-e78dd8fb77bb?q=80&w=500&auto=format&fit=crop',
      description: 'Complete lecture slides for Digital Electronics covering Boolean algebra, logic gates, and flip-flops.'
    },
    {
      id: '4',
      title: 'Calculus Formulas and Examples',
      subject: 'Mathematics',
      semester: '1',
      uploadedBy: 'Trisha Singh',
      uploadedOn: '2023-08-28',
      fileType: 'pdf',
      downloadUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=500&auto=format&fit=crop',
      description: 'Comprehensive list of calculus formulas with solved examples.'
    },
    {
      id: '5',
      title: 'Software Engineering Project Examples',
      subject: 'Computer Science',
      semester: '5',
      uploadedBy: 'Manya Ladkani',
      uploadedOn: '2023-08-20',
      fileType: 'pdf',
      downloadUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=500&auto=format&fit=crop',
      description: 'Examples of software engineering projects with documentation and code snippets.'
    },
    {
      id: '6',
      title: 'Mechanics Diagrams and Problems',
      subject: 'Physics',
      semester: '2',
      uploadedBy: 'Rishi Garg',
      uploadedOn: '2023-08-15',
      fileType: 'img',
      downloadUrl: '#',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=500&auto=format&fit=crop',
      description: 'Collection of mechanics diagrams and solved problems for first-year physics.'
    }
  ];

  const subjects = [...new Set(notes.map(note => note.subject))];
  const semesters = [...new Set(notes.map(note => note.semester))];
  const fileTypes = [...new Set(notes.map(note => note.fileType))];

  // Filtering logic
  const filteredNotes = notes.filter(note => {
    // Search term filter
    const matchesSearch = !searchTerm || 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Subject filter
    const matchesSubject = !selectedSubject || note.subject === selectedSubject;
    
    // Semester filter
    const matchesSemester = !selectedSemester || note.semester === selectedSemester;
    
    // File type filter
    const matchesFileType = !selectedFileType || note.fileType === selectedFileType;
    
    return matchesSearch && matchesSubject && matchesSemester && matchesFileType;
  });

  const handleDownload = (note: Note) => {
    toast({
      title: "Download Started",
      description: `Downloading ${note.title}...`,
    });
    // In a real app, this would trigger an actual download
  };

  const clearFilters = () => {
    setSelectedSubject(null);
    setSelectedSemester(null);
    setSelectedFileType(null);
  };

  const getFileTypeIcon = (fileType: string) => {
    const className = "w-4 h-4";
    
    switch (fileType) {
      case 'pdf':
        return <FileText className={`${className} text-red-600`} />;
      case 'doc':
        return <FileText className={`${className} text-blue-600`} />;
      case 'ppt':
        return <FileText className={`${className} text-orange-600`} />;
      case 'img':
        return <FileText className={`${className} text-green-600`} />;
      default:
        return <FileText className={className} />;
    }
  };

  return (
    <div className="vnex-container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Academic Notes</h1>
        
        <button
          onClick={() => toast({
            title: "Coming Soon",
            description: "The feature to upload notes will be available soon!",
          })}
          className="vnex-button-primary flex items-center gap-2"
        >
          <Plus size={18} />
          <span>Upload Notes</span>
        </button>
      </div>

      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="w-full md:w-1/2 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search notes by title, subject..."
            className="pl-10 vnex-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="vnex-button-secondary flex items-center gap-2"
          >
            <Filter size={18} />
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
          
          {(selectedSubject || selectedSemester || selectedFileType) && (
            <button 
              onClick={clearFilters}
              className="px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-100 text-sm flex items-center"
            >
              <X size={14} className="mr-1" />
              Clear Filters
            </button>
          )}
        </div>
      </div>
      
      {showFilters && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="vnex-label">Subject</label>
              <select 
                className="vnex-input"
                value={selectedSubject || ''}
                onChange={(e) => setSelectedSubject(e.target.value || null)}
              >
                <option value="">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="vnex-label">Semester</label>
              <select 
                className="vnex-input"
                value={selectedSemester || ''}
                onChange={(e) => setSelectedSemester(e.target.value || null)}
              >
                <option value="">All Semesters</option>
                {semesters.map(semester => (
                  <option key={semester} value={semester}>Semester {semester}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="vnex-label">File Type</label>
              <select 
                className="vnex-input"
                value={selectedFileType || ''}
                onChange={(e) => setSelectedFileType(e.target.value || null)}
              >
                <option value="">All Types</option>
                {fileTypes.map(type => (
                  <option key={type} value={type}>{type.toUpperCase()}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length === 0 ? (
          <div className="col-span-full vnex-card text-center py-8">
            <p className="text-gray-500">No matching notes found. Try adjusting your filters.</p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div key={note.id} className="vnex-card hover:shadow-lg transition-all">
              {note.thumbnail && (
                <div className="h-40 w-full overflow-hidden rounded-t-md bg-gray-100">
                  <img 
                    src={note.thumbnail} 
                    alt={note.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <span className={`p-1 rounded ${getFileTypeColor(note.fileType)}`}>
                      {getFileTypeIcon(note.fileType)}
                    </span>
                    <span className="ml-2 text-xs uppercase font-medium text-gray-500">
                      {note.fileType}
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => handleDownload(note)}
                    className="p-1 text-primary-600 hover:text-primary-800 transition-colors"
                    title="Download"
                  >
                    <Download size={18} />
                  </button>
                </div>
                
                <h3 className="font-semibold text-lg mt-2">{note.title}</h3>
                
                {note.description && (
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {note.description}
                  </p>
                )}
                
                <div className="mt-4 grid grid-cols-2 gap-y-2 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Book size={14} />
                    <span className="text-xs">{note.subject}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span className="text-xs">Sem {note.semester}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 col-span-2">
                    <User size={14} />
                    <span className="text-xs">Uploaded by {note.uploadedBy} on {formatDate(note.uploadedOn)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

function getFileTypeColor(fileType: string) {
  switch (fileType) {
    case 'pdf': 
      return 'bg-red-100';
    case 'doc': 
      return 'bg-blue-100';
    case 'ppt': 
      return 'bg-orange-100';
    case 'img': 
      return 'bg-green-100';
    default: 
      return 'bg-gray-100';
  }
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

export default AcademicNotes;
