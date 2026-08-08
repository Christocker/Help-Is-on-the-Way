-- Help Is on the Way - Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum type for user roles
CREATE TYPE user_role AS ENUM ('client', 'admin');

-- Create enum type for appointment statuses
CREATE TYPE appointment_status AS ENUM (
  'pending',
  'submitted',
  'under_review',
  'confirmed',
  'rescheduled',
  'cancelled',
  'completed'
);

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  contact_number TEXT,
  role user_role NOT NULL DEFAULT 'client',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL DEFAULT '',
  duration INTEGER,
  image_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Availability table
CREATE TABLE availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL,
  time_slot TEXT NOT NULL,
  is_available BOOLEAN NOT NULL DEFAULT true,
  max_bookings INTEGER NOT NULL DEFAULT 1,
  current_bookings INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(date, time_slot)
);

-- Appointments table
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE RESTRICT,
  requested_date DATE NOT NULL,
  requested_time TEXT NOT NULL,
  status appointment_status NOT NULL DEFAULT 'submitted',
  client_notes TEXT,
  admin_notes TEXT,
  argao_reference TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Instructions table
CREATE TABLE instructions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  appointment_id UUID REFERENCES appointments(id) ON DELETE SET NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_events_category ON events(category_id);
CREATE INDEX idx_appointments_client ON appointments(client_id);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_date ON appointments(requested_date);
CREATE INDEX idx_notifications_client ON notifications(client_id);
CREATE INDEX idx_notifications_unread ON notifications(client_id) WHERE is_read = false;
CREATE INDEX idx_availability_date ON availability(date);
CREATE INDEX idx_categories_sort ON categories(sort_order);

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE instructions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id AND role = (
    SELECT role FROM profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Categories policies
CREATE POLICY "Anyone can view active categories"
  ON categories FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Events policies
CREATE POLICY "Anyone can view active events"
  ON events FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage events"
  ON events FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Availability policies
CREATE POLICY "Anyone can view available slots"
  ON availability FOR SELECT
  USING (is_available = true AND current_bookings < max_bookings);

CREATE POLICY "Admins can manage availability"
  ON availability FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Appointments policies
CREATE POLICY "Clients can view their own appointments"
  ON appointments FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "Admins can view all appointments"
  ON appointments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Clients can create their own appointments"
  ON appointments FOR INSERT
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Admins can update appointments"
  ON appointments FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Clients can update their own appointments (limited fields)"
  ON appointments FOR UPDATE
  USING (client_id = auth.uid())
  WITH CHECK (
    client_id = auth.uid()
    AND status = (
      SELECT status FROM appointments WHERE id = id
    )
  );

-- Instructions policies
CREATE POLICY "Anyone can view active instructions"
  ON instructions FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage instructions"
  ON instructions FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Notifications policies
CREATE POLICY "Clients can view their own notifications"
  ON notifications FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "Admins can manage notifications"
  ON notifications FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- AUTO-CREATE PROFILE ON SIGNUP
-- ============================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, contact_number, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email,
    NULLIF(NEW.raw_user_meta_data->>'contact_number', ''),
    'client'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- SEED DATA: Categories
-- ============================================

INSERT INTO categories (name, slug, description, image_url, sort_order) VALUES
  ('Psychotherapy and Counseling', 'psychotherapy-and-counseling', 'A safe and confidential space to process emotions, understand patterns, build healthier coping skills, and receive personalized support for healing, growth, and wellbeing.', '/images/categories/category-1.jpg', 1),
  ('Psychological Testing & Assessment', 'psychological-testing-and-assessment', 'Psychological assessments using standardized psychological tools to understand cognitive, emotional, behavioral, personality, or diagnostic concerns and guide appropriate recommendations.', '/images/categories/category-2.jpg', 2),
  ('Psychiatric Services', 'psychiatric-services', 'Medical mental health care with a psychiatrist for diagnostic clarification, medication management, and treatment planning for emotional, behavioral, and psychiatric concerns.', '/images/categories/category-3.jpg', 3),
  ('For Couples and Families', 'for-couples-and-families', 'Supportive sessions for couples and families to improve communication, understand relationship patterns, resolve conflicts, and strengthen healthier connections.', '/images/categories/category-4.jpg', 4),
  ('Initial Consultation or First-Time Clients', 'initial-consultation-or-first-time-clients', 'A first session to help us understand your concerns, clarify your needs, and recommend the most appropriate care pathway, whether for therapy, assessment, or other mental health support.', '/images/categories/category-5.jpg', 5),
  ('Psychotherapy with Senior Psychologists', 'psychotherapy-with-senior-psychologists', 'Expert-led one-on-one therapy for clients seeking deeper clinical support, personalized intervention, and guidance from psychologists with advanced experience in complex mental health concerns.', '/images/categories/category-6.jpg', 6);

-- Note: Events will be inserted after categories exist. Use the IDs from the above insert to link events.

-- ============================================
-- ADMIN ACCOUNT (optional)
-- ============================================
-- The app auto-creates this account on first login with username "admin".
-- You can also create it manually here if auto-provisioning is disabled:
--
-- The login mapping: username "admin" is converted to this email internally.
--   Username: admin
--   Password: helpisontheway
--
-- To create the account manually (replaces auto-provision), run:
--   INSERT INTO auth.users (instance_id, id, aud, role, email, encrypted_password,
--     email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at)
--   VALUES (
--     '00000000-0000-0000-0000-000000000000',
--     gen_random_uuid(),
--     'authenticated',
--     'authenticated',
--     'admin@helpisontheway.ph',
--     crypt('helpisontheway', gen_salt('bf')),
--     now(),
--     '{"provider":"email","providers":["email"]}',
--     '{"full_name":"Administrator","role":"admin"}',
--     now(),
--     now()
--   );
-- Then set the role:
--   UPDATE profiles SET role = 'admin' WHERE email = 'admin@helpisontheway.ph';
--
-- NOTE: If you created this account through the app's auto-provisioning, do NOT
-- run the manual insert again (it will fail on the unique email constraint).
