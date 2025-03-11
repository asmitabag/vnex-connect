import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { 
  Car, 
  Plus, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Building,
  Trash2 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CabShare {
  id: string;
  name: string;
  contact: string;
  destination: string;
  date: string;
  time: string;
  capacity: number;
  campus: string;
  createdAt: string;
}

const CabPartner = () => {
  const { toast } = useToast();
  const [cabShares, setCabShares] = useState<CabShare[]>([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [capacity, setCapacity] = useState("1");
  const [campus, setCampus] = useState("Chennai");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !contact.trim() || !destination.trim() || !date || !time) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const newCabShare: CabShare = {
      id: uuidv4(),
      name,
      contact,
      destination,
      date,
      time,
      capacity: parseInt(capacity),
      campus,
      createdAt: new Date().toISOString(),
    };

    setCabShares((prev) => [...prev, newCabShare]);

    setName("");
    setContact("");
    setDestination("");
    setDate("");
    setTime("");
    setCapacity("1");
    setIsSubmitting(false);

    toast({
      title: "Success",
      description: "Your cab sharing request has been posted!",
    });
  };

  const handleDelete = (id: string) => {
    setCabShares((prev) => prev.filter((share) => share.id !== id));
    toast({
      title: "Deleted",
      description: "Your cab sharing request has been removed",
    });
  };

  const sortedCabShares = [...cabShares].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="vnex-container py-8">
      <h1 className="vnex-heading">Cab Partner Finder</h1>
      <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
        Find cab sharing partners for airport/railway station trips and reduce your travel costs.
        Post your trip details and connect with others traveling on the same day.
      </p>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="vnex-card space-y-4">
              <h2 className="text-xl font-semibold mb-2">Post a Cab Share</h2>

              <div>
                <label className="vnex-label">VIT Campus</label>
                <Select value={campus} onValueChange={setCampus}>
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
                <label htmlFor="name" className="vnex-label">Your Name</label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="contact" className="vnex-label">Contact Number</label>
                <Input
                  id="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Enter your contact number"
                />
              </div>

              <div>
                <label htmlFor="destination" className="vnex-label">Destination</label>
                <Input
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g., Airport, Railway Station, etc."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="vnex-label">Date</label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <label htmlFor="time" className="vnex-label">Time</label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="capacity" className="vnex-label">Number of People</label>
                <Select value={capacity} onValueChange={setCapacity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select capacity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Person</SelectItem>
                    <SelectItem value="2">2 People</SelectItem>
                    <SelectItem value="3">3 People</SelectItem>
                    <SelectItem value="4">4 People</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Posting..." : "Post Cab Share"}
              </Button>
            </form>
          </div>

          <div className="md:col-span-3">
            <div className="vnex-card">
              <h2 className="text-xl font-semibold mb-4">Available Cab Shares</h2>
              
              {sortedCabShares.length === 0 ? (
                <div className="text-center py-8">
                  <Car className="w-12 h-12 mx-auto text-gray-400" />
                  <p className="mt-2 text-gray-500">No cab shares available yet. Be the first to post!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedCabShares.map((share) => (
                    <div
                      key={share.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                    >
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-primary-600" />
                            <span className="text-sm font-medium">{share.campus}</span>
                          </div>
                          <h3 className="font-medium mt-1">{share.destination}</h3>
                        </div>
                        <button
                          onClick={() => handleDelete(share.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                          title="Delete listing"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{new Date(share.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{share.time}</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <User className="w-4 h-4 mr-1" />
                          <span>{share.name}</span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Phone className="w-4 h-4 mr-1" />
                          <span>{share.contact}</span>
                        </div>
                      </div>
                      
                      <div className="mt-2 text-sm">
                        <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded-full">
                          {share.capacity} {share.capacity === 1 ? "person" : "people"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CabPartner;
