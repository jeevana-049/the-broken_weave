
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, HelpCircle, Baby, Users, UserCheck } from "lucide-react";

const HowToHelp = () => {
  const navigate = useNavigate();

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
                <p className="text-sm text-gray-600">How to Help</p>
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
          <HelpCircle className="w-16 h-16 text-purple-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How You Can Help
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn about the different ways you can make a meaningful impact in supporting 
            vulnerable communities and helping reunite families.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Help Children */}
          <Card className="h-full">
            <CardHeader>
              <Baby className="w-12 h-12 text-blue-500 mb-4" />
              <CardTitle>Supporting Children</CardTitle>
              <CardDescription>Ways to help children affected by communal unrest</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Educational Support</h4>
                <p className="text-sm text-gray-600">
                  Provide educational materials, tutoring, and help establish temporary schools 
                  in affected areas to ensure children don't lose their learning opportunities.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Emotional Care</h4>
                <p className="text-sm text-gray-600">
                  Offer counseling services, organize recreational activities, and create 
                  safe spaces where children can process trauma and heal.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Basic Needs</h4>
                <p className="text-sm text-gray-600">
                  Donate clothes, food, toys, and essential items. Sponsor meal programs 
                  and provide medical care for displaced children.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Family Reunification</h4>
                <p className="text-sm text-gray-600">
                  Help maintain databases of separated children, assist in identification 
                  processes, and support foster care programs when needed.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Help Women */}
          <Card className="h-full">
            <CardHeader>
              <Users className="w-12 h-12 text-pink-500 mb-4" />
              <CardTitle>Supporting Women</CardTitle>
              <CardDescription>Ways to help women affected by communal unrest</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Safety & Security</h4>
                <p className="text-sm text-gray-600">
                  Provide safe shelter, security measures, and protection services. 
                  Establish women-only safe spaces and emergency helplines.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Economic Empowerment</h4>
                <p className="text-sm text-gray-600">
                  Offer skill development programs, microfinance opportunities, and 
                  job placement assistance to help women become self-sufficient.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Healthcare Access</h4>
                <p className="text-sm text-gray-600">
                  Provide medical care, mental health support, reproductive health services, 
                  and specialized care for pregnant and nursing mothers.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Legal Support</h4>
                <p className="text-sm text-gray-600">
                  Offer legal aid, help with documentation, property rights assistance, 
                  and support in cases of gender-based violence.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Help Senior Citizens */}
          <Card className="h-full">
            <CardHeader>
              <UserCheck className="w-12 h-12 text-green-500 mb-4" />
              <CardTitle>Supporting Senior Citizens</CardTitle>
              <CardDescription>Ways to help elderly people affected by communal unrest</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Medical Care</h4>
                <p className="text-sm text-gray-600">
                  Provide specialized medical attention, chronic disease management, 
                  medication access, and mobility assistance for elderly individuals.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Daily Living Support</h4>
                <p className="text-sm text-gray-600">
                  Assist with daily activities, provide caregiving services, ensure 
                  nutritious meals, and help with personal hygiene and mobility.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Social Connection</h4>
                <p className="text-sm text-gray-600">
                  Organize social activities, provide companionship, facilitate 
                  communication with family members, and prevent isolation.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Housing & Safety</h4>
                <p className="text-sm text-gray-600">
                  Ensure accessible housing, implement safety measures, provide 
                  emergency response systems, and offer long-term care options.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* General Ways to Help */}
        <div className="mt-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">General Ways to Contribute</CardTitle>
              <CardDescription className="text-center">
                Additional ways you can make a difference in our mission
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Financial Donations</h4>
                  <p className="text-sm text-gray-600">
                    Monetary contributions help us provide immediate relief and long-term support services.
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Volunteer Time</h4>
                  <p className="text-sm text-gray-600">
                    Donate your time and skills to directly support affected communities and families.
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Spread Awareness</h4>
                  <p className="text-sm text-gray-600">
                    Share our mission on social media and help raise awareness about communal harmony.
                  </p>
                </div>
                <div className="text-center">
                  <h4 className="font-semibold text-gray-900 mb-2">Advocate for Change</h4>
                  <p className="text-sm text-gray-600">
                    Support policy changes and community initiatives that promote peace and unity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="pt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to Make a Difference?
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Every action, no matter how small, contributes to healing our communities 
                and rebuilding the bonds that unite us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={() => navigate('/volunteer')} size="lg">
                  Become a Volunteer
                </Button>
                <Button onClick={() => navigate('/donate')} variant="outline" size="lg">
                  Make a Donation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default HowToHelp;
