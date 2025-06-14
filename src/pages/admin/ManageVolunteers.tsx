
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, Search, Mail, Phone, User, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ManageVolunteers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [volunteers, setVolunteers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    checkAdminAccess();
    fetchVolunteers();
  }, []);

  const checkAdminAccess = () => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    
    const user = JSON.parse(userData);
    if (!user.is_admin) {
      navigate('/dashboard');
      return;
    }
  };

  const fetchVolunteers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('volunteers')
        .select('*')
        .order('registered_at', { ascending: false });

      if (error) throw error;
      setVolunteers(data || []);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
      toast({
        title: "Error",
        description: "Failed to fetch volunteers.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredVolunteers = volunteers.filter(volunteer =>
    volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (volunteer.email && volunteer.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (volunteer.skills && volunteer.skills.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
                <p className="text-sm text-gray-600">Manage Volunteers</p>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Volunteer Management</h2>
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search volunteers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={fetchVolunteers} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Refresh'}
            </Button>
          </div>
        </div>

        {/* Volunteers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVolunteers.map((volunteer) => (
            <Card key={volunteer.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {volunteer.name}
                    </CardTitle>
                    <CardDescription>
                      Registered: {new Date(volunteer.registered_at).toLocaleDateString()}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {volunteer.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{volunteer.email}</span>
                    </div>
                  )}
                  
                  {volunteer.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700">{volunteer.phone}</span>
                    </div>
                  )}
                  
                  {volunteer.availability && (
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-700"><strong>Available:</strong> {volunteer.availability}</span>
                    </div>
                  )}
                  
                  {volunteer.skills && (
                    <div className="text-sm">
                      <p className="font-medium text-gray-900 mb-1">Skills:</p>
                      <p className="text-gray-700">{volunteer.skills}</p>
                    </div>
                  )}
                  
                  {volunteer.message && (
                    <div className="text-sm">
                      <p className="font-medium text-gray-900 mb-1">Message:</p>
                      <p className="text-gray-700 line-clamp-3">{volunteer.message}</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex gap-2">
                  {volunteer.email && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`mailto:${volunteer.email}`, '_blank')}
                      className="flex-1"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                  )}
                  
                  {volunteer.phone && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`tel:${volunteer.phone}`, '_blank')}
                      className="flex-1"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredVolunteers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm ? 'No volunteers found matching your search.' : 'No volunteers found.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageVolunteers;
