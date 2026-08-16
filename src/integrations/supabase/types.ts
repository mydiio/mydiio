export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      advertiser_applications: {
        Row: {
          admin_notes: string | null;
          budget_range: string | null;
          business_name: string;
          business_type: string;
          campaign_goal: string | null;
          campaign_goals: string[];
          contact_name: string;
          contacted_at: string | null;
          created_at: string;
          has_creative: boolean | null;
          id: string;
          referral_source: string | null;
          status: string;
          tier_interest: string | null;
          whatsapp_number: string;
          zones_selected: string[];
        };
        Insert: {
          admin_notes?: string | null;
          budget_range?: string | null;
          business_name: string;
          business_type: string;
          campaign_goal?: string | null;
          campaign_goals?: string[];
          contact_name: string;
          contacted_at?: string | null;
          created_at?: string;
          has_creative?: boolean | null;
          id?: string;
          referral_source?: string | null;
          status?: string;
          tier_interest?: string | null;
          whatsapp_number: string;
          zones_selected?: string[];
        };
        Update: {
          admin_notes?: string | null;
          budget_range?: string | null;
          business_name?: string;
          business_type?: string;
          campaign_goal?: string | null;
          campaign_goals?: string[];
          contact_name?: string;
          contacted_at?: string | null;
          created_at?: string;
          has_creative?: boolean | null;
          id?: string;
          referral_source?: string | null;
          status?: string;
          tier_interest?: string | null;
          whatsapp_number?: string;
          zones_selected?: string[];
        };
        Relationships: [];
      };
      driver_applications: {
        Row: {
          account_holder_name: string;
          account_number: string;
          admin_notes: string | null;
          alternate_number: string | null;
          bank_name: string;
          contacted_at: string | null;
          created_at: string;
          daily_hours: number;
          date_of_birth: string;
          driving_days: string;
          driving_experience: string;
          full_name: string;
          home_address: string;
          id: string;
          licence_expiry: string;
          licence_number: string;
          nic_number: string;
          operating_zones: string[];
          platform_usage: string[] | null;
          preferred_language: string;
          referral_name: string | null;
          status: string;
          vehicle_age: string;
          vehicle_colour: string;
          vehicle_ownership: string;
          vehicle_registration: string;
          whatsapp_number: string;
        };
        Insert: {
          account_holder_name: string;
          account_number: string;
          admin_notes?: string | null;
          alternate_number?: string | null;
          bank_name: string;
          contacted_at?: string | null;
          created_at?: string;
          daily_hours: number;
          date_of_birth: string;
          driving_days: string;
          driving_experience: string;
          full_name: string;
          home_address: string;
          id?: string;
          licence_expiry: string;
          licence_number: string;
          nic_number: string;
          operating_zones?: string[];
          platform_usage?: string[] | null;
          preferred_language: string;
          referral_name?: string | null;
          status?: string;
          vehicle_age: string;
          vehicle_colour: string;
          vehicle_ownership: string;
          vehicle_registration: string;
          whatsapp_number: string;
        };
        Update: {
          account_holder_name?: string;
          account_number?: string;
          admin_notes?: string | null;
          alternate_number?: string | null;
          bank_name?: string;
          contacted_at?: string | null;
          created_at?: string;
          daily_hours?: number;
          date_of_birth?: string;
          driving_days?: string;
          driving_experience?: string;
          full_name?: string;
          home_address?: string;
          id?: string;
          licence_expiry?: string;
          licence_number?: string;
          nic_number?: string;
          operating_zones?: string[];
          platform_usage?: string[] | null;
          preferred_language?: string;
          referral_name?: string | null;
          status?: string;
          vehicle_age?: string;
          vehicle_colour?: string;
          vehicle_ownership?: string;
          vehicle_registration?: string;
          whatsapp_number?: string;
        };
        Relationships: [];
      };
      enquiries: {
        Row: {
          assigned_to: string | null;
          created_at: string;
          id: string;
          message: string | null;
          sender_contact: string | null;
          sender_name: string | null;
          sender_type: string;
          source: string;
          status: string;
          subject: string | null;
          updated_at: string;
          user_id: string | null;
        };
        Insert: {
          assigned_to?: string | null;
          created_at?: string;
          id?: string;
          message?: string | null;
          sender_contact?: string | null;
          sender_name?: string | null;
          sender_type?: string;
          source?: string;
          status?: string;
          subject?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Update: {
          assigned_to?: string | null;
          created_at?: string;
          id?: string;
          message?: string | null;
          sender_contact?: string | null;
          sender_name?: string | null;
          sender_type?: string;
          source?: string;
          status?: string;
          subject?: string | null;
          updated_at?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      general_enquiries: {
        Row: {
          created_at: string;
          id: string;
          message: string;
          name: string;
          phone: string;
          status: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          message: string;
          name: string;
          phone: string;
          status?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          message?: string;
          name?: string;
          phone?: string;
          status?: string;
        };
        Relationships: [];
      };
      investor_enquiries: {
        Row: {
          created_at: string;
          fund_or_firm: string | null;
          id: string;
          name: string;
          status: string;
          whatsapp_number: string;
        };
        Insert: {
          created_at?: string;
          fund_or_firm?: string | null;
          id?: string;
          name: string;
          status?: string;
          whatsapp_number: string;
        };
        Update: {
          created_at?: string;
          fund_or_firm?: string | null;
          id?: string;
          name?: string;
          status?: string;
          whatsapp_number?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
