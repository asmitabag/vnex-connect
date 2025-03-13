import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPinOff, Send, User, MapPin, Phone, Calendar, Clock, Building } from "lucide-react";
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
  name: z.string().min(1, "Name is required"),
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

  const form = useForm<StrayAnimalForm>({
    resolver: zodResolver(strayAnimalSchema),
    defaultValues: {
      name: "",
      description: "",
      location: "",
      contactName: "",
      contactInfo: "",
    },
  });

  const onSubmit = async (data: StrayAnimalForm) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAnimals((prev) => [...prev, { ...data, id: Date.now() }]);
      form.reset();
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
              <FormLabel>Name of the Animal</FormLabel>
              <FormControl>
                <Input {...form.register("name")} />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...form.register("description")} />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...form.register("location")} />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>Contact Name</FormLabel>
              <FormControl>
                <Input {...form.register("contactName")} />
              </FormControl>
              <FormMessage />
            </FormItem>
            <FormItem>
              <FormLabel>Contact Information</FormLabel>
              <FormControl>
                <Input {...form.register("contactInfo")} />
              </FormControl>
              <FormMessage />
            </FormItem>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Reported Animals</h2>
          {animals.length === 0 ? (
            <p>No stray animals reported yet.</p>
          ) : (
            <ul className="space-y-4">
              {animals.map((animal) => (
                <li key={animal.id} className="border p-4 rounded-md">
                  <h3 className="font-semibold">{animal.name}</h3>
                  <p>{animal.description}</p>
                  <p>
                    <MapPin className="inline" /> {animal.location}
                  </p>
                  <p>
                    <User className="inline" /> {animal.contactName} -{" "}
                    <Phone className="inline" /> {animal.contactInfo}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default StrayAnimal;
