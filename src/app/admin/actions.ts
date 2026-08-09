"use server";

import { createClient } from "@/lib/supabase/server";
import { sendMail, textFromHtml } from "@/lib/email";
import { STATUS_LABELS, STATUS_DESCRIPTIONS } from "@/lib/types";
import type { AppointmentStatus } from "@/lib/types";

function formatDate(dateString: string): string {
  return new Date(dateString + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatTime(timeString: string): string {
  const [hours, minutes] = timeString.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
}

function buildEmailHtml(input: {
  clientName: string;
  categoryName: string;
  eventName: string;
  date: string;
  time: string;
  status: AppointmentStatus;
}) {
  const statusLabel = STATUS_LABELS[input.status];
  const description = STATUS_DESCRIPTIONS[input.status];

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f3f1f8;padding:24px;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e1ee;">
      <div style="background:#2e1065;padding:24px 32px;">
        <h1 style="margin:0;color:#ffffff;font-size:20px;">Help Is on the Way</h1>
        <p style="margin:4px 0 0;color:#c4b5fd;font-size:13px;">Mental Healthcare Access</p>
      </div>
      <div style="padding:32px;">
        <p style="margin:0 0 16px;color:#1e1b2e;font-size:16px;">
          Dear <strong>${input.clientName}</strong>,
        </p>
        <p style="margin:0 0 16px;color:#1e1b2e;font-size:15px;line-height:1.6;">
          There has been an update to your appointment request. Your
          appointment is now <strong>${statusLabel}</strong>.
        </p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
          <tr>
            <td style="padding:8px 12px;color:#6b6479;border-bottom:1px solid #f0eef6;">Service</td>
            <td style="padding:8px 12px;color:#1e1b2e;border-bottom:1px solid #f0eef6;"><strong>${input.eventName}</strong></td>
          </tr>
          <tr>
            <td style="padding:8px 12px;color:#6b6479;border-bottom:1px solid #f0eef6;">Category</td>
            <td style="padding:8px 12px;color:#1e1b2e;border-bottom:1px solid #f0eef6;">${input.categoryName}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;color:#6b6479;border-bottom:1px solid #f0eef6;">Date</td>
            <td style="padding:8px 12px;color:#1e1b2e;border-bottom:1px solid #f0eef6;">${input.date}</td>
          </tr>
          <tr>
            <td style="padding:8px 12px;color:#6b6479;border-bottom:1px solid #f0eef6;">Time</td>
            <td style="padding:8px 12px;color:#1e1b2e;border-bottom:1px solid #f0eef6;">${input.time}</td>
          </tr>
        </table>
        <p style="margin:0 0 16px;color:#6b6479;font-size:14px;line-height:1.6;">${description}</p>
        <p style="margin:0 0 16px;color:#1e1b2e;font-size:14px;line-height:1.6;">
          You can view the latest status of your appointment anytime by signing
          in to your account.
        </p>
        <a href="https://help-is-on-the-way.vercel.app/appointments"
           style="display:inline-block;background:#5b21b6;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:14px;">
          View My Appointments
        </a>
        <p style="margin:24px 0 0;color:#6b6479;font-size:12px;line-height:1.6;">
          If you have any questions, reply to this email or contact us. If you
          are in crisis, please call 911 or go to your nearest emergency room.
        </p>
      </div>
    </div>
  </div>`;
}

export async function notifyAppointmentStatus(input: {
  appointmentId: string;
  status: AppointmentStatus;
  requestedDate?: string;
  requestedTime?: string;
}): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "Not authenticated." };
  }

  // Verify the caller is an admin.
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();
  if (profile?.role !== "admin") {
    return { ok: false, error: "Unauthorized." };
  }

  // Fetch the appointment with client, category, and event details.
  const { data: appointment, error: fetchError } = await supabase
    .from("appointments")
    .select(
      "*, profiles!appointments_client_id_fkey(full_name, email), categories!appointments_category_id_fkey(name), events!appointments_event_id_fkey(name)"
    )
    .eq("id", input.appointmentId)
    .single();

  if (fetchError || !appointment) {
    return { ok: false, error: "Appointment not found." };
  }

  const clientEmail = appointment.profiles?.email;
  if (!clientEmail) {
    return { ok: false, error: "Client has no email address." };
  }

  const clientName =
    appointment.profiles?.full_name?.split(" ")[0] ?? "there";

  const eventDate = input.requestedDate ?? appointment.requested_date;
  const eventTime = input.requestedTime ?? appointment.requested_time;

  const html = buildEmailHtml({
    clientName,
    categoryName: appointment.categories?.name ?? "Mental Health Service",
    eventName: appointment.events?.name ?? "Appointment",
    date: formatDate(eventDate),
    time: formatTime(eventTime),
    status: input.status,
  });

  const subject = `Your appointment is ${STATUS_LABELS[input.status]}`;

  const result = await sendMail({
    to: clientEmail,
    subject,
    html,
    text: textFromHtml(html),
  });

  return result;
}
