
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, Search, MapPin, Calendar, User, Phone, Mail, Eye, Filter } from "lucide-react";
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

const ViewMissing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [missingPersons, setMissingPersons] = useState<MissingPerson[]>([]);
  const [filteredPersons, setFilteredPersons] = useState<MissingPerson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchMissingPersons();
  }, []);

  useEffect(() => {
    filterPersons();
  }, [missingPersons, searchTerm, categoryFilter, locationFilter]);

  const fetchMissingPersons = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('missing_persons')
        .select('*')
        .eq('is_reunited', false)
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

  const filterPersons = () => {
    let filtered = missingPersons;

    if (searchTerm) {
      filtered = filtered.filter(person =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        person.last_known_location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter) {
      filtered = filtered.filter(person => person.category === categoryFilter);
    }

    if (locationFilter) {
      filtered = filtered.filter(person =>
        person.last_known_location?.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    setFilteredPersons(filtered);
  };

  const logSearch = async () => {
    if (searchTerm.trim()) {
      try {
        await supabase
          .from('search_queries')
          .insert({
            search_term: searchTerm,
            category: categoryFilter || null,
            location: locationFilter || null
          });
      } catch (error) {
        console.error('Error logging search:', error);
      }
    }
  };

  const handleSearch = () => {
    logSearch();
    filterPersons();
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
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

  const renderImage = (person: MissingPerson) => {
    console.log(`Rendering image for ${person.name}, URL: ${person.image_url}`);
    
    if (person.image_url && person.image_url.trim() !== '') {
      return (
        <div className="w-full h-64 mb-4">
          <img
            src={person.image_url}
            alt={`Photo of ${person.name}`}
            className="w-full h-full object-cover rounded-lg"
            onLoad={() => console.log(`Image loaded successfully for ${person.name}`)}
            onError={(e) => {
              console.error(`Failed to load image for ${person.name}:`, person.image_url);
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const placeholder = target.nextElementSibling as HTMLElement;
              if (placeholder) {
                placeholder.style.display = 'flex';
              }
            }}
          />
          <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center" style={{ display: 'none' }}>
            <div className="text-center">
              <User className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">Image failed to load</p>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-500 text-sm">No photo available</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500 rounded-full">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  The Broken Weave
                </h1>
                <p className="text-sm text-gray-600">Missing Persons Database</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                window.scrollTo(0, 0);
                navigate('/dashboard');
              }}
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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Missing Persons Database
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Search through our database to help reunite families. Every search helps spread awareness.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border border-gray-200 shadow-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search Missing Persons
              </CardTitle>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, description, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-lg py-3"
                />
              </div>
              <Button 
                onClick={handleSearch}
                className="px-8"
              >
                Search
              </Button>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Categories</option>
                    <option value="child">Child</option>
                    <option value="woman">Woman</option>
                    <option value="senior-citizen">Senior Citizen</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="Filter by location..."
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-4 text-gray-600">Loading missing persons data...</p>
          </div>
        ) : filteredPersons.length === 0 ? (
          <Card className="text-center py-12 border border-gray-200 shadow-sm">
            <CardContent>
              <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Results Found</h3>
              <p className="text-gray-600">
                {searchTerm || categoryFilter || locationFilter
                  ? "Try adjusting your search criteria"
                  : "No missing persons currently in database"
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-lg font-medium text-gray-700">
                Found {filteredPersons.length} missing person(s)
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPersons.map((person) => {
                const contact = formatContactInfo(person.contact_info);
                return (
                  <Card key={person.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      {renderImage(person)}
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold text-gray-800">{person.name}</h3>
                          <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full font-medium">
                            {person.category}
                          </span>
                        </div>

                        {person.dob && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">Born: {new Date(person.dob).toLocaleDateString()}</span>
                          </div>
                        )}

                        {person.last_known_location && (
                          <div className="flex items-center gap-2 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{person.last_known_location}</span>
                          </div>
                        )}

                        {person.description && (
                          <div className="bg-gray-50 rounded-lg p-3">
                            <p className="text-sm text-gray-700 line-clamp-3">{person.description}</p>
                          </div>
                        )}

                        {contact && (
                          <div className="border-t pt-3">
                            <p className="text-sm font-medium text-gray-700 mb-2">Contact Information:</p>
                            <div className="space-y-1">
                              {contact.name && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <User className="w-3 h-3" />
                                  <span>{contact.name}</span>
                                </div>
                              )}
                              {contact.phone && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Phone className="w-3 h-3" />
                                  <span>{contact.phone}</span>
                                </div>
                              )}
                              {contact.email && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Mail className="w-3 h-3" />
                                  <span>{contact.email}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                        <div className="border-t pt-3">
                          <p className="text-xs text-gray-500">
                            Reported {getTimeAgo(person.reported_at)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {/* Call to Action */}
        <Card className="mt-12 border border-gray-200 shadow-sm bg-blue-500 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Have Information?</h3>
            <p className="text-blue-100 mb-6">
              If you have any information about a missing person, please contact the authorities or the contact person listed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" onClick={() => {
                window.scrollTo(0, 0);
                navigate('/report-missing');
              }}>
                Report a Missing Person
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                Emergency: Call 100
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ViewMissing;
