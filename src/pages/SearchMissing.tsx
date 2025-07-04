import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, Search, User, MapPin, Calendar, Phone, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface MissingPerson {
  id: number;
  name: string;
  dob: string | null;
  category: string;
  last_known_location: string | null;
  contact_info: string | null;
  description: string | null;
  image_url: string | null;
  status: string;
  is_reunited: boolean;
  reported_at: string;
  created_at: string;
}

const SearchMissing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [ageRange, setAgeRange] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('all');
  const [searchResults, setSearchResults] = useState<MissingPerson[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<MissingPerson | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Load all missing persons initially
    fetchAllMissingPersons();
  }, []);

  const fetchAllMissingPersons = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('missing_persons')
        .select('*')
        .eq('is_reunited', false)
        .order('reported_at', { ascending: false });

      if (error) throw error;
      setSearchResults(data || []);
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

  const handleSearch = async () => {
    setIsLoading(true);
    
    try {
      // Log the search query
      await supabase
        .from('search_queries')
        .insert({
          search_term: searchTerm,
          age_range: ageRange,
          location: location,
          category: category !== 'all' ? category : null
        });

      // Build the search query
      let query = supabase.from('missing_persons').select('*').eq('is_reunited', false);

      if (searchTerm) {
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      if (location) {
        query = query.ilike('last_known_location', `%${location}%`);
      }

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      const { data, error } = await query.order('reported_at', { ascending: false });

      if (error) throw error;

      let filteredData = data || [];

      // Filter by age range if provided
      if (ageRange) {
        const [minAge, maxAge] = ageRange.split('-').map(age => parseInt(age.trim()));
        if (!isNaN(minAge) && !isNaN(maxAge)) {
          filteredData = filteredData.filter(person => {
            if (person.dob) {
              const age = new Date().getFullYear() - new Date(person.dob).getFullYear();
              return age >= minAge && age <= maxAge;
            }
            return false;
          });
        }
      }

      setSearchResults(filteredData);
      
      toast({
        title: "Search completed",
        description: `Found ${filteredData.length} results.`
      });

    } catch (error) {
      console.error('Error performing search:', error);
      toast({
        title: "Search failed",
        description: "Failed to perform search. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const calculateAge = (dob: string | null) => {
    if (!dob) return 'Unknown';
    return new Date().getFullYear() - new Date(dob).getFullYear();
  };

  const formatContactInfo = (contactInfo: string | null) => {
    if (!contactInfo) return null;
    
    const parts = contactInfo.split(', ');
    const contact = {
      name: '',
      phone: '',
      email: ''
    };
    
    parts.forEach(part => {
      if (part.startsWith('Name: ')) contact.name = part.replace('Name: ', '');
      if (part.startsWith('Phone: ')) contact.phone = part.replace('Phone: ', '');
      if (part.startsWith('Email: ')) contact.email = part.replace('Email: ', '');
    });
    
    return contact;
  };

  const showPersonDetails = (person: MissingPerson) => {
    setSelectedPerson(person);
  };

  const closePersonDetails = () => {
    setSelectedPerson(null);
  };

  if (selectedPerson) {
    const contact = formatContactInfo(selectedPerson.contact_info);
    
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
                  <p className="text-sm text-gray-600">Person Details</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={closePersonDetails}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Search
                </Button>
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
          </div>
        </header>

        {/* Person Details */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Section */}
                <div>
                  {selectedPerson.image_url ? (
                    <img
                      src={selectedPerson.image_url}
                      alt={`Photo of ${selectedPerson.name}`}
                      className="w-full h-96 object-cover rounded-lg border"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center border">
                      <div className="text-center">
                        <User className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">No image available</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedPerson.name}</h1>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full font-medium capitalize">
                        {selectedPerson.category}
                      </span>
                      <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                        selectedPerson.status === 'found' ? 'bg-green-100 text-green-800' :
                        selectedPerson.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {selectedPerson.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedPerson.dob && (
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-700">Age</p>
                          <p className="text-gray-600">{calculateAge(selectedPerson.dob)} years old</p>
                        </div>
                      </div>
                    )}

                    {selectedPerson.last_known_location && (
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <div>
                          <p className="font-medium text-gray-700">Last Known Location</p>
                          <p className="text-gray-600">{selectedPerson.last_known_location}</p>
                        </div>
                      </div>
                    )}

                    <div>
                      <p className="font-medium text-gray-700 mb-2">Reported</p>
                      <p className="text-gray-600">{new Date(selectedPerson.reported_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {selectedPerson.description && (
                    <div>
                      <p className="font-medium text-gray-700 mb-2">Description</p>
                      <p className="text-gray-600 leading-relaxed">{selectedPerson.description}</p>
                    </div>
                  )}

                  {contact && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="font-medium text-gray-700 mb-3">Contact Information</p>
                      <div className="space-y-2">
                        {contact.name && (
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-blue-500" />
                            <span className="text-gray-600">{contact.name}</span>
                          </div>
                        )}
                        {contact.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-blue-500" />
                            <span className="text-gray-600">{contact.phone}</span>
                          </div>
                        )}
                        {contact.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-500" />
                            <span className="text-gray-600">{contact.email}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

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
                <p className="text-sm text-gray-600">Search Missing Persons</p>
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
        {/* Search Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Missing Persons Database
            </CardTitle>
            <CardDescription>
              Help us reunite families by searching our database of missing persons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <Label htmlFor="search-name">Name</Label>
                <Input
                  id="search-name"
                  placeholder="Enter name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="age-range">Age Range</Label>
                <Input
                  id="age-range"
                  placeholder="e.g., 5-10, 20-30"
                  value={ageRange}
                  onChange={(e) => setAgeRange(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="City, State"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="woman">Woman</SelectItem>
                    <SelectItem value="senior-citizen">Senior Citizen</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSearch} disabled={isLoading} className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
              <Button variant="outline" onClick={fetchAllMissingPersons} disabled={isLoading}>
                Show All
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {searchResults.length > 0 ? `Found ${searchResults.length} missing person(s)` : 'No results found'}
          </h2>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((person) => (
            <Card key={person.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => showPersonDetails(person)}>
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
                  <div className={`px-2 py-1 rounded text-xs font-medium ${
                    person.status === 'found' ? 'bg-green-100 text-green-800' :
                    person.status === 'investigating' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
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
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
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
                </div>
                
                {person.description && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 line-clamp-2">{person.description}</p>
                  </div>
                )}
                
                <div className="mt-3">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {searchResults.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No missing persons found</h3>
              <p className="text-gray-500">
                Try adjusting your search criteria or browse all missing persons reports.
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

export default SearchMissing;
