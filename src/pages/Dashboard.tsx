
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Heart, HandHeart, Users, AlertTriangle, HelpCircle, ArrowLeft } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isGuest, setIsGuest] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const guestStatus = localStorage.getItem('isGuest') === 'true';
    const userData = localStorage.getItem('user');
    
    // Redirect to login if no authentication
    if (!guestStatus && !userData) {
      navigate('/');
      return;
    }
    
    setIsGuest(guestStatus);
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  const handleNavigateToHome = () => {
    navigate('/home');
  };

  const handleGuestRestriction = () => {
    alert('Please register or login to access this feature');
  };

  const dashboardOptions = [
    {
      title: "Donate",
      description: "Support our mission to reunite families and help those in need",
      icon: HandHeart,
      color: "bg-green-500 hover:bg-green-600",
      action: () => isGuest ? handleGuestRestriction() : navigate('/donate')
    },
    {
      title: "Volunteer",
      description: "Join our team of volunteers making a difference in communities",
      icon: Users,
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => isGuest ? handleGuestRestriction() : navigate('/volunteer')
    },
    {
      title: "Report Missing",
      description: "Report missing children, women, or senior citizens",
      icon: AlertTriangle,
      color: "bg-red-500 hover:bg-red-600",
      action: () => isGuest ? handleGuestRestriction() : navigate('/report-missing')
    },
    {
      title: "How to Help",
      description: "Learn about different ways you can contribute to our cause",
      icon: HelpCircle,
      color: "bg-purple-500 hover:bg-purple-600",
      action: () => navigate('/how-to-help')
    }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isGuest');
    navigate('/');
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
                <p className="text-sm text-gray-600">
                  {isGuest ? 'Dashboard (Guest Mode)' : 'Dashboard'}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                onClick={handleNavigateToHome}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go to Home
              </Button>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
              >
                {isGuest ? 'Login' : 'Logout'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {isGuest ? 'View Our Services' : 'How Would You Like to Help?'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isGuest 
              ? 'Explore our services. To access full features and contribute, please register or login.'
              : 'Choose from the options below to make a meaningful impact in reuniting families and supporting vulnerable communities.'
            }
          </p>
          {isGuest && (
            <Button 
              className="mt-4" 
              onClick={() => navigate('/')}
            >
              Register / Login for Full Access
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {dashboardOptions.map((option, index) => {
            const IconComponent = option.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 rounded-full ${option.color} flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                  <CardDescription className="text-gray-600">
                    {option.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full" 
                    onClick={option.action}
                    disabled={isGuest && option.title !== "How to Help"}
                  >
                    {isGuest && option.title !== "How to Help" ? 'Login Required' : 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Need Immediate Help?</CardTitle>
              <CardDescription>
                If you have an emergency or need immediate assistance, please contact our helpline.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline">
                  Call Helpline: +91-XXXX-XXXX
                </Button>
                <Button variant="outline">
                  Emergency Services: 100
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
