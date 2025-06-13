
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, Phone, AlertCircle, Clock, Users } from "lucide-react";

const EmergencyHelplines = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const emergencyNumbers = [
    {
      title: "Police Emergency",
      number: "100",
      description: "For immediate police assistance and law enforcement",
      availability: "24/7",
      category: "emergency"
    },
    {
      title: "Medical Emergency",
      number: "108",
      description: "Ambulance services and medical emergencies",
      availability: "24/7",
      category: "emergency"
    },
    {
      title: "Fire Emergency",
      number: "101",
      description: "Fire department and rescue operations",
      availability: "24/7",
      category: "emergency"
    },
    {
      title: "Women Helpline",
      number: "1091",
      description: "Support for women in distress and emergency situations",
      availability: "24/7",
      category: "support"
    },
    {
      title: "Child Helpline",
      number: "1098",
      description: "Emergency support for children in need",
      availability: "24/7",
      category: "support"
    },
    {
      title: "Senior Citizen Helpline",
      number: "14567",
      description: "Dedicated support for senior citizens",
      availability: "24/7",
      category: "support"
    }
  ];

  const specializedHelplines = [
    {
      title: "Missing Person Helpline",
      number: "+91-1800-XXX-1234",
      description: "Dedicated line for reporting and tracking missing persons",
      availability: "24/7"
    },
    {
      title: "Trauma Counseling",
      number: "+91-1800-XXX-5678",
      description: "Immediate psychological support and crisis intervention",
      availability: "24/7"
    },
    {
      title: "Legal Aid Emergency",
      number: "+91-1800-XXX-9012",
      description: "Urgent legal assistance and guidance",
      availability: "24/7"
    },
    {
      title: "Relief Coordination",
      number: "+91-1800-XXX-3456",
      description: "Coordination for relief efforts and resource allocation",
      availability: "24/7"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'emergency':
        return 'bg-red-500';
      case 'support':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
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
                <p className="text-sm text-gray-600">Emergency Helplines</p>
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Emergency Helplines
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quick access to emergency services and support helplines. 
            Save these numbers for immediate assistance during crisis situations.
          </p>
        </div>

        {/* Emergency Alert */}
        <div className="mb-12">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-red-800 mb-2">Emergency Situation?</h3>
                <p className="text-red-700 mb-4">
                  If you're in immediate danger or need urgent assistance, call emergency services now!
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button size="lg" variant="destructive" className="text-lg px-8">
                    <Phone className="w-5 h-5 mr-2" />
                    Police: 100
                  </Button>
                  <Button size="lg" variant="destructive" className="text-lg px-8">
                    <Phone className="w-5 h-5 mr-2" />
                    Medical: 108
                  </Button>
                  <Button size="lg" variant="destructive" className="text-lg px-8">
                    <Phone className="w-5 h-5 mr-2" />
                    Fire: 101
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* National Emergency Numbers */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">National Emergency Numbers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyNumbers.map((helpline, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${getCategoryColor(helpline.category)} rounded-lg flex items-center justify-center`}>
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{helpline.title}</CardTitle>
                      <div className="text-2xl font-bold text-blue-600">{helpline.number}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">{helpline.description}</p>
                  <div className="flex items-center gap-2 text-green-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{helpline.availability}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Specialized Helplines */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Specialized Support Helplines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specializedHelplines.map((helpline, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{helpline.title}</CardTitle>
                      <div className="text-lg font-bold text-purple-600">{helpline.number}</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-3">{helpline.description}</p>
                  <div className="flex items-center gap-2 text-green-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{helpline.availability}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* What to Expect */}
        <section className="mb-16">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">What to Expect When You Call</CardTitle>
              <CardDescription className="text-center">
                Information to help you prepare for emergency calls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    Be Ready to Provide
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Your name and contact number</li>
                    <li>• Exact location or address</li>
                    <li>• Nature of the emergency</li>
                    <li>• Number of people involved</li>
                    <li>• Any immediate dangers</li>
                    <li>• Current condition of affected persons</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    What Happens Next
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Trained operator will assess the situation</li>
                    <li>• Appropriate services will be dispatched</li>
                    <li>• You may receive follow-up calls</li>
                    <li>• Keep your phone available for updates</li>
                    <li>• Follow any instructions given</li>
                    <li>• Stay safe while help is on the way</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Additional Resources */}
        <section>
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-800 text-center">Additional Resources</CardTitle>
              <CardDescription className="text-blue-600 text-center">
                More ways to get help and support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                  <Phone className="w-6 h-6 mb-2" />
                  <span className="font-medium">SMS Helpline</span>
                  <span className="text-sm text-gray-600">Text "HELP" to 9876543210</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                  <Users className="w-6 h-6 mb-2" />
                  <span className="font-medium">WhatsApp Support</span>
                  <span className="text-sm text-gray-600">+91-9876-543210</span>
                </Button>
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                  <AlertCircle className="w-6 h-6 mb-2" />
                  <span className="font-medium">Online Chat</span>
                  <span className="text-sm text-gray-600">24/7 Live Support</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default EmergencyHelplines;
