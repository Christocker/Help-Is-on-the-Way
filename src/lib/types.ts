export type UserRole = "client" | "admin";

export type AppointmentStatus =
  | "pending"
  | "submitted"
  | "under_review"
  | "confirmed"
  | "rescheduled"
  | "cancelled"
  | "completed";

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  contact_number: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Event {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  duration: number | null;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Appointment {
  id: string;
  client_id: string;
  category_id: string;
  event_id: string;
  requested_date: string | null;
  requested_time: string | null;
  status: AppointmentStatus;
  client_notes: string | null;
  admin_notes: string | null;
  argao_reference: string | null;
  created_at: string;
  updated_at: string;
}

export interface AppointmentWithDetails extends Appointment {
  profiles: Profile | null;
  categories: Category | null;
  events: Event | null;
}

export interface Availability {
  id: string;
  date: string;
  time_slot: string;
  is_available: boolean;
  max_bookings: number;
  current_bookings: number;
  created_at: string;
}

export interface Instruction {
  id: string;
  title: string;
  content: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  client_id: string;
  appointment_id: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface BookingData {
  category_id: string;
  event_id: string;
  client_notes?: string;
}

export const STATUS_LABELS: Record<AppointmentStatus, string> = {
  pending: "Pending",
  submitted: "Submitted",
  under_review: "Under Review",
  confirmed: "Confirmed",
  rescheduled: "Rescheduled",
  cancelled: "Cancelled",
  completed: "Completed",
};

export const STATUS_DESCRIPTIONS: Record<AppointmentStatus, string> = {
  pending:
    "Your appointment request is being prepared. Please complete the booking process.",
  submitted:
    "Your appointment request has been received. Our team is arranging your appointment with our partner mental healthcare provider.",
  under_review:
    "Our team is reviewing your appointment request and coordinating with our partner provider.",
  confirmed:
    "Your appointment has been confirmed. Please review the details and prepare for your session.",
  rescheduled:
    "Your requested schedule was unavailable. Please review the updated schedule.",
  cancelled: "This appointment has been cancelled.",
  completed: "This appointment has been completed.",
};

export const STATUS_COLORS: Record<AppointmentStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  submitted: "bg-violet-100 text-violet-800 border-violet-200",
  under_review: "bg-purple-100 text-purple-800 border-purple-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  rescheduled: "bg-orange-100 text-orange-800 border-orange-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
  completed: "bg-gray-100 text-gray-800 border-gray-200",
};
