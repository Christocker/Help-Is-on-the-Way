-- ============================================
-- FIX: RLS infinite recursion + enable full schema
-- ============================================
-- Paste this entire file into your Supabase SQL Editor and run it.
-- It is safe to run multiple times (uses CREATE OR REPLACE / DROP ... IF EXISTS).

-- 1) Helper functions (SECURITY DEFINER avoids recursion)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION get_my_role()
RETURNS public.user_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM profiles WHERE id = auth.uid()
$$;

-- 2) Drop the buggy policies (safe if they don't exist)
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Anyone can view active categories" ON categories;
DROP POLICY IF EXISTS "Admins can manage categories" ON categories;
DROP POLICY IF EXISTS "Anyone can view active events" ON events;
DROP POLICY IF EXISTS "Admins can manage events" ON events;
DROP POLICY IF EXISTS "Anyone can view available slots" ON availability;
DROP POLICY IF EXISTS "Admins can manage availability" ON availability;
DROP POLICY IF EXISTS "Clients can view their own appointments" ON appointments;
DROP POLICY IF EXISTS "Admins can view all appointments" ON appointments;
DROP POLICY IF EXISTS "Clients can create their own appointments" ON appointments;
DROP POLICY IF EXISTS "Admins can update appointments" ON appointments;
DROP POLICY IF EXISTS "Clients can update their own appointments (limited fields)" ON appointments;
DROP POLICY IF EXISTS "Anyone can view active instructions" ON instructions;
DROP POLICY IF EXISTS "Admins can manage instructions" ON instructions;
DROP POLICY IF EXISTS "Clients can view their own notifications" ON notifications;
DROP POLICY IF EXISTS "Admins can manage notifications" ON notifications;

-- 3) Recreate policies using the safe helpers

-- Profiles
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON profiles FOR SELECT
  USING (is_admin());

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND role = get_my_role()
  );

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Categories
CREATE POLICY "Anyone can view active categories"
  ON categories FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage categories"
  ON categories FOR ALL
  USING (is_admin());

-- Events
CREATE POLICY "Anyone can view active events"
  ON events FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage events"
  ON events FOR ALL
  USING (is_admin());

-- Availability
CREATE POLICY "Anyone can view available slots"
  ON availability FOR SELECT
  USING (is_available = true AND current_bookings < max_bookings);

CREATE POLICY "Admins can manage availability"
  ON availability FOR ALL
  USING (is_admin());

-- Appointments
CREATE POLICY "Clients can view their own appointments"
  ON appointments FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "Admins can view all appointments"
  ON appointments FOR SELECT
  USING (is_admin());

CREATE POLICY "Clients can create their own appointments"
  ON appointments FOR INSERT
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Admins can update appointments"
  ON appointments FOR UPDATE
  USING (is_admin());

-- Instructions
CREATE POLICY "Anyone can view active instructions"
  ON instructions FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage instructions"
  ON instructions FOR ALL
  USING (is_admin());

-- Notifications
CREATE POLICY "Clients can view their own notifications"
  ON notifications FOR SELECT
  USING (client_id = auth.uid());

CREATE POLICY "Admins can manage notifications"
  ON notifications FOR ALL
  USING (is_admin());
