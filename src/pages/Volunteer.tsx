
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, Users } from "lucide-react";

const Volunteer = () => {
  const navigate = useNavigate();

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
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="volunteer-name">Full Name *</Label>
                  <Input id="volunteer-name" placeholder="Enter your full name" required />
                </div>
                <div>
                  <Label htmlFor="volunteer-email">Email *</Label>
                  <Input id="volunteer-email" type="email" placeholder="Enter your email" required />
                </div>
              </div>
              
              <div>
                <Label htmlFor="volunteer-phone">Phone Number *</Label>
                <Input id="volunteer-phone" type="tel" placeholder="Enter your phone number" required />
              </div>

              <div>
                <Label htmlFor="volunteer-skills">Skills & Expertise</Label>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="medical" className="rounded" />
                    <label htmlFor="medical" className="text-sm">Medical/Healthcare</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="counselling" className="rounded" />
                    <label htmlFor="counselling" className="text-sm">Counselling/Psychology</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="legal" className="rounded" />
                    <label htmlFor="legal" className="text-sm">Legal Aid</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="education" className="rounded" />
                    <label htmlFor="education" className="text-sm">Education/Teaching</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="translation" className="rounded" />
                    <label htmlFor="translation" className="text-sm">Translation/Language</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="other-skills" className="rounded" />
                    <label htmlFor="other-skills" className="text-sm">Other</label>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="volunteer-availability">Availability</Label>
                <Textarea 
                  id="volunteer-availability" 
                  placeholder="Please describe your availability (days, times, frequency, etc.)"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="volunteer-motivation">Why do you want to volunteer with us?</Label>
                <Textarea 
                  id="volunteer-motivation" 
                  placeholder="Tell us about your motivation and how you'd like to help..."
                  rows={4}
                />
              </div>

              <Button className="w-full" size="lg">
                Submit Volunteer Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Volunteer;
