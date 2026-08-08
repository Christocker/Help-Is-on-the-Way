import { Category, Event } from "./types";

export const CATEGORIES: Omit<Category, "created_at">[] = [
  {
    id: "cat-1",
    name: "Psychotherapy and Counseling",
    slug: "psychotherapy-and-counseling",
    description:
      "A safe and confidential space to process emotions, understand patterns, build healthier coping skills, and receive personalized support for healing, growth, and wellbeing.",
    image_url: "/images/categories/category-1.jpg",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "cat-2",
    name: "Psychological Testing & Assessment",
    slug: "psychological-testing-and-assessment",
    description:
      "Psychological assessments using standardized psychological tools to understand cognitive, emotional, behavioral, personality, or diagnostic concerns and guide appropriate recommendations.",
    image_url: "/images/categories/category-2.jpg",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "cat-3",
    name: "Psychiatric Services",
    slug: "psychiatric-services",
    description:
      "Medical mental health care with a psychiatrist for diagnostic clarification, medication management, and treatment planning for emotional, behavioral, and psychiatric concerns.",
    image_url: "/images/categories/category-3.jpg",
    sort_order: 3,
    is_active: true,
  },
  {
    id: "cat-4",
    name: "For Couples and Families",
    slug: "for-couples-and-families",
    description:
      "Supportive sessions for couples and families to improve communication, understand relationship patterns, resolve conflicts, and strengthen healthier connections.",
    image_url: "/images/categories/category-4.jpg",
    sort_order: 4,
    is_active: true,
  },
  {
    id: "cat-5",
    name: "Initial Consultation or First-Time Clients",
    slug: "initial-consultation-or-first-time-clients",
    description:
      "A first session to help us understand your concerns, clarify your needs, and recommend the most appropriate care pathway, whether for therapy, assessment, or other mental health support.",
    image_url: "/images/categories/category-5.jpg",
    sort_order: 5,
    is_active: true,
  },
  {
    id: "cat-6",
    name: "Psychotherapy with Senior Psychologists",
    slug: "psychotherapy-with-senior-psychologists",
    description:
      "Expert-led one-on-one therapy for clients seeking deeper clinical support, personalized intervention, and guidance from psychologists with advanced experience in complex mental health concerns.",
    image_url: "/images/categories/category-6.jpg",
    sort_order: 6,
    is_active: true,
  },
];

export const EVENTS: Omit<Event, "created_at">[] = [
  // Category 1: Psychotherapy and Counseling
  {
    id: "evt-1a",
    category_id: "cat-1",
    name: "Individual Counseling or Psychotherapy (In-Person)",
    slug: "individual-counseling-or-psychotherapy-in-person",
    description:
      "A safe and confidential space to process emotions, understand patterns, build healthier coping skills, and receive personalized support for healing, growth, and wellbeing.",
    duration: 60,
    image_url: "/images/events/event-1a.jpg",
    is_active: true,
  },
  {
    id: "evt-1b",
    category_id: "cat-1",
    name: "Online Counseling or Psychotherapy (Telepsychology Session)",
    slug: "online-counseling-or-psychotherapy-telepsychology",
    description:
      "A secure, convenient virtual therapy session allowing you to receive professional mental health support from the comfort of your home through a private telepsychology platform.",
    duration: 60,
    image_url: "/images/events/event-1b.jpg",
    is_active: true,
  },
  // Category 2: Psychological Testing & Assessment
  {
    id: "evt-2a",
    category_id: "cat-2",
    name: "Comprehensive Psychological Assessment (In-Person)",
    slug: "comprehensive-psychological-assessment-in-person",
    description:
      "A thorough in-person evaluation using a battery of standardized psychological tests to assess cognitive functioning, emotional well-being, personality traits, and behavioral patterns. Results guide diagnosis and treatment planning.",
    duration: 240,
    image_url: "/images/events/event-2a.jpg",
    is_active: true,
  },
  {
    id: "evt-2b",
    category_id: "cat-2",
    name: "Online Comprehensive Psychological Assessment",
    slug: "online-comprehensive-psychological-assessment",
    description:
      "A complete psychological assessment conducted online using secure, standardized tools and a virtual interview, designed for clients who require a thorough evaluation but prefer remote access.",
    duration: 240,
    image_url: "/images/events/event-2b.jpg",
    is_active: true,
  },
  {
    id: "evt-2c",
    category_id: "cat-2",
    name: "Brief Psychological Assessment (In-Person)",
    slug: "brief-psychological-assessment-in-person",
    description:
      "A focused, shorter psychological evaluation for specific concerns such as screening for depression, anxiety, or cognitive issues, conducted in person with targeted assessment tools.",
    duration: 120,
    image_url: "/images/events/event-2c.jpg",
    is_active: true,
  },
  {
    id: "evt-2d",
    category_id: "cat-2",
    name: "Brief Psychological Assessment (Online)",
    slug: "brief-psychological-assessment-online",
    description:
      "A focused psychological evaluation conducted online using standardized screening tools and a virtual clinical interview, suitable for clients with specific, well-defined concerns.",
    duration: 120,
    image_url: "/images/events/event-2d.jpg",
    is_active: true,
  },
  {
    id: "evt-2e",
    category_id: "cat-2",
    name: "ADHD Screening",
    slug: "adhd-screening",
    description:
      "This assessment service aims to aid in the diagnosis of Attention-Deficit/Hyperactivity Disorder in individuals, from children to adults. The purpose of the assessment and diagnosis is also to lead towards developing appropriate intervention programs to address the challenges that ADHD may have on the individual. The results of this assessment is not applicable for PWD Application.",
    duration: 180,
    image_url: "/images/events/event-2e.jpg",
    is_active: true,
  },
  {
    id: "evt-2f",
    category_id: "cat-2",
    name: "Online ADHD Screening",
    slug: "online-adhd-screening",
    description:
      "A comprehensive online ADHD screening service that uses validated tools and clinical interviews conducted virtually to assess for Attention-Deficit/Hyperactivity Disorder. The results of this assessment is not applicable for PWD Application.",
    duration: 180,
    image_url: "/images/events/event-2f.jpg",
    is_active: true,
  },
  // Category 3: Psychiatric Services
  {
    id: "evt-3a",
    category_id: "cat-3",
    name: "Initial Psychiatric Consultation - First Psychiatric Session (In-Person)",
    slug: "initial-psychiatric-consultation-first-session-in-person",
    description:
      "This psychiatric consultation allows the patient to discuss with the psychiatrist their concerns, problems, or questions regarding mental health. This service is for new patients who are 18 years old and above only.",
    duration: 45,
    image_url: "/images/events/event-3a.jpg",
    is_active: true,
  },
  {
    id: "evt-3b",
    category_id: "cat-3",
    name: "Initial Online Psychiatric Consultation (First Psychiatric Session)",
    slug: "initial-online-psychiatric-consultation-first-session",
    description:
      "A first-time psychiatric consultation conducted online via secure video conferencing. The psychiatrist will conduct a comprehensive evaluation, provide diagnostic clarification, and discuss treatment options including medication management if appropriate. For new patients 18 years old and above only.",
    duration: 45,
    image_url: "/images/events/event-3b.jpg",
    is_active: true,
  },
  {
    id: "evt-3c",
    category_id: "cat-3",
    name: "Psychiatric Consultation - Succeeding Psychiatric Sessions (In-Person)",
    slug: "psychiatric-consultation-succeeding-sessions-in-person",
    description:
      "Ongoing in-person psychiatric sessions for existing patients to monitor progress, adjust medication, and continue treatment planning. For established patients only.",
    duration: 30,
    image_url: "/images/events/event-3c.jpg",
    is_active: true,
  },
  {
    id: "evt-3d",
    category_id: "cat-3",
    name: "Online Psychiatric Consultation (Succeeding Psychiatric Sessions)",
    slug: "online-psychiatric-consultation-succeeding-sessions",
    description:
      "Follow-up psychiatric consultations conducted online for existing patients to continue medication management, monitor treatment progress, and make adjustments as needed. For established patients only.",
    duration: 30,
    image_url: "/images/events/event-3d.jpg",
    is_active: true,
  },
  {
    id: "evt-3e",
    category_id: "cat-3",
    name: "Initial Adolescent Psychiatric Consultation - First Psychiatric Session (In-Person)",
    slug: "initial-adolescent-psychiatric-consultation-first-session-in-person",
    description:
      "A first-time psychiatric consultation for adolescents (below 18 years old) conducted in person. The psychiatrist will evaluate mental health concerns, provide diagnostic clarification, and discuss treatment options appropriate for the adolescent's developmental stage.",
    duration: 45,
    image_url: "/images/events/event-3e.jpg",
    is_active: true,
  },
  {
    id: "evt-3f",
    category_id: "cat-3",
    name: "Initial Online Adolescent Psychiatric Consultation (First Psychiatric Session)",
    slug: "initial-online-adolescent-psychiatric-consultation-first-session",
    description:
      "A first-time psychiatric consultation for adolescents (below 18 years old) conducted online via secure video conferencing. The psychiatrist will conduct a comprehensive evaluation, provide diagnostic clarification, and discuss appropriate treatment options.",
    duration: 45,
    image_url: "/images/events/event-3f.jpg",
    is_active: true,
  },
  {
    id: "evt-3g",
    category_id: "cat-3",
    name: "Adolescent Psychiatric Consultation - Succeeding Psychiatric Sessions (In-Person)",
    slug: "adolescent-psychiatric-consultation-succeeding-sessions-in-person",
    description:
      "Follow-up in-person psychiatric sessions for adolescent patients to monitor progress, adjust medication, and continue treatment planning. For established adolescent patients only.",
    duration: 30,
    image_url: "/images/events/event-3g.jpg",
    is_active: true,
  },
  {
    id: "evt-3h",
    category_id: "cat-3",
    name: "Online Adolescent Psychiatric Consultation (Succeeding Psychiatric Sessions)",
    slug: "online-adolescent-psychiatric-consultation-succeeding-sessions",
    description:
      "Follow-up online psychiatric consultations for adolescent patients to continue medication management, monitor treatment progress, and discuss ongoing care. For established adolescent patients only.",
    duration: 30,
    image_url: "/images/events/event-3h.jpg",
    is_active: true,
  },
  // Category 4: For Couples and Families
  {
    id: "evt-4a",
    category_id: "cat-4",
    name: "Couples or Marital Counseling",
    slug: "couples-or-marital-counseling",
    description:
      "In-person therapeutic sessions for couples to improve communication, resolve conflicts, deepen emotional connection, and work through relationship challenges with the guidance of a trained professional.",
    duration: 90,
    image_url: "/images/events/event-4a.jpg",
    is_active: true,
  },
  {
    id: "evt-4b",
    category_id: "cat-4",
    name: "Online Couples or Marital Counseling",
    slug: "online-couples-or-marital-counseling",
    description:
      "Virtual couples therapy sessions conducted through a secure online platform, allowing partners to work on their relationship from separate or shared locations with professional guidance.",
    duration: 90,
    image_url: "/images/events/event-4b.jpg",
    is_active: true,
  },
  {
    id: "evt-4c",
    category_id: "cat-4",
    name: "Family Therapy",
    slug: "family-therapy",
    description:
      "Therapeutic sessions involving multiple family members to improve communication, resolve conflicts, understand family dynamics, and build healthier relationships within the family system.",
    duration: 90,
    image_url: "/images/events/event-4c.jpg",
    is_active: true,
  },
  // Category 5: Initial Consultation or First-Time Clients
  {
    id: "evt-5a",
    category_id: "cat-5",
    name: "Mental Health Consultation (In-Person)",
    slug: "mental-health-consultation-in-person",
    description:
      "An initial in-person consultation to understand your mental health concerns, assess your needs, and recommend the most appropriate path forward whether for therapy, assessment, or psychiatric services.",
    duration: 60,
    image_url: "/images/events/event-5a.jpg",
    is_active: true,
  },
  {
    id: "evt-5b",
    category_id: "cat-5",
    name: "Online Mental Health Consultation",
    slug: "online-mental-health-consultation",
    description:
      "A first-time virtual consultation to discuss your mental health concerns, understand your situation, and receive professional guidance on the most suitable services and next steps for your care.",
    duration: 60,
    image_url: "/images/events/event-5b.jpg",
    is_active: true,
  },
  {
    id: "evt-5c",
    category_id: "cat-5",
    name: "Initial Psychiatric Consultation - First Psychiatric Session (In-Person)",
    slug: "initial-psychiatric-consultation-first-session-in-person-2",
    description:
      "This psychiatric consultation allows the patient to discuss with the psychiatrist their concerns, problems, or questions regarding mental health. This service is for new patients who are 18 years old and above only.",
    duration: 45,
    image_url: "/images/events/event-5c.jpg",
    is_active: true,
  },
  {
    id: "evt-5d",
    category_id: "cat-5",
    name: "Initial Online Psychiatric Consultation (First Psychiatric Session)",
    slug: "initial-online-psychiatric-consultation-first-session-2",
    description:
      "A first-time psychiatric consultation conducted online. The psychiatrist will conduct a comprehensive evaluation, provide diagnostic clarification, and discuss treatment options. For new patients 18 years old and above only.",
    duration: 45,
    image_url: "/images/events/event-5d.jpg",
    is_active: true,
  },
  {
    id: "evt-5e",
    category_id: "cat-5",
    name: "Initial Adolescent Psychiatric Consultation - First Psychiatric Session (In-Person)",
    slug: "initial-adolescent-psychiatric-consultation-first-session-in-person-2",
    description:
      "A first-time psychiatric consultation for adolescents (below 18 years old) conducted in person. The psychiatrist will evaluate mental health concerns, provide diagnostic clarification, and discuss treatment options appropriate for the adolescent's developmental stage.",
    duration: 45,
    image_url: "/images/events/event-5e.jpg",
    is_active: true,
  },
  {
    id: "evt-5f",
    category_id: "cat-5",
    name: "Initial Online Adolescent Psychiatric Consultation (First Psychiatric Session)",
    slug: "initial-online-adolescent-psychiatric-consultation-first-session-2",
    description:
      "A first-time psychiatric consultation for adolescents (below 18 years old) conducted online. The psychiatrist will conduct a comprehensive evaluation and discuss appropriate treatment options for the adolescent.",
    duration: 45,
    image_url: "/images/events/event-5f.jpg",
    is_active: true,
  },
  // Category 6: Psychotherapy with Senior Psychologists
  {
    id: "evt-6a",
    category_id: "cat-6",
    name: "Individual Psychotherapy - Dr. Renz Argao (In-Person)",
    slug: "individual-psychotherapy-dr-renz-argao-in-person",
    description:
      "Begin your healing journey with Dr. Renz Argao, Chief Clinical Psychologist, through compassionate, expert-led psychotherapy grounded in advanced clinical training and trauma-informed care. He is an Internationally Certified Expert in Traumatic Stress, a Licensed Psychologist and Psychometrician, and a Certified Specialist in Clinical Psychology, with a PhD in Clinical Psychology from the University of Santo Tomas.",
    duration: 60,
    image_url: "/images/events/event-6a.jpg",
    is_active: true,
  },
  {
    id: "evt-6b",
    category_id: "cat-6",
    name: "Online Psychotherapy - Dr. Renz Argao",
    slug: "online-psychotherapy-dr-renz-argao",
    description:
      "Receive expert-led psychotherapy from Dr. Renz Argao via secure online video conferencing. Benefit from advanced clinical training and trauma-informed care in a convenient virtual setting.",
    duration: 60,
    image_url: "/images/events/event-6b.jpg",
    is_active: true,
  },
  {
    id: "evt-6c",
    category_id: "cat-6",
    name: "Individual Psychotherapy - Dr. Sherna Bangalan (In-Person)",
    slug: "individual-psychotherapy-dr-sherna-bangalan-in-person",
    description:
      "In-person psychotherapy sessions with Dr. Sherna Bangalan, a senior psychologist with extensive clinical experience. Receive personalized therapeutic support grounded in evidence-based approaches.",
    duration: 60,
    image_url: "/images/events/event-6c.jpg",
    is_active: true,
  },
  {
    id: "evt-6d",
    category_id: "cat-6",
    name: "Online Psychotherapy - Dr. Sherna Bangalan",
    slug: "online-psychotherapy-dr-sherna-bangalan",
    description:
      "Virtual psychotherapy sessions with Dr. Sherna Bangalan, offering the same expert clinical care and personalized support through a secure online platform.",
    duration: 60,
    image_url: "/images/events/event-6d.jpg",
    is_active: true,
  },
  {
    id: "evt-6e",
    category_id: "cat-6",
    name: "Individual Psychotherapy - Ms. Hazel Wendy Basilio (In-Person)",
    slug: "individual-psychotherapy-ms-hazel-wendy-basilio-in-person",
    description:
      "In-person individual psychotherapy sessions with Ms. Hazel Wendy Basilio, providing compassionate and skilled therapeutic support for various mental health concerns.",
    duration: 60,
    image_url: "/images/events/event-6e.jpg",
    is_active: true,
  },
  {
    id: "evt-6f",
    category_id: "cat-6",
    name: "Online Psychotherapy - Ms. Novee Pabon",
    slug: "online-psychotherapy-ms-novee-pabon",
    description:
      "Virtual psychotherapy sessions with Ms. Novee Pabon, offering accessible and professional mental health support through a secure online telepsychology platform.",
    duration: 60,
    image_url: "/images/events/event-6f.jpg",
    is_active: true,
  },
];

export function getEventsByCategory(categoryId: string) {
  return EVENTS.filter((e) => e.category_id === categoryId);
}

export function getCategoryById(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}

export function getEventById(id: string) {
  return EVENTS.find((e) => e.id === id);
}
