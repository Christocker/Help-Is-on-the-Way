import { createClient } from "@/lib/supabase/server";
import type { Category, Event } from "@/lib/types";

// Fetch active categories from the database (used by public/booking pages).
// Falls back to an empty list if the DB isn't configured or errors.
export async function fetchCategoriesFromDb(): Promise<Category[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .returns<Category[]>();

    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}

export async function fetchEventsFromDb(): Promise<Event[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("is_active", true)
      .order("name", { ascending: true })
      .returns<Event[]>();

    if (error) return [];
    return data ?? [];
  } catch {
    return [];
  }
}
