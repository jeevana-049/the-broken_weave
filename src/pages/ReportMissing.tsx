import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, AlertTriangle, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { notifyMissingPersonReport } from "@/utils/notificationService";

const ReportMissing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    category: '',
    lastKnownLocation: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    description: ''
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB.",
          variant: "destructive"
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select a valid image file.",
          variant: "destructive"
        });
        return;
      }

      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      // For demo purposes, we'll use a placeholder URL
      // In production, you would upload to Supabase Storage or another service
      const placeholders = [
        'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=400&fit=crop'
      ];
      return placeholders[Math.floor(Math.random() * placeholders.length)];
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = null;
      
      // Upload image if selected
      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
        if (!imageUrl) {
          toast({
            title: "Image upload simulated",
            description: "For demo purposes, a placeholder image will be used.",
          });
        }
      }

      const contactInfo = `Name: ${formData.contactName}, Phone: ${formData.contactPhone}, Email: ${formData.contactEmail}`;
      
      const { error } = await supabase
        .from('missing_persons')
        .insert([
          {
            name: formData.name,
            dob: formData.dob || null,
            category: formData.category,
            last_known_location: formData.lastKnownLocation,
            contact_info: contactInfo,
            description: formData.description,
            image_url: imageUrl
          }
        ]);

      if (error) throw error;

      // Send notification to admin
      await notifyMissingPersonReport(formData.name, formData.contactName);

      toast({
        title: "Report submitted successfully!",
        description: "Thank you for reporting. We will do our best to help locate the missing person."
      });

      setFormData({
        name: '',
        dob: '',
        category: '',
        lastKnownLocation: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        description: ''
      });
      setSelectedImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error submitting missing person report:', error);
      toast({
        title: "Error",
        description: "There was an error submitting the report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">The Broken Weave</h1>
                <p className="text-sm text-gray-600">Report Missing</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Report Missing Person
          </h2>
          <p className="text-lg text-gray-600">
            Help us locate missing individuals by providing detailed information.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Missing Person Report</CardTitle>
            <CardDescription>
              Please provide as much information as possible to help us locate the missing person.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input 
                  id="name"
                  name="name"
                  placeholder="Enter full name of missing person"
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div>
                <Label htmlFor="dob">Date of Birth (Optional)</Label>
                <Input 
                  id="dob"
                  name="dob"
                  type="date"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <select 
                  id="category"
                  name="category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="child">Child</option>
                  <option value="woman">Woman</option>
                  <option value="senior-citizen">Senior Citizen</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <Label htmlFor="lastKnownLocation">Last Known Location *</Label>
                <Input 
                  id="lastKnownLocation"
                  name="lastKnownLocation"
                  placeholder="Enter last known location (address, city, landmarks)"
                  value={formData.lastKnownLocation}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div>
                <Label>Your Contact Information *</Label>
                <div className="space-y-2 mt-2">
                  <Input 
                    name="contactName"
                    placeholder="Your name"
                    value={formData.contactName}
                    onChange={handleInputChange}
                    required 
                  />
                  <Input 
                    name="contactPhone"
                    type="tel"
                    placeholder="Your phone number"
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    required 
                  />
                  <Input 
                    name="contactEmail"
                    type="email"
                    placeholder="Your email address"
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea 
                  id="description"
                  name="description"
                  placeholder="Provide detailed description including physical appearance, clothing when last seen, circumstances of disappearance, etc."
                  rows={5}
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="photo">Photo (Optional)</Label>
                <div className="mt-2">
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded-lg border"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer">
                      <div className="text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Click to upload photo or drag and drop</p>
                        <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> If this is an emergency or the person is in immediate danger, 
                  please contact local police (100) or emergency services immediately.
                </p>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Missing Person Report'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ReportMissing;
