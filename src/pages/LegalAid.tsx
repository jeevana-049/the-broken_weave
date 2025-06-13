
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, Scale, FileText, Phone, MapPin } from "lucide-react";

const LegalAid = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const legalServices = [
    {
      title: "Family Reunification",
      description: "Legal assistance for family separation cases and custody issues",
      icon: Heart,
      contact: "+91-1234-567890"
    },
    {
      title: "Documentation Recovery",
      description: "Help with recovering lost identity documents and certificates",
      icon: FileText,
      contact: "+91-1234-567891"
    },
    {
      title: "Property Rights",
      description: "Legal support for property disputes and recovery",
      icon: Scale,
      contact: "+91-1234-567892"
    },
    {
      title: "Compensation Claims",
      description: "Assistance with filing compensation claims for losses",
      icon: FileText,
      contact: "+91-1234-567893"
    }
  ];

  const legalCenters = [
    {
      name: "Central Legal Aid Center",
      address: "123 Justice Street, Central District",
      phone: "+91-1111-222233",
      hours: "Mon-Fri: 9:00 AM - 6:00 PM"
    },
    {
      name: "Community Legal Support",
      address: "456 Law Avenue, Community Area",
      phone: "+91-2222-333344",
      hours: "Mon-Sat: 10:00 AM - 5:00 PM"
    },
    {
      name: "Emergency Legal Helpdesk",
      address: "789 Relief Road, Emergency Block",
      phone: "+91-3333-444455",
      hours: "24/7 Emergency Support"
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
                <p className="text-sm text-gray-600">Legal Aid Services</p>
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
          <Scale className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Free Legal Aid Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access professional legal assistance and guidance for issues related to communal unrest, 
            family separation, and property recovery.
          </p>
        </div>

        {/* Legal Services */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Legal Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {legalServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-blue-600">
                      <Phone className="w-4 h-4" />
                      <span className="font-medium">{service.contact}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Legal Centers */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Legal Aid Centers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {legalCenters.map((center, index) => (
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
                  <div className="text-sm text-gray-600">
                    <strong>Hours:</strong> {center.hours}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How to Get Help */}
        <section className="mb-16">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-center">How to Access Legal Aid</CardTitle>
              <CardDescription className="text-center">
                Follow these steps to get the legal assistance you need
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <div>
                      <h4 className="font-semibold">Contact Initial Assessment</h4>
                      <p className="text-sm text-gray-600">Call our helpline for an initial assessment of your legal needs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <div>
                      <h4 className="font-semibold">Document Preparation</h4>
                      <p className="text-sm text-gray-600">Gather necessary documents and evidence related to your case</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                    <div>
                      <h4 className="font-semibold">Legal Consultation</h4>
                      <p className="text-sm text-gray-600">Meet with our legal experts for detailed consultation</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                    <div>
                      <h4 className="font-semibold">Case Filing</h4>
                      <p className="text-sm text-gray-600">We help you file necessary legal documents and applications</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">5</div>
                    <div>
                      <h4 className="font-semibold">Ongoing Support</h4>
                      <p className="text-sm text-gray-600">Receive continuous legal support throughout your case</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">6</div>
                    <div>
                      <h4 className="font-semibold">Resolution</h4>
                      <p className="text-sm text-gray-600">Work towards achieving the best possible outcome for your situation</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Emergency Contact */}
        <section>
          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800">Emergency Legal Assistance</CardTitle>
              <CardDescription className="text-red-600">
                For urgent legal matters requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="destructive" size="lg">
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Legal Helpline: 1800-XXX-XXXX
                </Button>
                <Button variant="outline" size="lg">
                  24/7 Legal Chat Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default LegalAid;
