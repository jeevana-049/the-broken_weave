
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

// Notification helpers for different events
export const notifyUserLogin = async (username: string, userId?: number) => {
  await createAdminNotification({
    title: 'User Login',
    message: `User ${username} logged in to the system`,
    type: 'login',
    userId
  });
};

export const notifyUserRegistration = async (username: string, email: string) => {
  await createAdminNotification({
    title: 'New User Registration',
    message: `New user ${username} (${email}) registered on the platform`,
    type: 'registration'
  });
};

export const notifyMissingPersonReport = async (personName: string, reporterName: string) => {
  await createAdminNotification({
    title: 'New Missing Person Report',
    message: `${reporterName} reported ${personName} as missing`,
    type: 'report'
  });
};

export const notifyVolunteerRegistration = async (volunteerName: string, skills: string) => {
  await createAdminNotification({
    title: 'New Volunteer Registration',
    message: `${volunteerName} registered as a volunteer with skills: ${skills}`,
    type: 'volunteer'
  });
};

export const notifyDonation = async (donorName: string, donorEmail: string) => {
  await createAdminNotification({
    title: 'New Donation Received',
    message: `${donorName} (${donorEmail}) made a donation`,
    type: 'donation'
  });
};
