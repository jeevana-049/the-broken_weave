
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, AlertTriangle, Upload } from "lucide-react";

const ReportMissing = () => {
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
            <form className="space-y-6">
              <div>
                <Label htmlFor="missing-name">Full Name *</Label>
                <Input id="missing-name" placeholder="Enter full name of missing person" required />
              </div>

              <div>
                <Label htmlFor="missing-dob">Date of Birth (Optional)</Label>
                <Input id="missing-dob" type="date" />
              </div>

              <div>
                <Label htmlFor="missing-category">Category *</Label>
                <select 
                  id="missing-category" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                <Label htmlFor="missing-location">Last Known Location *</Label>
                <Input 
                  id="missing-location" 
                  placeholder="Enter last known location (address, city, landmarks)" 
                  required 
                />
              </div>

              <div>
                <Label htmlFor="missing-contact">Your Contact Information *</Label>
                <div className="space-y-2">
                  <Input placeholder="Your name" required />
                  <Input type="tel" placeholder="Your phone number" required />
                  <Input type="email" placeholder="Your email address" required />
                </div>
              </div>

              <div>
                <Label htmlFor="missing-description">Description *</Label>
                <Textarea 
                  id="missing-description" 
                  placeholder="Provide detailed description including physical appearance, clothing when last seen, circumstances of disappearance, etc."
                  rows={5}
                  required
                />
              </div>

              <div>
                <Label htmlFor="missing-photo">Photo (Optional)</Label>
                <div className="mt-2">
                  <div className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Click to upload photo or drag and drop</p>
                      <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> If this is an emergency or the person is in immediate danger, 
                  please contact local police (100) or emergency services immediately.
                </p>
              </div>

              <Button className="w-full" size="lg">
                Submit Missing Person Report
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ReportMissing;
