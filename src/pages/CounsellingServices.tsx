
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, Brain, Users, Phone, Calendar, MapPin, Clock } from "lucide-react";

const CounsellingServices = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const counsellingServices = [
    {
      title: "Individual Counseling",
      description: "One-on-one sessions with trained psychologists and counselors",
      icon: Brain,
      availability: "Mon-Sat: 9 AM - 6 PM",
      contact: "+91-1800-XXX-1111"
    },
    {
      title: "Family Therapy",
      description: "Counseling sessions for families dealing with separation and trauma",
      icon: Heart,
      availability: "Mon-Fri: 10 AM - 5 PM",
      contact: "+91-1800-XXX-2222"
    },
    {
      title: "Group Support Sessions",
      description: "Support groups for people with similar experiences",
      icon: Users,
      availability: "Wed & Sat: 3 PM - 5 PM",
      contact: "+91-1800-XXX-3333"
    },
    {
      title: "Crisis Intervention",
      description: "Immediate psychological support during crisis situations",
      icon: Phone,
      availability: "24/7 Emergency Support",
      contact: "+91-1800-XXX-4444"
    }
  ];

  const specialPrograms = [
    {
      title: "Children's Trauma Recovery",
      description: "Specialized programs for children who have experienced trauma",
      ageGroup: "Ages 5-17",
      duration: "8-12 weeks",
      frequency: "Twice a week"
    },
    {
      title: "Women's Support Circle",
      description: "Dedicated support groups for women affected by communal violence",
      ageGroup: "18+ years",
      duration: "Ongoing",
      frequency: "Weekly"
    },
    {
      title: "Senior Care Program",
      description: "Mental health support tailored for elderly individuals",
      ageGroup: "60+ years",
      duration: "Flexible",
      frequency: "As needed"
    },
    {
      title: "PTSD Treatment Program",
      description: "Comprehensive treatment for Post-Traumatic Stress Disorder",
      ageGroup: "All ages",
      duration: "12-16 weeks",
      frequency: "Weekly sessions"
    }
  ];

  const counsellingCenters = [
    {
      name: "Central Wellness Center",
      address: "123 Peace Street, Central District",
      phone: "+91-11-2222-3333",
      services: ["Individual", "Family", "Group"],
      hours: "Mon-Sat: 9 AM - 7 PM"
    },
    {
      name: "Community Mental Health Hub",
      address: "456 Harmony Road, Community Area",
      phone: "+91-11-4444-5555",
      services: ["Crisis", "Children", "PTSD"],
      hours: "Mon-Fri: 8 AM - 8 PM"
    },
    {
      name: "Hope Recovery Center",
      address: "789 Healing Avenue, Recovery Block",
      phone: "+91-11-6666-7777",
      services: ["Women", "Seniors", "Trauma"],
      hours: "Daily: 10 AM - 6 PM"
    }
  ];

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
                <p className="text-sm text-gray-600">Counselling Services</p>
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
          <Brain className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Professional Counselling Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access professional mental health support and counseling services to help you heal 
            and rebuild after experiencing trauma or loss.
          </p>
        </div>

        {/* Main Services */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Counseling Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {counsellingServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-purple-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{service.availability}</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-600">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm font-medium">{service.contact}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Special Programs */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Specialized Programs</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialPrograms.map((program, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-800">{program.title}</CardTitle>
                  <CardDescription>{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div><strong>Age Group:</strong> {program.ageGroup}</div>
                    <div><strong>Duration:</strong> {program.duration}</div>
                    <div><strong>Frequency:</strong> {program.frequency}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Counseling Centers */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Counseling Centers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {counsellingCenters.map((center, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg">{center.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                    <span className="text-sm text-gray-600">{center.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-600">{center.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{center.hours}</span>
                  </div>
                  <div>
                    <strong className="text-sm">Services:</strong>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {center.services.map((service, idx) => (
                        <span key={idx} className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">How to Access Counseling Services</CardTitle>
              <CardDescription className="text-center">
                Simple steps to get the mental health support you need
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
                  <h4 className="font-semibold mb-2">Contact Us</h4>
                  <p className="text-sm text-gray-600">Call our helpline or visit a counseling center to schedule an initial consultation</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
                  <h4 className="font-semibold mb-2">Assessment</h4>
                  <p className="text-sm text-gray-600">Meet with a qualified counselor for an initial assessment of your needs</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
                  <h4 className="font-semibold mb-2">Begin Therapy</h4>
                  <p className="text-sm text-gray-600">Start your personalized counseling sessions and healing journey</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Emergency Support */}
        <section>
          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800 text-center">Crisis Support</CardTitle>
              <CardDescription className="text-red-600 text-center">
                If you're having thoughts of self-harm or are in a mental health crisis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <p className="text-red-700 font-medium">
                  Please reach out immediately. You are not alone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="destructive" size="lg">
                    <Phone className="w-4 h-4 mr-2" />
                    Crisis Helpline: 1800-XXX-CRISIS
                  </Button>
                  <Button variant="outline" size="lg">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Emergency Session
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default CounsellingServices;
