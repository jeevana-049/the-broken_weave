
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Heart, HandHeart, Users, AlertTriangle, ArrowLeft, Settings, Database, BookOpen, UserCheck } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isGuest, setIsGuest] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const guestStatus = localStorage.getItem('isGuest') === 'true';
    const userData = localStorage.getItem('user');
    
    if (!guestStatus && !userData) {
      navigate('/');
      return;
    }
    
    setIsGuest(guestStatus);
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsAdmin(parsedUser.is_admin || false);
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
    }
  ];

  const adminOptions = [
    {
      title: "Manage Users",
      description: "View and manage registered users",
      icon: Users,
      color: "bg-gray-700 hover:bg-gray-800",
      action: () => navigate('/admin/users')
    },
    {
      title: "Manage Reports",
      description: "Review and update missing person reports",
      icon: Database,
      color: "bg-indigo-600 hover:bg-indigo-700",
      action: () => navigate('/admin/reports')
    },
    {
      title: "Manage Volunteers",
      description: "View and manage volunteer registrations",
      icon: UserCheck,
      color: "bg-emerald-600 hover:bg-emerald-700",
      action: () => navigate('/admin/volunteers')
    },
    {
      title: "Success Stories",
      description: "Create and manage success stories",
      icon: BookOpen,
      color: "bg-purple-600 hover:bg-purple-700",
      action: () => navigate('/admin/success-stories')
    },
    {
      title: "System Settings",
      description: "Configure system settings and preferences",
      icon: Settings,
      color: "bg-slate-600 hover:bg-slate-700",
      action: () => navigate('/admin/settings')
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
                  {isGuest ? 'Dashboard (Guest Mode)' : isAdmin ? 'Admin Dashboard' : 'Dashboard'}
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
            {isGuest ? 'View Our Services' : isAdmin ? 'Admin Control Panel' : 'How Would You Like to Help?'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isGuest 
              ? 'Explore our services. To access full features and contribute, please register or login.'
              : isAdmin
              ? 'Manage the platform and help coordinate relief efforts efficiently.'
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

        {/* Admin Section */}
        {isAdmin && !isGuest && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Administrative Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto mb-12">
              {adminOptions.map((option, index) => {
                const IconComponent = option.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-gray-300">
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
                        variant="secondary"
                      >
                        Access
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <hr className="border-gray-300 mb-12" />
          </div>
        )}

        {/* Regular Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                    disabled={isGuest}
                  >
                    {isGuest ? 'Login Required' : 'Get Started'}
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
