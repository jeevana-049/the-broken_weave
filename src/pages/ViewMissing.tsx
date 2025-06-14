
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, Search, User, MapPin, Calendar, Filter } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MissingPerson {
  id: number;
  name: string;
  dob: string;
  category: string;
  last_known_location: string;
  description: string;
  contact_info: string;
  status: string;
  image_url: string;
  reported_at: string;
}

const ViewMissing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [missingPersons, setMissingPersons] = useState<MissingPerson[]>([]);
  const [filteredPersons, setFilteredPersons] = useState<MissingPerson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    category: 'all',
    status: 'all',
    location: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMissingPersons();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, missingPersons]);

  const fetchMissingPersons = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('missing_persons')
        .select('*')
        .order('reported_at', { ascending: false });

      if (error) throw error;
      setMissingPersons(data || []);
    } catch (error) {
      console.error('Error fetching missing persons:', error);
      toast({
        title: "Error",
        description: "Failed to fetch missing persons data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...missingPersons];

    if (filters.search) {
      filtered = filtered.filter(person =>
        person.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        person.description?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category !== 'all') {
      filtered = filtered.filter(person => person.category === filters.category);
    }

    if (filters.status !== 'all') {
      filtered = filtered.filter(person => person.status === filters.status);
    }

    if (filters.location) {
      filtered = filtered.filter(person =>
        person.last_known_location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    setFilteredPersons(filtered);
  };

  const calculateAge = (dob: string) => {
    if (!dob) return 'Unknown';
    return new Date().getFullYear() - new Date(dob).getFullYear();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'found': return 'bg-green-100 text-green-800';
      case 'investigating': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-red-100 text-red-800';
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
                <p className="text-sm text-gray-600">View Missing Persons</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => navigate('/home')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filter Missing Persons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="search">Search by Name</Label>
                <Input
                  id="search"
                  placeholder="Enter name"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="woman">Woman</SelectItem>
                    <SelectItem value="senior">Senior Citizen</SelectItem>
                    <SelectItem value="unknown">Unknown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="missing">Missing</SelectItem>
                    <SelectItem value="investigating">Investigating</SelectItem>
                    <SelectItem value="found">Found</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter location"
                  value={filters.location}
                  onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {filteredPersons.length > 0 ? `${filteredPersons.length} Missing Person(s) Found` : 'No results found'}
          </h2>
        </div>

        {/* Results Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPersons.map((person) => (
              <Card key={person.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {person.name}
                      </CardTitle>
                      <CardDescription className="capitalize">
                        {person.category} | Age: {calculateAge(person.dob)}
                      </CardDescription>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(person.status)}`}>
                      {person.status}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {person.image_url && (
                    <div className="mb-3">
                      <img 
                        src={person.image_url} 
                        alt={person.name}
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span><strong>Last seen:</strong> {person.last_known_location || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span><strong>Reported:</strong> {new Date(person.reported_at).toLocaleDateString()}</span>
                    </div>
                    {person.contact_info && (
                      <p><strong>Contact:</strong> {person.contact_info}</p>
                    )}
                  </div>
                  
                  {person.description && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-700"><strong>Description:</strong></p>
                      <p className="text-sm text-gray-600 mt-1">{person.description}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {filteredPersons.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No missing persons found</h3>
              <p className="text-gray-500">
                Try adjusting your filters or check back later for updates.
              </p>
            </div>
          </div>
        )}

        {/* Help Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to Help</CardTitle>
            <CardDescription>
              If you have information about any missing person
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Report Information</h4>
                <p className="text-sm text-gray-600">
                  If you have any information about a missing person, please contact the provided contact information or local authorities immediately.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Emergency</h4>
                <p className="text-sm text-gray-600">
                  For immediate assistance or emergencies, call 100 (Police) or contact our helpline.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ViewMissing;
