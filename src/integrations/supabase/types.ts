export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blog_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          order_index: number
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          order_index?: number
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          order_index?: number
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          author_name: string | null
          category_id: string | null
          content: string | null
          cover_url: string | null
          created_at: string
          excerpt: string | null
          id: string
          og_image_url: string | null
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          author_id?: string | null
          author_name?: string | null
          category_id?: string | null
          content?: string | null
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          og_image_url?: string | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          author_id?: string | null
          author_name?: string | null
          category_id?: string | null
          content?: string | null
          cover_url?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          og_image_url?: string | null
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      chatbot_steps: {
        Row: {
          id: string
          input_type: string
          is_active: boolean
          options: Json
          order_index: number
          prompt: string
          step_key: string
          updated_at: string
        }
        Insert: {
          id?: string
          input_type?: string
          is_active?: boolean
          options?: Json
          order_index?: number
          prompt: string
          step_key: string
          updated_at?: string
        }
        Update: {
          id?: string
          input_type?: string
          is_active?: boolean
          options?: Json
          order_index?: number
          prompt?: string
          step_key?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          internal_notes: string | null
          message: string
          name: string
          phone: string | null
          source: string | null
          status: string
          subject: string | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          internal_notes?: string | null
          message: string
          name: string
          phone?: string | null
          source?: string | null
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          internal_notes?: string | null
          message?: string
          name?: string
          phone?: string | null
          source?: string | null
          status?: string
          subject?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      faqs: {
        Row: {
          answer: string
          category: string | null
          created_at: string
          id: string
          is_published: boolean
          order_index: number
          question: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          answer: string
          category?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          order_index?: number
          question: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          answer?: string
          category?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          order_index?: number
          question?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      footer_columns: {
        Row: {
          id: string
          is_published: boolean
          links: Json
          order_index: number
          title: string
          updated_at: string
        }
        Insert: {
          id?: string
          is_published?: boolean
          links?: Json
          order_index?: number
          title: string
          updated_at?: string
        }
        Update: {
          id?: string
          is_published?: boolean
          links?: Json
          order_index?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          album: string | null
          caption: string | null
          created_at: string
          id: string
          image_url: string
          is_published: boolean
          order_index: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          album?: string | null
          caption?: string | null
          created_at?: string
          id?: string
          image_url: string
          is_published?: boolean
          order_index?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          album?: string | null
          caption?: string | null
          created_at?: string
          id?: string
          image_url?: string
          is_published?: boolean
          order_index?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      hero_banners: {
        Row: {
          created_at: string
          cta_primary_label: string | null
          cta_primary_url: string | null
          cta_secondary_label: string | null
          cta_secondary_url: string | null
          id: string
          image_desktop_url: string | null
          image_mobile_url: string | null
          is_published: boolean
          order_index: number
          subtitle: string | null
          support_text: string | null
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          cta_primary_label?: string | null
          cta_primary_url?: string | null
          cta_secondary_label?: string | null
          cta_secondary_url?: string | null
          id?: string
          image_desktop_url?: string | null
          image_mobile_url?: string | null
          is_published?: boolean
          order_index?: number
          subtitle?: string | null
          support_text?: string | null
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          cta_primary_label?: string | null
          cta_primary_url?: string | null
          cta_secondary_label?: string | null
          cta_secondary_url?: string | null
          id?: string
          image_desktop_url?: string | null
          image_mobile_url?: string | null
          is_published?: boolean
          order_index?: number
          subtitle?: string | null
          support_text?: string | null
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      hero_cards: {
        Row: {
          created_at: string
          description: string | null
          icon_name: string | null
          id: string
          is_published: boolean
          number: string
          order_index: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          is_published?: boolean
          number?: string
          order_index?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          is_published?: boolean
          number?: string
          order_index?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      media_library: {
        Row: {
          alt_text: string | null
          created_at: string
          file_name: string
          height: number | null
          id: string
          mime_type: string | null
          public_url: string
          size_bytes: number | null
          storage_path: string
          uploaded_by: string | null
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          created_at?: string
          file_name: string
          height?: number | null
          id?: string
          mime_type?: string | null
          public_url: string
          size_bytes?: number | null
          storage_path: string
          uploaded_by?: string | null
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          created_at?: string
          file_name?: string
          height?: number | null
          id?: string
          mime_type?: string | null
          public_url?: string
          size_bytes?: number | null
          storage_path?: string
          uploaded_by?: string | null
          width?: number | null
        }
        Relationships: []
      }
      nav_items: {
        Row: {
          created_at: string
          enabled: boolean
          id: string
          label: string
          sort_order: number
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          enabled?: boolean
          id?: string
          label: string
          sort_order?: number
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          enabled?: boolean
          id?: string
          label?: string
          sort_order?: number
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      page_seo: {
        Row: {
          description: string | null
          id: string
          keywords: string | null
          og_image_url: string | null
          path: string
          title: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          description?: string | null
          id?: string
          keywords?: string | null
          og_image_url?: string | null
          path: string
          title?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          description?: string | null
          id?: string
          keywords?: string | null
          og_image_url?: string | null
          path?: string
          title?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      partners: {
        Row: {
          created_at: string
          external_url: string | null
          id: string
          is_published: boolean
          logo_url: string | null
          name: string
          order_index: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          external_url?: string | null
          id?: string
          is_published?: boolean
          logo_url?: string | null
          name: string
          order_index?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          external_url?: string | null
          id?: string
          is_published?: boolean
          logo_url?: string | null
          name?: string
          order_index?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      pricing_plans: {
        Row: {
          badge: string | null
          billing_period: string | null
          category: string | null
          created_at: string
          cta_label: string | null
          cta_url: string | null
          currency: string | null
          description: string | null
          excluded_features: Json
          features: Json
          id: string
          image_url: string | null
          is_popular: boolean
          is_published: boolean
          name: string
          order_index: number
          price: number | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          badge?: string | null
          billing_period?: string | null
          category?: string | null
          created_at?: string
          cta_label?: string | null
          cta_url?: string | null
          currency?: string | null
          description?: string | null
          excluded_features?: Json
          features?: Json
          id?: string
          image_url?: string | null
          is_popular?: boolean
          is_published?: boolean
          name: string
          order_index?: number
          price?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          badge?: string | null
          billing_period?: string | null
          category?: string | null
          created_at?: string
          cta_label?: string | null
          cta_url?: string | null
          currency?: string | null
          description?: string | null
          excluded_features?: Json
          features?: Json
          id?: string
          image_url?: string | null
          is_popular?: boolean
          is_published?: boolean
          name?: string
          order_index?: number
          price?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      quotes: {
        Row: {
          answers: Json | null
          budget: string | null
          company: string | null
          created_at: string
          email: string | null
          id: string
          internal_notes: string | null
          message: string | null
          name: string | null
          phone: string | null
          service_interest: string | null
          source: string | null
          status: string
          updated_at: string
        }
        Insert: {
          answers?: Json | null
          budget?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          id?: string
          internal_notes?: string | null
          message?: string | null
          name?: string | null
          phone?: string | null
          service_interest?: string | null
          source?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          answers?: Json | null
          budget?: string | null
          company?: string | null
          created_at?: string
          email?: string | null
          id?: string
          internal_notes?: string | null
          message?: string | null
          name?: string | null
          phone?: string | null
          service_interest?: string | null
          source?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          benefits: Json
          created_at: string
          cta_label: string | null
          cta_url: string | null
          differentials: Json
          featured_on_home: boolean
          full_description: string | null
          icon_name: string | null
          id: string
          image_url: string | null
          is_published: boolean
          name: string
          order_index: number
          seo_description: string | null
          seo_title: string | null
          short_description: string | null
          slug: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          benefits?: Json
          created_at?: string
          cta_label?: string | null
          cta_url?: string | null
          differentials?: Json
          featured_on_home?: boolean
          full_description?: string | null
          icon_name?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean
          name: string
          order_index?: number
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          benefits?: Json
          created_at?: string
          cta_label?: string | null
          cta_url?: string | null
          differentials?: Json
          featured_on_home?: boolean
          full_description?: string | null
          icon_name?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean
          name?: string
          order_index?: number
          seo_description?: string | null
          seo_title?: string | null
          short_description?: string | null
          slug?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      site_pillars: {
        Row: {
          created_at: string
          description: string | null
          icon_name: string | null
          id: string
          is_published: boolean
          order_index: number
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          is_published?: boolean
          order_index?: number
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          icon_name?: string | null
          id?: string
          is_published?: boolean
          order_index?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          about_checklist: Json | null
          about_cta_label: string | null
          about_cta_url: string | null
          about_description: string | null
          about_eyebrow: string | null
          about_image_url: string | null
          about_title: string | null
          address: string | null
          address_city: string | null
          address_district: string | null
          address_number: string | null
          address_state: string | null
          address_street: string | null
          address_zip: string | null
          business_hours: string | null
          color_accent: string | null
          color_background: string
          color_dark: string
          color_foreground: string
          color_primary: string
          color_primary_dark: string
          color_secondary: string
          email: string | null
          favicon_url: string | null
          font_body: string
          font_display: string
          footer_about: string | null
          footer_text: string | null
          google_analytics_id: string | null
          head_snippet: string | null
          home_blog_eyebrow: string | null
          home_blog_title: string | null
          home_pillars_eyebrow: string | null
          home_pillars_title: string | null
          home_services_eyebrow: string | null
          home_services_title: string | null
          home_solutions_cta_label: string | null
          home_solutions_cta_url: string | null
          home_solutions_description: string | null
          home_solutions_eyebrow: string | null
          home_solutions_image_url: string | null
          home_solutions_title: string | null
          home_testimonials_eyebrow: string | null
          home_testimonials_title: string | null
          id: number
          logo_dark_url: string | null
          logo_url: string | null
          map_embed_url: string | null
          meta_pixel_id: string | null
          phone: string | null
          seo_description: string | null
          seo_keywords: string | null
          seo_title: string | null
          site_name: string
          topbar_text: string | null
          updated_at: string
          updated_by: string | null
          whatsapp: string | null
          whatsapp_enabled: boolean
          whatsapp_greeting: string | null
        }
        Insert: {
          about_checklist?: Json | null
          about_cta_label?: string | null
          about_cta_url?: string | null
          about_description?: string | null
          about_eyebrow?: string | null
          about_image_url?: string | null
          about_title?: string | null
          address?: string | null
          address_city?: string | null
          address_district?: string | null
          address_number?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip?: string | null
          business_hours?: string | null
          color_accent?: string | null
          color_background?: string
          color_dark?: string
          color_foreground?: string
          color_primary?: string
          color_primary_dark?: string
          color_secondary?: string
          email?: string | null
          favicon_url?: string | null
          font_body?: string
          font_display?: string
          footer_about?: string | null
          footer_text?: string | null
          google_analytics_id?: string | null
          head_snippet?: string | null
          home_blog_eyebrow?: string | null
          home_blog_title?: string | null
          home_pillars_eyebrow?: string | null
          home_pillars_title?: string | null
          home_services_eyebrow?: string | null
          home_services_title?: string | null
          home_solutions_cta_label?: string | null
          home_solutions_cta_url?: string | null
          home_solutions_description?: string | null
          home_solutions_eyebrow?: string | null
          home_solutions_image_url?: string | null
          home_solutions_title?: string | null
          home_testimonials_eyebrow?: string | null
          home_testimonials_title?: string | null
          id?: number
          logo_dark_url?: string | null
          logo_url?: string | null
          map_embed_url?: string | null
          meta_pixel_id?: string | null
          phone?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          site_name?: string
          topbar_text?: string | null
          updated_at?: string
          updated_by?: string | null
          whatsapp?: string | null
          whatsapp_enabled?: boolean
          whatsapp_greeting?: string | null
        }
        Update: {
          about_checklist?: Json | null
          about_cta_label?: string | null
          about_cta_url?: string | null
          about_description?: string | null
          about_eyebrow?: string | null
          about_image_url?: string | null
          about_title?: string | null
          address?: string | null
          address_city?: string | null
          address_district?: string | null
          address_number?: string | null
          address_state?: string | null
          address_street?: string | null
          address_zip?: string | null
          business_hours?: string | null
          color_accent?: string | null
          color_background?: string
          color_dark?: string
          color_foreground?: string
          color_primary?: string
          color_primary_dark?: string
          color_secondary?: string
          email?: string | null
          favicon_url?: string | null
          font_body?: string
          font_display?: string
          footer_about?: string | null
          footer_text?: string | null
          google_analytics_id?: string | null
          head_snippet?: string | null
          home_blog_eyebrow?: string | null
          home_blog_title?: string | null
          home_pillars_eyebrow?: string | null
          home_pillars_title?: string | null
          home_services_eyebrow?: string | null
          home_services_title?: string | null
          home_solutions_cta_label?: string | null
          home_solutions_cta_url?: string | null
          home_solutions_description?: string | null
          home_solutions_eyebrow?: string | null
          home_solutions_image_url?: string | null
          home_solutions_title?: string | null
          home_testimonials_eyebrow?: string | null
          home_testimonials_title?: string | null
          id?: number
          logo_dark_url?: string | null
          logo_url?: string | null
          map_embed_url?: string | null
          meta_pixel_id?: string | null
          phone?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          site_name?: string
          topbar_text?: string | null
          updated_at?: string
          updated_by?: string | null
          whatsapp?: string | null
          whatsapp_enabled?: boolean
          whatsapp_greeting?: string | null
        }
        Relationships: []
      }
      social_links: {
        Row: {
          created_at: string
          enabled: boolean
          id: string
          platform: string
          sort_order: number
          updated_at: string
          url: string
        }
        Insert: {
          created_at?: string
          enabled?: boolean
          id?: string
          platform: string
          sort_order?: number
          updated_at?: string
          url: string
        }
        Update: {
          created_at?: string
          enabled?: boolean
          id?: string
          platform?: string
          sort_order?: number
          updated_at?: string
          url?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string | null
          created_at: string
          id: string
          is_published: boolean
          name: string
          order_index: number
          photo_url: string | null
          role: string | null
          social_links: Json
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          name: string
          order_index?: number
          photo_url?: string | null
          role?: string | null
          social_links?: Json
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          id?: string
          is_published?: boolean
          name?: string
          order_index?: number
          photo_url?: string | null
          role?: string | null
          social_links?: Json
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author_company: string | null
          author_name: string
          author_role: string | null
          avatar_url: string | null
          created_at: string
          featured_on_home: boolean
          id: string
          is_published: boolean
          order_index: number
          quote: string
          rating: number | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          author_company?: string | null
          author_name: string
          author_role?: string | null
          avatar_url?: string | null
          created_at?: string
          featured_on_home?: boolean
          id?: string
          is_published?: boolean
          order_index?: number
          quote: string
          rating?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          author_company?: string | null
          author_name?: string
          author_role?: string | null
          avatar_url?: string | null
          created_at?: string
          featured_on_home?: boolean
          id?: string
          is_published?: boolean
          order_index?: number
          quote?: string
          rating?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      whatsapp_config: {
        Row: {
          chatbot_enabled: boolean
          enabled: boolean
          greeting: string | null
          id: number
          phone_number: string | null
          position: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          chatbot_enabled?: boolean
          enabled?: boolean
          greeting?: string | null
          id?: number
          phone_number?: string | null
          position?: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          chatbot_enabled?: boolean
          enabled?: boolean
          greeting?: string | null
          id?: number
          phone_number?: string | null
          position?: string
          updated_at?: string
          updated_by?: string | null
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
      app_role: "admin" | "editor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
    },
  },
} as const
