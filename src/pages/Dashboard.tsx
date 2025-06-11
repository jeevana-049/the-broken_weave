
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, HandHeart, Users, AlertTriangle, HelpCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const options = [
    {
      title: "Donate",
      description: "Support our mission with financial contributions to help families in need",
      icon: HandHeart,
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600",
      action: () => navigate("/donate")
    },
    {
      title: "Volunteer",
      description: "Join our team of volunteers and make a direct impact in your community",
      icon: Users,
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600",
      action: () => navigate("/volunteer")
    },
    {
      title: "Report Missing",
      description: "Report a missing person to our database and start the search process",
      icon: AlertTriangle,
      color: "bg-red-500",
      hoverColor: "hover:bg-red-600",
      action: () => navigate("/report-missing")
    },
    {
      title: "How to Help",
      description: "Learn about different ways you can contribute to our cause",
      icon: HelpCircle,
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600",
      action: () => navigate("/how-to-help")
    }
  ];

  const handleLogout = () => {
    // For now, just navigate back to login - will connect to Supabase later
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">The Broken Weave</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={() => navigate("/home")}>
                View Main Site
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Welcome to Your Dashboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose how you'd like to contribute to our mission of reuniting families and rebuilding hope.
            </p>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {options.map((option, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
                onClick={option.action}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${option.color} group-hover:scale-110 transition-transform duration-300`}>
                    <option.icon className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {option.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base mb-6">
                    {option.description}
                  </CardDescription>
                  <Button 
                    className={`w-full ${option.color} ${option.hoverColor} text-white border-0`}
                    onClick={(e) => {
                      e.stopPropagation();
                      option.action();
                    }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 text-center">
            <div className="bg-card/50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">2,847</div>
              <div className="text-sm text-muted-foreground">Children Reunited</div>
            </div>
            <div className="bg-card/50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">1,423</div>
              <div className="text-sm text-muted-foreground">Women Supported</div>
            </div>
            <div className="bg-card/50 p-6 rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">892</div>
              <div className="text-sm text-muted-foreground">Senior Citizens Found</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Every Action Makes a Difference
                </h3>
                <p className="text-muted-foreground mb-6">
                  Whether you donate, volunteer, or help spread awareness, you're contributing to reuniting families and rebuilding hope in our communities.
                </p>
                <Button size="lg" onClick={() => navigate("/home")}>
                  Learn More About Our Mission
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
