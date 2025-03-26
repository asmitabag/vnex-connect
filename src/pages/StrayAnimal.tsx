
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPinOff, Send, User, MapPin, Phone, Calendar, Clock, Building, Camera, Upload } from "lucide-react";
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

const strayAnimalSchema = z.object({
  description: z.string().min(1, "Description is required"),
  location: z.string().min(1, "Location is required"),
  contactName: z.string().min(1, "Contact name is required"),
  contactInfo: z.string().min(1, "Contact information is required"),
});

type StrayAnimalForm = z.infer<typeof strayAnimalSchema>;

const StrayAnimal = () => {
  const { campus } = useProfile();
  const { toast } = useToast();
  const [animals, setAnimals] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<StrayAnimalForm>({
    resolver: zodResolver(strayAnimalSchema),
    defaultValues: {
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

  const onSubmit = async (data: StrayAnimalForm) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAnimals((prev) => [
        ...prev, 
        { 
          ...data, 
          id: Date.now(),
          imageUrl: imagePreview,
          reportedAt: new Date().toISOString()
        }
      ]);
      form.reset();
      setImagePreview(null);
      toast({
        title: "Success",
        description: "Stray animal reported successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to report stray animal.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="vnex-container py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Report Stray Animal</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <div className="flex flex-col items-center justify-center space-y-2">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="Animal preview"
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
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...form.register("description")} placeholder="Describe the animal's condition, breed, color, etc." />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...form.register("location")} placeholder="Where did you find the animal?" />
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Report"}
            </Button>
          </form>
        </Form>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Reported Animals</h2>
          {animals.length === 0 ? (
            <p>No stray animals reported yet.</p>
          ) : (
            <div className="space-y-4">
              {animals.map((animal) => (
                <div key={animal.id} className="vnex-card hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row gap-4">
                    {animal.imageUrl && (
                      <div className="md:w-1/3">
                        <img
                          src={animal.imageUrl}
                          alt="Reported animal"
                          className="w-full h-48 object-cover rounded-md"
                        />
                      </div>
                    )}
                    <div className={animal.imageUrl ? "md:w-2/3" : "w-full"}>
                      <p className="font-medium text-lg mb-2">{animal.description}</p>
                      <div className="space-y-1 text-gray-600">
                        <p className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" /> {animal.location}
                        </p>
                        <p className="flex items-center gap-1">
                          <User className="h-4 w-4" /> {animal.contactName}
                        </p>
                        <p className="flex items-center gap-1">
                          <Phone className="h-4 w-4" /> {animal.contactInfo}
                        </p>
                        <p className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" /> Reported on {new Date(animal.reportedAt).toLocaleDateString()}
                        </p>
                      </div>
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

export default StrayAnimal;
