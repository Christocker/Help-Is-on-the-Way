-- Migration: make appointment schedule columns optional
-- Client no longer picks a date/time at booking; the admin emails a
-- proposed schedule within 24-48 hours, so the columns must allow NULL.
-- Run this once in the Supabase SQL Editor.

ALTER TABLE appointments
  ALTER COLUMN requested_date DROP NOT NULL,
  ALTER COLUMN requested_time DROP NOT NULL;
