
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FileText,
  Heart,
  Search,
  Shield,
  Users,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface SuccessStory {
  id: number;
  title: string;
  description: string;
  content: string;
}

const Index = () => {
  const navigate = useNavigate();
  const [isGuest, setIsGuest] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const guestStatus = localStorage.getItem('isGuest') === 'true';
    const userData = localStorage.getItem('user');
    setIsGuest(guestStatus);
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    // Fetch success stories
    fetchSuccessStories();
  }, []);

  const fetchSuccessStories = async () => {
    try {
      const { data, error } = await supabase
        .from('success_stories')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setSuccessStories(data || []);
    } catch (error) {
      console.error('Error fetching success stories:', error);
    }
  };

  const handleGetStarted = () => {
    if (isGuest) {
      alert('Please register or login to access full features');
      return;
    }
    navigate('/dashboard');
  };

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      navigate(`/search-missing?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/search-missing');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isGuest');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500 rounded-full">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">The Broken Weave</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="#search" className="text-gray-700 hover:text-blue-600">Search</a>
              <a href="#view" className="text-gray-700 hover:text-blue-600">View Missing</a>
              <a href="#resources" className="text-gray-700 hover:text-blue-600">Resources</a>
              <a href="#stories" className="text-gray-700 hover:text-blue-600">Stories</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
            </div>
            <div className="flex gap-2">
              {user || isGuest ? (
                <>
                  {isGuest && (
                    <span className="text-sm text-gray-600 py-2 px-3">Guest Mode</span>
                  )}
                  {!isGuest && (
                    <Button onClick={() => navigate('/dashboard')}>
                      Dashboard
                    </Button>
                  )}
                  <Button variant="outline" onClick={handleLogout}>
                    {isGuest ? 'Login' : 'Logout'}
                  </Button>
                </>
              ) : (
                <Button onClick={() => navigate('/')}>
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Reuniting Families, Rebuilding Hope
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Supporting children, women, and senior citizens affected by communal unrest. 
            Together, we can heal the broken weave of our communities.
          </p>
          <Button size="lg" className="text-lg px-8 py-3" onClick={handleGetStarted}>
            {isGuest ? 'View Information' : 'Get Started'}
          </Button>
          {isGuest && (
            <p className="text-sm text-gray-500 mt-2">
              Register to access full features and contribute
            </p>
          )}
        </div>
      </section>

      {/* Search Section */}
      <section id="search" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Search Missing Persons Database
          </h2>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="search-name">Name</Label>
                  <Input 
                    id="search-name" 
                    placeholder="Enter name to search" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearchClick()}
                  />
                </div>
                <Button className="w-full" onClick={handleSearchClick}>
                  <Search className="w-4 h-4 mr-2" />
                  Search Database
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* View Missing Section */}
      <section id="view" className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            View Missing Persons
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Browse through our comprehensive database of missing persons and help us reunite families.
          </p>
          <Card className="max-w-md mx-auto">
            <CardContent className="p-6">
              <Button 
                onClick={() => navigate('/view-missing')} 
                className="w-full flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View All Missing Persons
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Resources & Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/emergency-helplines')}>
              <CardHeader>
                <Shield className="w-12 h-12 text-blue-500 mb-4" />
                <CardTitle>Emergency Helplines</CardTitle>
                <CardDescription>
                  24/7 support for immediate assistance and crisis intervention
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/legal-aid')}>
              <CardHeader>
                <FileText className="w-12 h-12 text-green-500 mb-4" />
                <CardTitle>Legal Aid</CardTitle>
                <CardDescription>
                  Free legal assistance and guidance for affected families
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/counselling-services')}>
              <CardHeader>
                <Users className="w-12 h-12 text-purple-500 mb-4" />
                <CardTitle>Counselling Services</CardTitle>
                <CardDescription>
                  Professional counseling and emotional support programs
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="stories" className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {successStories.length > 0 ? (
              successStories.map((story, index) => (
                <Card key={story.id} className="bg-white hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">{story.title}</CardTitle>
                    <CardDescription>{story.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{story.content}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Default stories if none in database
              <>
                <Card className="bg-white hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">A Mother's Reunion</CardTitle>
                    <CardDescription>After years of separation, a mother and her child are reunited.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      "I had lost all hope, but The Broken Weave never gave up. Today, I hold my child in my arms again."
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">Elderly Woman Finds Safety</CardTitle>
                    <CardDescription>A senior citizen displaced by unrest finds a new home and community.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      "I was alone and scared, but The Broken Weave provided me with shelter, care, and a sense of belonging."
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold">A Child's Education Restored</CardTitle>
                    <CardDescription>A young boy's education is restarted after losing everything in the conflict.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      "I thought my dreams were over, but The Broken Weave gave me the chance to learn again and build a future."
                    </p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Educational Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Understanding Communal Unrest
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Causes and Consequences
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Communal unrest often stems from deep-seated social, economic, and political issues.
                It leads to displacement, loss of life, and long-term trauma for affected communities.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                How to Promote Peace
              </h3>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                <li>Education and awareness</li>
                <li>Dialogue and reconciliation</li>
                <li>Support for affected communities</li>
                <li>Advocacy for policy changes</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Get in Touch
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Have questions or need assistance? Reach out to us using the contact form or the
                details below.
              </p>
              <ul className="mt-4">
                <li className="mb-2">
                  <strong>Email:</strong> <a href="mailto:info@brokenweave.org" className="text-blue-500">info@brokenweave.org</a>
                </li>
                <li>
                  <strong>Phone:</strong> +91-XXXX-XXXX
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Form
              </h3>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="contact-name">Name</Label>
                  <Input id="contact-name" placeholder="Your Name" />
                </div>
                <div>
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" placeholder="Your Email" />
                </div>
                <div>
                  <Label htmlFor="contact-message">Message</Label>
                  <textarea id="contact-message" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Your Message" rows={4}></textarea>
                </div>
                <Button className="w-full" disabled={isGuest}>
                  {isGuest ? 'Login Required to Send' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg mb-4">
            The Broken Weave - Reuniting Families, Rebuilding Hope
          </p>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} The Broken Weave Organization. All rights reserved.
          </p>
          <div className="mt-4">
            <a href="#" className="text-gray-400 hover:text-white mx-2">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white mx-2">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
