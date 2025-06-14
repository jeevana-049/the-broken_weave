
import { supabase } from "@/integrations/supabase/client";

interface CreateNotificationParams {
  title: string;
  message: string;
  type: 'login' | 'report' | 'donation' | 'volunteer' | 'registration';
  userId?: number;
}

export const createAdminNotification = async ({
  title,
  message,
  type,
  userId
}: CreateNotificationParams) => {
  try {
    const { error } = await supabase
      .from('admin_notifications')
      .insert({
        title,
        message,
        type,
        user_id: userId
      });

    if (error) throw error;
    console.log('Admin notification created:', { title, type });
  } catch (error) {
    console.error('Error creating admin notification:', error);
  }
};
