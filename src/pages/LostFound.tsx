import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Plus, 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  Building,
  Trash2, 
  Image as ImageIcon,
  Upload,
  X
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface LostFoundItem {
  id: string;
  type: "lost" | "found";
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  contactName: string;
  contactNumber: string;
  imageUrl?: string;
  campus: string;
  createdAt: string;
}

const LostFound = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<LostFoundItem[]>([]);
  const [activeTab, setActiveTab] = useState<"lost" | "found" | "browse">("browse");
  const [selectedCampus, setSelectedCampus] = useState("Chennai");
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
      
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result as string);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = (e: React.FormEvent, type: "lost" | "found") => {
    e.preventDefault();

    if (!title.trim() || !location.trim() || !category || !date || !contactName.trim() || !contactNumber.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const newItem: LostFoundItem = {
      id: uuidv4(),
      type,
      title,
      description,
      category,
      location,
      date,
      contactName,
      contactNumber,
      imageUrl: previewUrl || undefined,
      campus: selectedCampus,
      createdAt: new Date().toISOString(),
    };

    setItems((prev) => [...prev, newItem]);

    setTitle("");
    setDescription("");
    setCategory("");
    setLocation("");
    setDate("");
    setContactName("");
    setContactNumber("");
    setImage(null);
    setPreviewUrl(null);
    setIsSubmitting(false);
    setActiveTab("browse");

    toast({
      title: "Success",
      description: `Your ${type} item has been posted!`,
    });
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast({
      title: "Deleted",
      description: "Your listing has been removed",
    });
  };

  const filteredItems = items.filter(
    (item) =>
      item.campus === selectedCampus &&
      (selectedCategory === "all" || item.category === selectedCategory)
  );

  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "documents", label: "Documents/ID Cards" },
    { value: "accessories", label: "Accessories" },
    { value: "clothing", label: "Clothing" },
    { value: "books", label: "Books" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="vnex-container py-8">
      <h1 className="vnex-heading">Lost & Found</h1>
      <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
        Lost something? Found something? Use this platform to post about lost or found items and 
        help connect items with their owners.
      </p>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="browse" value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="browse">Browse Items</TabsTrigger>
            <TabsTrigger value="lost">Report Lost Item</TabsTrigger>
            <TabsTrigger value="found">Report Found Item</TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <div className="vnex-card mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="vnex-label">Select Campus</label>
                  <Select value={selectedCampus} onValueChange={setSelectedCampus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select campus" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Chennai">VIT Chennai</SelectItem>
                      <SelectItem value="Vellore">VIT Vellore</SelectItem>
                      <SelectItem value="Bhopal">VIT Bhopal</SelectItem>
                      <SelectItem value="Amaravati">VIT Amaravati</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="vnex-label">Filter by Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <div className="text-center py-12 vnex-card">
                <Search className="w-12 h-12 mx-auto text-gray-400" />
                <p className="mt-4 text-gray-600">No items found. Be the first to post!</p>
                <div className="mt-6 flex justify-center gap-4">
                  <Button onClick={() => setActiveTab("lost")}>Report Lost Item</Button>
                  <Button onClick={() => setActiveTab("found")}>Report Found Item</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className={`vnex-card ${
                      item.type === "lost" ? "border-l-4 border-l-red-500" : "border-l-4 border-l-green-500"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row gap-4">
                      {item.imageUrl && (
                        <div className="md:w-1/4">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-32 object-cover rounded-md"
                          />
                        </div>
                      )}
                      <div className={`${item.imageUrl ? "md:w-3/4" : "w-full"}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-block px-2 py-1 text-xs rounded-full ${
                                  item.type === "lost" ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                                }`}
                              >
                                {item.type === "lost" ? "Lost" : "Found"}
                              </span>
                              <span className="text-sm text-gray-500">
                                {new Date(item.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <h3 className="font-semibold text-lg mt-1">{item.title}</h3>
                          </div>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Building className="w-4 h-4 mr-1" />
                          <span>{item.campus} Campus</span>
                        </div>

                        {item.description && (
                          <p className="text-gray-700 mt-2">{item.description}</p>
                        )}

                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-3">
                          <div className="flex items-center text-sm text-gray-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{item.location}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-1" />
                            <span>{new Date(item.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <User className="w-4 h-4 mr-1" />
                            <span>{item.contactName}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <Phone className="w-4 h-4 mr-1" />
                            <span>{item.contactNumber}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="lost">
            <form onSubmit={(e) => handleSubmit(e, "lost")} className="vnex-card space-y-4">
              <h2 className="text-xl font-semibold mb-2">Report a Lost Item</h2>

              <div>
                <label className="vnex-label">VIT Campus</label>
                <Select value={selectedCampus} onValueChange={setSelectedCampus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select campus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Chennai">VIT Chennai</SelectItem>
                    <SelectItem value="Vellore">VIT Vellore</SelectItem>
                    <SelectItem value="Bhopal">VIT Bhopal</SelectItem>
                    <SelectItem value="Amaravati">VIT Amaravati</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="title" className="vnex-label">Item Name</label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What did you lose?"
                />
              </div>

              <div>
                <label htmlFor="category" className="vnex-label">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="description" className="vnex-label">Description</label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the item in detail (color, brand, etc.)"
                  rows={3}
                />
              </div>

              <div>
                <label htmlFor="location" className="vnex-label">Last Seen Location</label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where did you last see it?"
                />
              </div>

              <div>
                <label htmlFor="date" className="vnex-label">Date Lost</label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className="vnex-label">Upload Image (Optional)</label>
                <div className="mt-2">
                  {previewUrl ? (
                    <div className="relative w-full max-w-md">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded-md shadow-md"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={triggerFileInput}
                        className="flex items-center"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactName" className="vnex-label">Your Name</label>
                  <Input
                    id="contactName"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="contactNumber" className="vnex-label">Contact Number</label>
                  <Input
                    id="contactNumber"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="Enter your contact number"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("browse")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="found">
            <form onSubmit={(e) => handleSubmit(e, "found")} className="vnex-card space-y-4">
              <h2 className="text-xl font-semibold mb-2">Report a Found Item</h2>

              <div>
                <label className="vnex-label">VIT Campus</label>
                <Select value={selectedCampus} onValueChange={setSelectedCampus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select campus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Chennai">VIT Chennai</SelectItem>
                    <SelectItem value="Vellore">VIT Vellore</SelectItem>
                    <SelectItem value="Bhopal">VIT Bhopal</SelectItem>
                    <SelectItem value="Amaravati">VIT Amaravati</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="title-found" className="vnex-label">Item Name</label>
                <Input
                  id="title-found"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What did you find?"
                />
              </div>

              <div>
                <label htmlFor="category-found" className="vnex-label">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label htmlFor="description-found" className="vnex-label">Description</label>
                <Textarea
                  id="description-found"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the item in detail (color, brand, etc.)"
                  rows={3}
                />
              </div>

              <div>
                <label htmlFor="location-found" className="vnex-label">Found Location</label>
                <Input
                  id="location-found"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where did you find it?"
                />
              </div>

              <div>
                <label htmlFor="date-found" className="vnex-label">Date Found</label>
                <Input
                  id="date-found"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <label className="vnex-label">Upload Image (Optional)</label>
                <div className="mt-2">
                  {previewUrl ? (
                    <div className="relative w-full max-w-md">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded-md shadow-md"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={triggerFileInput}
                        className="flex items-center"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactName-found" className="vnex-label">Your Name</label>
                  <Input
                    id="contactName-found"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="contactNumber-found" className="vnex-label">Contact Number</label>
                  <Input
                    id="contactNumber-found"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="Enter your contact number"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("browse")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LostFound;
