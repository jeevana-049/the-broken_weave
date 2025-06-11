import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Heart, Shield, Users, Phone, MapPin, Clock, ArrowRight, CheckCircle, BookOpen, AlertCircle } from "lucide-react";
import { useState } from "react";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const successStories = [
    {
      id: 1,
      name: "Priya Sharma",
      age: 8,
      location: "Mumbai",
      reunited: "2 days ago",
      story: "Reunited with family after 5 days of coordinated search efforts."
    },
    {
      id: 2,
      name: "Ramesh Kumar",
      age: 72,
      location: "Delhi",
      reunited: "1 week ago", 
      story: "Found safe at a local shelter and reunited with his daughter."
    },
    {
      id: 3,
      name: "Sunita Devi",
      age: 34,
      location: "Kolkata",
      reunited: "3 days ago",
      story: "Located through our network and safely returned to her family."
    }
  ];

  const resources = [
    {
      title: "Emergency Helplines",
      description: "24/7 support for immediate assistance",
      icon: Phone,
      type: "urgent"
    },
    {
      title: "Legal Aid Services",
      description: "Free legal consultation and support",
      icon: Shield,
      type: "support"
    },
    {
      title: "Counselling Support",
      description: "Emotional and psychological support services",
      icon: Heart,
      type: "support"
    },
    {
      title: "Educational Programs",
      description: "Skill-building and empowerment workshops",
      icon: BookOpen,
      type: "education"
    }
  ];

  const stats = [
    { number: "2,847", label: "Children Reunited", icon: Users },
    { number: "1,423", label: "Women Supported", icon: Heart },
    { number: "892", label: "Senior Citizens Found", icon: Shield },
    { number: "24/7", label: "Support Available", icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">The Broken Weave</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#search" className="text-foreground/80 hover:text-foreground transition-colors">Search</a>
              <a href="#resources" className="text-foreground/80 hover:text-foreground transition-colors">Resources</a>
              <a href="#stories" className="text-foreground/80 hover:text-foreground transition-colors">Success Stories</a>
              <a href="#contact" className="text-foreground/80 hover:text-foreground transition-colors">Contact</a>
              <Button variant="default">Report Missing</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="outline" className="mb-6 text-sm">
            <AlertCircle className="w-4 h-4 mr-2" />
            Supporting Vulnerable Communities Since 2020
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
            Reuniting Families,
            <span className="text-primary block">Rebuilding Hope</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Dedicated to supporting children, women, and senior citizens affected by communal unrest. 
            Together, we weave back the broken threads of our communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6">
              <Search className="mr-2 h-5 w-5" />
              Search Missing Persons
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Get Support Now
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section id="search" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Search Missing Persons</h2>
            <p className="text-lg text-muted-foreground">
              Search our comprehensive database to find information about missing children, women, and senior citizens.
            </p>
          </div>
          
          <Card className="p-8 shadow-lg border-2">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Enter name, location, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
              </div>
              <Button size="lg" className="h-12 px-8">
                Search Database
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>2,847 Children</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4" />
                <span>1,423 Women</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>892 Senior Citizens</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Success Stories */}
      <section id="stories" className="py-20 px-4 bg-secondary/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Recent Success Stories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Every reunion brings hope. Here are some recent families we've helped reunite.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story) => (
              <Card key={story.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{story.name}</CardTitle>
                    <Badge variant="secondary">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Reunited
                    </Badge>
                  </div>
                  <CardDescription>
                    Age {story.age} • {story.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{story.story}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-2" />
                    {story.reunited}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-foreground">Support Resources</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive support services for families, women, and senior citizens in need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    resource.type === 'urgent' ? 'bg-destructive/10' :
                    resource.type === 'support' ? 'bg-primary/10' : 'bg-secondary/50'
                  }`}>
                    <resource.icon className={`h-8 w-8 ${
                      resource.type === 'urgent' ? 'text-destructive' :
                      resource.type === 'support' ? 'text-primary' : 'text-foreground'
                    }`} />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-4">
                    {resource.description}
                  </CardDescription>
                  <Button variant="outline" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Need Immediate Help?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our support team is available 24/7 to assist you in your time of need.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <div className="flex items-center justify-center mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Emergency Helpline</h3>
              <p className="text-2xl font-bold text-primary mb-2">1800-WEAVE-HELP</p>
              <p className="text-muted-foreground">Available 24/7 for immediate assistance</p>
            </Card>
            
            <Card className="p-6">
              <div className="flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Report Missing Person</h3>
              <Button size="lg" className="w-full">
                Submit Report
              </Button>
              <p className="text-muted-foreground mt-2">Start the search process immediately</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold text-primary">The Broken Weave</span>
              </div>
              <p className="text-muted-foreground">
                Dedicated to reuniting families and supporting vulnerable communities during times of unrest.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#search" className="hover:text-foreground transition-colors">Search Database</a></li>
                <li><a href="#resources" className="hover:text-foreground transition-colors">Resources</a></li>
                <li><a href="#stories" className="hover:text-foreground transition-colors">Success Stories</a></li>
                <li><a href="#contact" className="hover:text-foreground transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Emergency Helpline</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Legal Aid</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Counselling</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Educational Programs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Contact Info</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Emergency: 1800-WEAVE-HELP</li>
                <li>Email: support@brokenweave.org</li>
                <li>Address: 123 Hope Street, Unity City</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 The Broken Weave. All rights reserved. | Building bridges, healing communities.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
