
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, MapPin, Phone, Calendar, Clock, AlertCircle, Camera, Upload } from "lucide-react";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProfile } from "../contexts/ProfileContext";

const medicalEmergencySchema = z.object({
  patientName: z.string().min(1, "Patient name is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  contactName: z.string().min(1, "Contact name is required"),
  contactInfo: z.string().min(1, "Contact information is required"),
});

type MedicalEmergencyForm = z.infer<typeof medicalEmergencySchema>;

const MedicalEmergency = () => {
  const { campus, profileType } = useProfile();
  const { toast } = useToast();
  const [emergencies, setEmergencies] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<MedicalEmergencyForm>({
    resolver: zodResolver(medicalEmergencySchema),
    defaultValues: {
      patientName: "",
      description: "",
      location: "",
      contactName: "",
      contactInfo: "",
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: MedicalEmergencyForm) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEmergencies((prev) => [
        ...prev, 
        { 
          ...data, 
          id: Date.now(),
          imageUrl: imagePreview,
          reportedAt: new Date().toISOString(),
          status: "Pending",
        }
      ]);
      form.reset();
      setImagePreview(null);
      toast({
        title: "Success",
        description: "Medical emergency reported successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to report medical emergency.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="vnex-container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <AlertCircle className="mr-2 h-8 w-8 text-red-500" />
          Report Medical Emergency
        </h1>
        
        {profileType === 'hospital' ? (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
            <p className="text-blue-700">
              As an Apollo staff member, you can view and respond to medical emergencies reported on campus.
            </p>
          </div>
        ) : (
          <p className="text-gray-600 mb-6">
            Use this form to report medical emergencies involving students, faculty, or staff at VIT. Medical staff will be notified immediately.
          </p>
        )}

        {profileType !== 'hospital' && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormItem>
                <FormLabel>Upload Image (Optional)</FormLabel>
                <div className="flex flex-col items-center justify-center space-y-2">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Emergency situation"
                        className="h-48 w-auto object-cover rounded-md"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setImagePreview(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-8 flex flex-col items-center justify-center">
                      <Camera className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">Take a photo or upload an image</p>
                      <div className="flex gap-2">
                        <Button type="button" size="sm" variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>
                          <Upload className="h-4 w-4 mr-1" /> Upload
                        </Button>
                      </div>
                    </div>
                  )}
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>
              </FormItem>
              <FormItem>
                <FormLabel>Patient Name</FormLabel>
                <FormControl>
                  <Input {...form.register("patientName")} placeholder="Enter patient's name" />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...form.register("description")} placeholder="Describe the emergency situation, symptoms, etc." />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input {...form.register("location")} placeholder="Where is the emergency? (Building, room, etc.)" />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Contact Name</FormLabel>
                <FormControl>
                  <Input {...form.register("contactName")} placeholder="Your name" />
                </FormControl>
                <FormMessage />
              </FormItem>
              <FormItem>
                <FormLabel>Contact Information</FormLabel>
                <FormControl>
                  <Input {...form.register("contactInfo")} placeholder="Your phone number or email" />
                </FormControl>
                <FormMessage />
              </FormItem>
              <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Emergency Report"}
              </Button>
            </form>
          </Form>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Reports</h2>
          {emergencies.length === 0 ? (
            <p>No medical emergencies reported recently.</p>
          ) : (
            <div className="space-y-4">
              {emergencies.map((emergency) => (
                <div key={emergency.id} className="vnex-card hover:shadow-md transition-shadow border-l-4 border-red-500">
                  <div className="flex flex-col md:flex-row gap-4">
                    {emergency.imageUrl && (
                      <div className="md:w-1/3">
                        <img
                          src={emergency.imageUrl}
                          alt="Emergency situation"
                          className="w-full h-48 object-cover rounded-md"
                        />
                      </div>
                    )}
                    <div className={emergency.imageUrl ? "md:w-2/3" : "w-full"}>
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-lg">{emergency.patientName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          emergency.status === "Resolved" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-amber-100 text-amber-800"
                        }`}>
                          {emergency.status}
                        </span>
                      </div>
                      <p className="mt-2">{emergency.description}</p>
                      <div className="mt-3 space-y-1 text-gray-600">
                        <p className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> {emergency.location}
                        </p>
                        <p className="flex items-center gap-1">
                          <User className="h-4 w-4" /> Reported by: {emergency.contactName}
                        </p>
                        <p className="flex items-center gap-1">
                          <Phone className="h-4 w-4" /> {emergency.contactInfo}
                        </p>
                        <p className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" /> Reported on {new Date(emergency.reportedAt).toLocaleDateString()} at {new Date(emergency.reportedAt).toLocaleTimeString()}
                        </p>
                      </div>

                      {profileType === 'hospital' && (
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <Button 
                            variant={emergency.status === "Resolved" ? "outline" : "default"}
                            size="sm"
                            onClick={() => {
                              setEmergencies(prev => 
                                prev.map(e => 
                                  e.id === emergency.id 
                                    ? { ...e, status: e.status === "Pending" ? "Resolved" : "Pending" } 
                                    : e
                                )
                              );
                              toast({
                                title: emergency.status === "Pending" ? "Marked as resolved" : "Marked as pending",
                                description: `Emergency report has been updated.`,
                              });
                            }}
                          >
                            {emergency.status === "Resolved" ? "Mark as Pending" : "Mark as Resolved"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalEmergency;
