
import React, { useState, useEffect } from 'react';
import { Bell, X, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchNotifications();
    
    // Set up real-time subscription for new notifications
    const channel = supabase
      .channel('admin-notifications')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'admin_notifications'
      }, (payload) => {
        const newNotification = payload.new as Notification;
        setNotifications(prev => [newNotification, ...prev]);
        setUnreadCount(prev => prev + 1);
        toast({
          title: "New Notification",
          description: newNotification.title,
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [toast]);

  const fetchNotifications = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_notifications')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      
      const notificationData = data || [];
      setNotifications(notificationData);
      setUnreadCount(notificationData.filter(n => !n.is_read).length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (id: number) => {
    try {
      const { error } = await supabase
        .from('admin_notifications')
        .update({ is_read: true })
        .eq('id', id);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, is_read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const { error } = await supabase
        .from('admin_notifications')
        .update({ is_read: true })
        .eq('is_read', false);

      if (error) throw error;

      setNotifications(prev => 
        prev.map(n => ({ ...n, is_read: true }))
      );
      setUnreadCount(0);
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'donation': return 'bg-green-100 text-green-800';
      case 'report': return 'bg-red-100 text-red-800';
      case 'volunteer': return 'bg-blue-100 text-blue-800';
      case 'login': return 'bg-yellow-100 text-yellow-800';
      case 'registration': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 w-80 max-h-96 overflow-y-auto z-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between py-3">
            <CardTitle className="text-sm">Notifications</CardTitle>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  <EyeOff className="h-4 w-4" />
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {notifications.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No notifications</p>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                      !notification.is_read ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => !notification.is_read && markAsRead(notification.id)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${getTypeColor(notification.type)}`}>
                          {notification.type}
                        </Badge>
                        {!notification.is_read && (
                          <Button variant="ghost" size="sm" onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notification.id);
                          }}>
                            <Eye className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{notification.message}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminNotifications;
