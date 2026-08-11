import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/Card";
import type { Instruction } from "@/lib/types";

const FALLBACK_INSTRUCTIONS = [
  {
    title: "Before Booking",
    content:
      "Please ensure you have completed your profile information before booking an appointment.",
  },
  {
    title: "How to Book",
    content:
      "1. Navigate to the Book a Session page.\n2. Select the category that best fits your needs.\n3. Choose a specific event or service.\n4. Review and submit your appointment request. No need to pick a date and time — our team will arrange the schedule for you.",
  },
  {
    title: "What Happens After You Submit",
    content:
      "Our team will receive your request and coordinate with our partner mental healthcare provider. Within 24-48 hours, we will email you a proposed schedule for you to confirm. You will also be notified of any updates to your appointment status.",
  },
  {
    title: "How Confirmation Works",
    content:
      "We will email you a proposed date and time for your appointment. Once you confirm the schedule, your appointment is locked in. Please check your email and notifications regularly for updates.",
  },
  {
    title: "Preparing for Your Appointment",
    content:
      "Make sure you have a quiet, private space ready for your session. For online appointments, test your internet connection and device beforehand. Have any relevant questions or concerns prepared to discuss with your provider.",
  },
  {
    title: "What to Do If You Need to Reschedule",
    content:
      "If you need to reschedule your appointment, please contact us as soon as possible. You can reach out through the platform or reply to your appointment notification.",
  },
  {
    title: "Important Reminders",
    content:
      "Please arrive on time for your scheduled appointment. Sessions have a set duration, and arriving late may reduce the time available for your session. If you cannot attend, please notify us in advance.",
  },
  {
    title: "Emergency / Crisis Support",
    content:
      "If you are experiencing a mental health emergency or are in crisis, please contact emergency services immediately by dialing 911 (Philippines: 911) or go to your nearest hospital emergency room. This platform is not a substitute for emergency care.",
  },
];

export default async function InstructionsPage() {
  const supabase = await createClient();

  const { data: instructions } = (await supabase
    .from("instructions")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })) as {
    data: Instruction[] | null;
  };

  const displayInstructions =
    instructions && instructions.length > 0
      ? instructions
      : FALLBACK_INSTRUCTIONS;

  return (
    <div className="max-w-3xl space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Instructions</h1>
        <p className="mt-1 text-muted">
          Everything you need to know about the booking process.
        </p>
      </div>

      <div className="space-y-4">
        {displayInstructions.map((item, index) => (
          <Card key={index}>
            <h2 className="text-lg font-semibold text-foreground mb-3">
              {item.title}
            </h2>
            <div className="text-sm text-muted leading-relaxed whitespace-pre-line">
              {item.content}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
