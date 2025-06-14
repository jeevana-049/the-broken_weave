export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_notifications: {
        Row: {
          created_at: string | null
          id: number
          is_read: boolean | null
          message: string
          title: string
          type: string
          user_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_read?: boolean | null
          message: string
          title: string
          type: string
          user_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          user_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      donations: {
        Row: {
          created_at: string | null
          email: string
          id: number
          message: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: number
          message?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: number
          message?: string | null
          name?: string
        }
        Relationships: []
      }
      missing_persons: {
        Row: {
          category: string | null
          contact_info: string | null
          created_at: string | null
          description: string | null
          dob: string | null
          id: number
          image_url: string | null
          is_reunited: boolean | null
          last_known_location: string | null
          name: string
          reported_at: string | null
          status: string | null
        }
        Insert: {
          category?: string | null
          contact_info?: string | null
          created_at?: string | null
          description?: string | null
          dob?: string | null
          id?: number
          image_url?: string | null
          is_reunited?: boolean | null
          last_known_location?: string | null
          name: string
          reported_at?: string | null
          status?: string | null
        }
        Update: {
          category?: string | null
          contact_info?: string | null
          created_at?: string | null
          description?: string | null
          dob?: string | null
          id?: number
          image_url?: string | null
          is_reunited?: boolean | null
          last_known_location?: string | null
          name?: string
          reported_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      search_queries: {
        Row: {
          age_range: string | null
          category: string | null
          id: number
          location: string | null
          search_term: string
          searched_at: string | null
          user_ip: string | null
        }
        Insert: {
          age_range?: string | null
          category?: string | null
          id?: number
          location?: string | null
          search_term: string
          searched_at?: string | null
          user_ip?: string | null
        }
        Update: {
          age_range?: string | null
          category?: string | null
          id?: number
          location?: string | null
          search_term?: string
          searched_at?: string | null
          user_ip?: string | null
        }
        Relationships: []
      }
      success_stories: {
        Row: {
          category: string | null
          content: string
          created_at: string | null
          created_by: number | null
          description: string | null
          id: number
          is_published: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          content: string
          created_at?: string | null
          created_by?: number | null
          description?: string | null
          id?: number
          is_published?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          content?: string
          created_at?: string | null
          created_by?: number | null
          description?: string | null
          id?: number
          is_published?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "success_stories_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          id: number
          is_admin: boolean | null
          password: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: number
          is_admin?: boolean | null
          password?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: number
          is_admin?: boolean | null
          password?: string | null
          username?: string
        }
        Relationships: []
      }
      volunteers: {
        Row: {
          availability: string | null
          email: string | null
          id: number
          message: string | null
          name: string
          phone: string | null
          registered_at: string | null
          skills: string | null
        }
        Insert: {
          availability?: string | null
          email?: string | null
          id?: number
          message?: string | null
          name: string
          phone?: string | null
          registered_at?: string | null
          skills?: string | null
        }
        Update: {
          availability?: string | null
          email?: string | null
          id?: number
          message?: string | null
          name?: string
          phone?: string | null
          registered_at?: string | null
          skills?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
