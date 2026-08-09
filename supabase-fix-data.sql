-- ============================================
-- Help Is on the Way - DATABASE FIXES
-- Run this ENTIRE file in the Supabase SQL Editor.
-- Safe to re-run.
-- ============================================

-- ============================================
-- FIX 1: Profile trigger must save contact_number
-- The live DB is using the original trigger which stored only
-- full_name/email/role, so contact_number was blank after signup.
-- This recreates it to also capture contact_number (and build the
-- full name from first/middle/last parts).
-- ============================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  full_name_value TEXT;
BEGIN
  full_name_value := COALESCE(
    NULLIF(NEW.raw_user_meta_data->>'first_name', ''),
    ''
  ) || CASE
    WHEN COALESCE(NEW.raw_user_meta_data->>'middle_name', '') <> '' THEN
      ' ' || NEW.raw_user_meta_data->>'middle_name'
    ELSE ''
  END || CASE
    WHEN COALESCE(NEW.raw_user_meta_data->>'last_name', '') <> '' THEN
      ' ' || NEW.raw_user_meta_data->>'last_name'
    ELSE ''
  END;

  IF NULLIF(full_name_value, '') IS NULL THEN
    full_name_value := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email);
  END IF;

  INSERT INTO public.profiles (id, full_name, email, contact_number, role)
  VALUES (
    NEW.id,
    full_name_value,
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
-- FIX 2: Seed the events table.
-- The app's booking flow references services by slug; the database
-- must contain the corresponding events rows (currently empty).
-- ============================================

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Individual Counseling or Psychotherapy (In-Person)', 'individual-counseling-or-psychotherapy-in-person', 'A safe and confidential space to process emotions, understand patterns, build healthier coping skills, and receive personalized support for healing, growth, and wellbeing.', 60, '/images/events/event-1a.jpg', true
FROM categories c WHERE c.slug = 'psychotherapy-and-counseling'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Online Counseling or Psychotherapy (Telepsychology Session)', 'online-counseling-or-psychotherapy-telepsychology', 'A secure, convenient virtual therapy session allowing you to receive professional mental health support from the comfort of your home through a private telepsychology platform.', 60, '/images/events/event-1b.jpg', true
FROM categories c WHERE c.slug = 'psychotherapy-and-counseling'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Comprehensive Psychological Assessment (In-Person)', 'comprehensive-psychological-assessment-in-person', 'A thorough in-person evaluation using a battery of standardized psychological tests to assess cognitive functioning, emotional well-being, personality traits, and behavioral patterns. Results guide diagnosis and treatment planning.', 240, '/images/events/event-2a.jpg', true
FROM categories c WHERE c.slug = 'psychological-testing-and-assessment'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Online Comprehensive Psychological Assessment', 'online-comprehensive-psychological-assessment', 'A complete psychological assessment conducted online using secure, standardized tools and a virtual interview, designed for clients who require a thorough evaluation but prefer remote access.', 240, '/images/events/event-2b.jpg', true
FROM categories c WHERE c.slug = 'psychological-testing-and-assessment'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Brief Psychological Assessment (In-Person)', 'brief-psychological-assessment-in-person', 'A focused, shorter psychological evaluation for specific concerns such as screening for depression, anxiety, or cognitive issues, conducted in person with targeted assessment tools.', 120, '/images/events/event-2c.jpg', true
FROM categories c WHERE c.slug = 'psychological-testing-and-assessment'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Brief Psychological Assessment (Online)', 'brief-psychological-assessment-online', 'A focused psychological evaluation conducted online using standardized screening tools and a virtual clinical interview, suitable for clients with specific, well-defined concerns.', 120, '/images/events/event-2d.jpg', true
FROM categories c WHERE c.slug = 'psychological-testing-and-assessment'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'ADHD Screening', 'adhd-screening', 'This assessment service aims to aid in the diagnosis of Attention-Deficit/Hyperactivity Disorder in individuals, from children to adults. The purpose of the assessment and diagnosis is also to lead towards developing appropriate intervention programs to address the challenges that ADHD may have on the individual. The results of this assessment is not applicable for PWD Application.', 180, '/images/events/event-2e.jpg', true
FROM categories c WHERE c.slug = 'psychological-testing-and-assessment'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Online ADHD Screening', 'online-adhd-screening', 'A comprehensive online ADHD screening service that uses validated tools and clinical interviews conducted virtually to assess for Attention-Deficit/Hyperactivity Disorder. The results of this assessment is not applicable for PWD Application.', 180, '/images/events/event-2f.jpg', true
FROM categories c WHERE c.slug = 'psychological-testing-and-assessment'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Initial Psychiatric Consultation - First Psychiatric Session (In-Person)', 'initial-psychiatric-consultation-first-session-in-person', 'This psychiatric consultation allows the patient to discuss with the psychiatrist their concerns, problems, or questions regarding mental health. This service is for new patients who are 18 years old and above only.', 45, '/images/events/event-3a.jpg', true
FROM categories c WHERE c.slug = 'psychiatric-services'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Initial Online Psychiatric Consultation (First Psychiatric Session)', 'initial-online-psychiatric-consultation-first-session', 'A first-time psychiatric consultation conducted online via secure video conferencing. The psychiatrist will conduct a comprehensive evaluation, provide diagnostic clarification, and discuss treatment options including medication management if appropriate. For new patients 18 years old and above only.', 45, '/images/events/event-3b.jpg', true
FROM categories c WHERE c.slug = 'psychiatric-services'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Psychiatric Consultation - Succeeding Psychiatric Sessions (In-Person)', 'psychiatric-consultation-succeeding-sessions-in-person', 'Ongoing in-person psychiatric sessions for existing patients to monitor progress, adjust medication, and continue treatment planning. For established patients only.', 30, '/images/events/event-3c.jpg', true
FROM categories c WHERE c.slug = 'psychiatric-services'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Online Psychiatric Consultation (Succeeding Psychiatric Sessions)', 'online-psychiatric-consultation-succeeding-sessions', 'Follow-up psychiatric consultations conducted online for existing patients to continue medication management, monitor treatment progress, and make adjustments as needed. For established patients only.', 30, '/images/events/event-3d.jpg', true
FROM categories c WHERE c.slug = 'psychiatric-services'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Initial Adolescent Psychiatric Consultation - First Psychiatric Session (In-Person)', 'initial-adolescent-psychiatric-consultation-first-session-in-person', 'A first-time psychiatric consultation for adolescents (below 18 years old) conducted in person. The psychiatrist will evaluate mental health concerns, provide diagnostic clarification, and discuss treatment options appropriate for the adolescent developmental stage.', 45, '/images/events/event-3e.jpg', true
FROM categories c WHERE c.slug = 'psychiatric-services'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Initial Online Adolescent Psychiatric Consultation (First Psychiatric Session)', 'initial-online-adolescent-psychiatric-consultation-first-session', 'A first-time psychiatric consultation for adolescents (below 18 years old) conducted online via secure video conferencing. The psychiatrist will conduct a comprehensive evaluation, provide diagnostic clarification, and discuss appropriate treatment options.', 45, '/images/events/event-3f.jpg', true
FROM categories c WHERE c.slug = 'psychiatric-services'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Adolescent Psychiatric Consultation - Succeeding Psychiatric Sessions (In-Person)', 'adolescent-psychiatric-consultation-succeeding-sessions-in-person', 'Follow-up in-person psychiatric sessions for adolescent patients to monitor progress, adjust medication, and continue treatment planning. For established adolescent patients only.', 30, '/images/events/event-3g.jpg', true
FROM categories c WHERE c.slug = 'psychiatric-services'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Online Adolescent Psychiatric Consultation (Succeeding Psychiatric Sessions)', 'online-adolescent-psychiatric-consultation-succeeding-sessions', 'Follow-up online psychiatric consultations for adolescent patients to continue medication management, monitor treatment progress, and discuss ongoing care. For established adolescent patients only.', 30, '/images/events/event-3h.jpg', true
FROM categories c WHERE c.slug = 'psychiatric-services'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Couples or Marital Counseling', 'couples-or-marital-counseling', 'In-person therapeutic sessions for couples to improve communication, resolve conflicts, deepen emotional connection, and work through relationship challenges with the guidance of a trained professional.', 90, '/images/events/event-4a.jpg', true
FROM categories c WHERE c.slug = 'for-couples-and-families'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Online Couples or Marital Counseling', 'online-couples-or-marital-counseling', 'Virtual couples therapy sessions conducted through a secure online platform, allowing partners to work on their relationship from separate or shared locations with professional guidance.', 90, '/images/events/event-4b.jpg', true
FROM categories c WHERE c.slug = 'for-couples-and-families'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Family Therapy', 'family-therapy', 'Therapeutic sessions involving multiple family members to improve communication, resolve conflicts, understand family dynamics, and build healthier relationships within the family system.', 90, '/images/events/event-4c.jpg', true
FROM categories c WHERE c.slug = 'for-couples-and-families'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Mental Health Consultation (In-Person)', 'mental-health-consultation-in-person', 'An initial in-person consultation to understand your mental health concerns, assess your needs, and recommend the most appropriate path forward whether for therapy, assessment, or psychiatric services.', 60, '/images/events/event-5a.jpg', true
FROM categories c WHERE c.slug = 'initial-consultation-or-first-time-clients'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Online Mental Health Consultation', 'online-mental-health-consultation', 'A first-time virtual consultation to discuss your mental health concerns, understand your situation, and receive professional guidance on the most suitable services and next steps for your care.', 60, '/images/events/event-5b.jpg', true
FROM categories c WHERE c.slug = 'initial-consultation-or-first-time-clients'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Initial Psychiatric Consultation - First Psychiatric Session (In-Person)', 'initial-psychiatric-consultation-first-session-in-person-2', 'This psychiatric consultation allows the patient to discuss with the psychiatrist their concerns, problems, or questions regarding mental health. This service is for new patients who are 18 years old and above only.', 45, '/images/events/event-5c.jpg', true
FROM categories c WHERE c.slug = 'initial-consultation-or-first-time-clients'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Initial Online Psychiatric Consultation (First Psychiatric Session)', 'initial-online-psychiatric-consultation-first-session-2', 'A first-time psychiatric consultation conducted online. The psychiatrist will conduct a comprehensive evaluation, provide diagnostic clarification, and discuss treatment options. For new patients 18 years old and above only.', 45, '/images/events/event-5d.jpg', true
FROM categories c WHERE c.slug = 'initial-consultation-or-first-time-clients'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Initial Adolescent Psychiatric Consultation - First Psychiatric Session (In-Person)', 'initial-adolescent-psychiatric-consultation-first-session-in-person-2', 'A first-time psychiatric consultation for adolescents (below 18 years old) conducted in person. The psychiatrist will evaluate mental health concerns, provide diagnostic clarification, and discuss treatment options appropriate for the adolescent developmental stage.', 45, '/images/events/event-5e.jpg', true
FROM categories c WHERE c.slug = 'initial-consultation-or-first-time-clients'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Initial Online Adolescent Psychiatric Consultation (First Psychiatric Session)', 'initial-online-adolescent-psychiatric-consultation-first-session-2', 'A first-time psychiatric consultation for adolescents (below 18 years old) conducted online. The psychiatrist will conduct a comprehensive evaluation and discuss appropriate treatment options for the adolescent.', 45, '/images/events/event-5f.jpg', true
FROM categories c WHERE c.slug = 'initial-consultation-or-first-time-clients'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Individual Psychotherapy - Dr. Renz Argao (In-Person)', 'individual-psychotherapy-dr-renz-argao-in-person', 'Begin your healing journey with Dr. Renz Argao, Chief Clinical Psychologist, through compassionate, expert-led psychotherapy grounded in advanced clinical training and trauma-informed care. He is an Internationally Certified Expert in Traumatic Stress, a Licensed Psychologist and Psychometrician, and a Certified Specialist in Clinical Psychology, with a PhD in Clinical Psychology from the University of Santo Tomas.', 60, '/images/events/event-6a.jpg', true
FROM categories c WHERE c.slug = 'psychotherapy-with-senior-psychologists'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Online Psychotherapy - Dr. Renz Argao', 'online-psychotherapy-dr-renz-argao', 'Receive expert-led psychotherapy from Dr. Renz Argao via secure online video conferencing. Benefit from advanced clinical training and trauma-informed care in a convenient virtual setting.', 60, '/images/events/event-6b.jpg', true
FROM categories c WHERE c.slug = 'psychotherapy-with-senior-psychologists'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Individual Psychotherapy - Dr. Sherna Bangalan (In-Person)', 'individual-psychotherapy-dr-sherna-bangalan-in-person', 'In-person psychotherapy sessions with Dr. Sherna Bangalan, a senior psychologist with extensive clinical experience. Receive personalized therapeutic support grounded in evidence-based approaches.', 60, '/images/events/event-6c.jpg', true
FROM categories c WHERE c.slug = 'psychotherapy-with-senior-psychologists'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Online Psychotherapy - Dr. Sherna Bangalan', 'online-psychotherapy-dr-sherna-bangalan', 'Virtual psychotherapy sessions with Dr. Sherna Bangalan, offering the same expert clinical care and personalized support through a secure online platform.', 60, '/images/events/event-6d.jpg', true
FROM categories c WHERE c.slug = 'psychotherapy-with-senior-psychologists'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Individual Psychotherapy - Ms. Hazel Wendy Basilio (In-Person)', 'individual-psychotherapy-ms-hazel-wendy-basilio-in-person', 'In-person individual psychotherapy sessions with Ms. Hazel Wendy Basilio, providing compassionate and skilled therapeutic support for various mental health concerns.', 60, '/images/events/event-6e.jpg', true
FROM categories c WHERE c.slug = 'psychotherapy-with-senior-psychologists'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;

INSERT INTO events (category_id, name, slug, description, duration, image_url, is_active)
SELECT c.id, 'Online Psychotherapy - Ms. Novee Pabon', 'online-psychotherapy-ms-novee-pabon', 'Virtual psychotherapy sessions with Ms. Novee Pabon, offering accessible and professional mental health support through a secure online telepsychology platform.', 60, '/images/events/event-6f.jpg', true
FROM categories c WHERE c.slug = 'psychotherapy-with-senior-psychologists'
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description, duration = EXCLUDED.duration, image_url = EXCLUDED.image_url, is_active = true;
