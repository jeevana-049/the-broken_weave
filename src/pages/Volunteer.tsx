
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Volunteer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: [] as string[],
    availability: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const skillOptions = [
    { id: 'medical', label: 'Medical/Healthcare' },
    { id: 'counselling', label: 'Counselling/Psychology' },
    { id: 'legal', label: 'Legal Aid' },
    { id: 'education', label: 'Education/Teaching' },
    { id: 'translation', label: 'Translation/Language' },
    { id: 'other', label: 'Other' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('volunteers')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            skills: formData.skills.join(', '),
            availability: formData.availability,
            message: formData.message
          }
        ]);

      if (error) throw error;

      toast({
        title: "Application submitted successfully!",
        description: "Thank you for volunteering. We'll contact you soon."
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        skills: [],
        availability: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting volunteer application:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (skillId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      skills: checked 
        ? [...prev.skills, skillId]
        : prev.skills.filter(skill => skill !== skillId)
    }));
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
                <p className="text-sm text-gray-600">Volunteer</p>
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
          <Users className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Volunteer Team
          </h2>
          <p className="text-lg text-gray-600">
            Make a difference in the lives of families and communities in need.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Volunteer Application</CardTitle>
            <CardDescription>
              Fill out the form below to apply as a volunteer with The Broken Weave.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input 
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input 
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div>
                <Label>Skills & Expertise</Label>
                <div className="mt-2 space-y-2">
                  {skillOptions.map((skill) => (
                    <div key={skill.id} className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        id={skill.id}
                        className="rounded"
                        checked={formData.skills.includes(skill.id)}
                        onChange={(e) => handleSkillChange(skill.id, e.target.checked)}
                      />
                      <label htmlFor={skill.id} className="text-sm">{skill.label}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="availability">Availability</Label>
                <Textarea 
                  id="availability"
                  name="availability"
                  placeholder="Please describe your availability (days, times, frequency, etc.)"
                  rows={3}
                  value={formData.availability}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Label htmlFor="message">Why do you want to volunteer with us?</Label>
                <Textarea 
                  id="message"
                  name="message"
                  placeholder="Tell us about your motivation and how you'd like to help..."
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Volunteer Application'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Volunteer;
