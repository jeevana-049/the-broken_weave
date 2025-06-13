
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, Save, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SystemSettings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: 'The Broken Weave',
    contactEmail: 'info@brokenweave.org',
    helplineNumber: '+91-XXXX-XXXX',
    emergencyNumber: '100',
    aboutText: 'Supporting children, women, and senior citizens affected by communal unrest.',
    maintenanceMode: false,
    maxFileSize: '5MB',
    allowedFileTypes: 'jpg,jpeg,png,pdf'
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    checkAdminAccess();
    loadSettings();
  }, []);

  const checkAdminAccess = () => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    
    const user = JSON.parse(userData);
    if (!user.is_admin) {
      navigate('/dashboard');
      return;
    }
  };

  const loadSettings = () => {
    // Load settings from localStorage or API
    const savedSettings = localStorage.getItem('systemSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Save settings to localStorage (in a real app, this would be an API call)
      localStorage.setItem('systemSettings', JSON.stringify(settings));
      
      toast({
        title: "Success!",
        description: "System settings saved successfully."
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
                <p className="text-sm text-gray-600">System Settings</p>
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">System Settings</h2>
          <Button onClick={handleSave} disabled={isLoading} className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            {isLoading ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>

        <div className="space-y-6">
          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                General Settings
              </CardTitle>
              <CardDescription>Basic site configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="aboutText">About Text</Label>
                <Textarea
                  id="aboutText"
                  name="aboutText"
                  value={settings.aboutText}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Contact details displayed on the site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={settings.contactEmail}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="helplineNumber">Helpline Number</Label>
                <Input
                  id="helplineNumber"
                  name="helplineNumber"
                  value={settings.helplineNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="emergencyNumber">Emergency Number</Label>
                <Input
                  id="emergencyNumber"
                  name="emergencyNumber"
                  value={settings.emergencyNumber}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>
          </Card>

          {/* File Upload Settings */}
          <Card>
            <CardHeader>
              <CardTitle>File Upload Settings</CardTitle>
              <CardDescription>Configure file upload limitations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="maxFileSize">Maximum File Size</Label>
                <Input
                  id="maxFileSize"
                  name="maxFileSize"
                  value={settings.maxFileSize}
                  onChange={handleInputChange}
                  placeholder="e.g., 5MB"
                />
              </div>
              <div>
                <Label htmlFor="allowedFileTypes">Allowed File Types</Label>
                <Input
                  id="allowedFileTypes"
                  name="allowedFileTypes"
                  value={settings.allowedFileTypes}
                  onChange={handleInputChange}
                  placeholder="e.g., jpg,jpeg,png,pdf"
                />
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current system information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Server Status</Label>
                  <p className="text-green-600">Online</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Database Status</Label>
                  <p className="text-green-600">Connected</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Backup</Label>
                  <p className="text-gray-600">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Version</Label>
                  <p className="text-gray-600">1.0.0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SystemSettings;
