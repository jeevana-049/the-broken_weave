
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, Baby, Users, UserCheck } from "lucide-react";

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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How You Can Help
          </h2>
          <p className="text-lg text-gray-600">
            Learn about the different ways you can make a difference in reuniting families and supporting those in need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Helping Children */}
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Baby className="w-8 h-8 text-blue-500" />
                <CardTitle>Helping Children</CardTitle>
              </div>
              <CardDescription>
                Supporting missing and vulnerable children
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Immediate Support</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Report sightings immediately to authorities</li>
                  <li>• Share missing child alerts on social media</li>
                  <li>• Provide safe shelter and food if found</li>
                  <li>• Contact child protection services</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Long-term Help</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Volunteer at local orphanages</li>
                  <li>• Support educational programs</li>
                  <li>• Donate children's clothing and supplies</li>
                  <li>• Mentor reunited families</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Prevention</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Educate communities about child safety</li>
                  <li>• Support poverty alleviation programs</li>
                  <li>• Advocate for stronger child protection laws</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Helping Women */}
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-8 h-8 text-purple-500" />
                <CardTitle>Helping Women</CardTitle>
              </div>
              <CardDescription>
                Supporting missing and vulnerable women
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Safety & Security</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Provide safe houses and shelters</li>
                  <li>• Offer counseling and therapy services</li>
                  <li>• Legal aid and support services</li>
                  <li>• Emergency hotline support</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Empowerment</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Skill development and training programs</li>
                  <li>• Financial literacy workshops</li>
                  <li>• Job placement assistance</li>
                  <li>• Microfinance opportunities</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Community Support</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Create women's support groups</li>
                  <li>• Raise awareness about women's rights</li>
                  <li>• Support anti-trafficking initiatives</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Helping Senior Citizens */}
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <UserCheck className="w-8 h-8 text-green-500" />
                <CardTitle>Helping Senior Citizens</CardTitle>
              </div>
              <CardDescription>
                Supporting missing and elderly individuals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Health & Care</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Medical care and health checkups</li>
                  <li>• Medicine and healthcare supplies</li>
                  <li>• Assisted living support</li>
                  <li>• Mental health counseling</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Social Support</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Regular companionship visits</li>
                  <li>• Community engagement activities</li>
                  <li>• Technology training for communication</li>
                  <li>• Transport assistance</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Basic Needs</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Nutritious meals and food security</li>
                  <li>• Safe housing arrangements</li>
                  <li>• Financial support and pension help</li>
                  <li>• Legal documentation assistance</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Ready to Make a Difference?</CardTitle>
              <CardDescription>
                Join our mission to reunite families and support those in need
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button 
                  className="w-full"
                  onClick={() => navigate('/volunteer')}
                >
                  Become a Volunteer
                </Button>
                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate('/donate')}
                >
                  Make a Donation
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                Every small action counts towards making a big difference in someone's life.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default HowToHelp;
