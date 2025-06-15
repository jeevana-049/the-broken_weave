
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, Search, UserCheck, UserX, Shield, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import AdminNotifications from "@/components/AdminNotifications";

interface User {
  id: number;
  username: string;
  email: string | null;
  is_admin: boolean;
  created_at: string;
}

const ManageUsers = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    checkAdminAccess();
    fetchUsers();
  }, []);

  const checkAdminAccess = () => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    
    const user = JSON.parse(userData);
    setCurrentUser(user);
    if (!user.is_admin) {
      navigate('/dashboard');
      return;
    }
  };

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      console.log('Fetched users:', data);
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAdminStatus = async (userId: number, currentStatus: boolean, targetUsername: string) => {
    // Prevent self-demotion
    if (currentUser && currentUser.id === userId && currentStatus) {
      toast({
        title: "Action Not Allowed",
        description: "You cannot remove your own admin privileges.",
        variant: "destructive"
      });
      return;
    }

    console.log(`Toggling admin status for user ${userId} from ${currentStatus} to ${!currentStatus}`);

    try {
      const { data, error } = await supabase
        .from('users')
        .update({ is_admin: !currentStatus })
        .eq('id', userId)
        .select();

      if (error) {
        console.error('Supabase update error:', error);
        throw error;
      }
      
      console.log('Update result:', data);
      
      const action = !currentStatus ? 'granted' : 'revoked';
      toast({
        title: "Success!",
        description: `Admin privileges ${action} for ${targetUsername}.`
      });
      
      // Refresh the users list to show updated status
      await fetchUsers();
    } catch (error) {
      console.error('Error updating user admin status:', error);
      toast({
        title: "Error",
        description: "Failed to update user admin status.",
        variant: "destructive"
      });
    }
  };

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-red-500" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">The Broken Weave</h1>
                <p className="text-sm text-gray-600">Manage Users</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <AdminNotifications />
              <Button 
                variant="outline" 
                onClick={() => {
                  window.scrollTo(0, 0);
                  navigate('/dashboard');
                }}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">User Management</h2>
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={fetchUsers} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Refresh'}
            </Button>
          </div>
        </div>

        {/* Admin Info Card */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-blue-700">
              <Crown className="w-5 h-5" />
              <p className="font-medium">Admin Management</p>
            </div>
            <p className="text-sm text-blue-600 mt-1">
              You can directly grant or revoke admin privileges. Changes take effect immediately.
            </p>
          </CardContent>
        </Card>

        {/* Users List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card key={user.id} className={`hover:shadow-lg transition-shadow border ${user.is_admin ? 'border-blue-200 bg-blue-50' : ''}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center gap-2">
                      {user.username}
                      {user.is_admin && <Shield className="w-4 h-4 text-blue-500" />}
                      {currentUser && currentUser.id === user.id && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">You</span>
                      )}
                    </CardTitle>
                    <CardDescription>{user.email || 'No email'}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>ID: {user.id}</p>
                  <p>Status: {user.is_admin ? 'Admin' : 'User'}</p>
                  <p>Joined: {new Date(user.created_at).toLocaleDateString()}</p>
                </div>
                <div className="mt-4">
                  <Button
                    size="sm"
                    variant={user.is_admin ? "destructive" : "default"}
                    onClick={() => toggleAdminStatus(user.id, user.is_admin, user.username)}
                    className="w-full"
                    disabled={currentUser && currentUser.id === user.id && user.is_admin}
                  >
                    {user.is_admin ? (
                      <>
                        <UserX className="w-4 h-4 mr-2" />
                        Remove Admin
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-4 h-4 mr-2" />
                        Make Admin
                      </>
                    )}
                  </Button>
                  {currentUser && currentUser.id === user.id && user.is_admin && (
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Cannot remove own admin privileges
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm ? 'No users found matching your search.' : 'No users found.'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ManageUsers;
