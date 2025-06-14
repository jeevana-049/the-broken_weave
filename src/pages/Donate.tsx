
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, CreditCard, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { createAdminNotification } from "@/utils/notificationService";

const Donate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('donations')
        .insert([formData]);

      if (error) throw error;

      // Create admin notification
      await createAdminNotification({
        title: 'New Donation Received',
        message: `${formData.name} (${formData.email}) made a donation`,
        type: 'donation'
      });

      toast({
        title: "Thank you for your donation!",
        description: "Your support helps us reunite families and rebuild communities."
      });

      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting donation:', error);
      toast({
        title: "Error",
        description: "Failed to process donation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
                <p className="text-sm text-gray-600">Make a Donation</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Support Our Mission
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your donation helps us reunite families, support vulnerable communities, 
            and provide essential services to those affected by communal unrest.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Donation Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-6 h-6" />
                Donation Details
              </CardTitle>
              <CardDescription>
                Your contribution makes a real difference in people's lives.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Share why you're supporting our cause..."
                    rows={3}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Processing...' : 'Continue to Payment'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Impact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-medium">₹500</h4>
                      <p className="text-sm text-gray-600">Provides emergency supplies for one family</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-medium">₹1,000</h4>
                      <p className="text-sm text-gray-600">Funds search operations for missing persons</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-purple-500 mt-1" />
                    <div>
                      <h4 className="font-medium">₹2,500</h4>
                      <p className="text-sm text-gray-600">Supports counseling services for trauma victims</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ways to Donate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    <strong>Online:</strong> Secure payment through our website
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Bank Transfer:</strong> Direct transfer to our organization account
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Check:</strong> Mail checks to our registered address
                  </p>
                  <p className="text-xs text-gray-500 mt-4">
                    All donations are tax-deductible under Section 80G of the Income Tax Act.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Donate;
