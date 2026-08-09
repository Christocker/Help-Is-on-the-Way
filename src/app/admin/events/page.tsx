"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Loading";
import { Event, Category } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AdminPhotoUploader } from "@/components/admin/AdminPhotoUploader";
import {
  uploadEventImage,
  deleteEventImage,
} from "@/app/admin/actions";

interface CategoryWithEvents extends Category {
  events: Event[];
}

export default function AdminEventsPage() {
  const [grouped, setGrouped] = useState<CategoryWithEvents[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    duration: 60,
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({
    category_id: "",
    name: "",
    slug: "",
    description: "",
    duration: 60,
  });
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();

      const { data: categories, error: catError } = await supabase
        .from("categories")
        .select("*")
        .order("sort_order", { ascending: true })
        .returns<Category[]>();

      if (catError) throw catError;

      const { data: events, error: evtError } = await supabase
        .from("events")
        .select("*")
        .order("name", { ascending: true })
        .returns<Event[]>();

      if (evtError) throw evtError;

      const allCategories = categories ?? [];
      const allEvents = events ?? [];

      const groupedData: CategoryWithEvents[] = allCategories.map((cat) => ({
        ...cat,
        events: allEvents.filter((e) => e.category_id === cat.id),
      }));

      setGrouped(groupedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load events");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleToggleActive(event: Event) {
    setMessage(null);
    try {
      const supabase = createClient();
      const newState = !event.is_active;
      const { error: updateError } = await supabase
        .from("events")
        .update({ is_active: newState })
        .eq("id", event.id);

      if (updateError) throw updateError;

      setGrouped((prev) =>
        prev.map((cat) => ({
          ...cat,
          events: cat.events.map((e) =>
            e.id === event.id ? { ...e, is_active: newState } : e
          ),
        }))
      );
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to update event",
      });
    }
  }

  function startEdit(event: Event) {
    setEditingId(event.id);
    setEditForm({
      name: event.name,
      description: event.description,
      duration: event.duration ?? 60,
    });
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function handleSaveEdit(eventId: string) {
    setSaving(true);
    setMessage(null);
    try {
      const slug = editForm.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("events")
        .update({
          name: editForm.name,
          description: editForm.description,
          slug,
          duration: editForm.duration,
        })
        .eq("id", eventId);

      if (updateError) throw updateError;

      setGrouped((prev) =>
        prev.map((cat) => ({
          ...cat,
          events: cat.events.map((e) =>
            e.id === eventId
              ? {
                  ...e,
                  name: editForm.name,
                  description: editForm.description,
                  slug,
                  duration: editForm.duration,
                }
              : e
          ),
        }))
      );
      setEditingId(null);
      setMessage({ type: "success", text: "Event updated successfully" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to update event",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleAddEvent(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const slug =
        addForm.slug ||
        addForm.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
      const supabase = createClient();
      const { error: insertError } = await supabase.from("events").insert({
        category_id: addForm.category_id,
        name: addForm.name,
        slug,
        description: addForm.description,
        duration: addForm.duration,
        is_active: true,
      });

      if (insertError) throw insertError;

      setShowAddForm(false);
      setAddForm({
        category_id: "",
        name: "",
        slug: "",
        description: "",
        duration: 60,
      });
      setMessage({ type: "success", text: "Event added successfully" });
      await fetchData();
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to add event",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Events</h1>
        <Card>
          <div className="text-center py-12">
            <p className="text-destructive font-medium">Failed to load</p>
            <p className="text-sm text-muted mt-1">{error}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={fetchData}
            >
              Retry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const totalEvents = grouped.reduce((sum, g) => sum + g.events.length, 0);
  const categoriesForSelect = grouped.filter((g) => g.is_active);

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Events</h1>
          <p className="mt-1 text-sm text-muted">
            {totalEvents} event{totalEvents !== 1 ? "s" : ""} across{" "}
            {grouped.length} categor{grouped.length !== 1 ? "ies" : "y"}
          </p>
        </div>
        {categoriesForSelect.length > 0 && (
          <Button
            variant={showAddForm ? "secondary" : "primary"}
            size="sm"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            {showAddForm ? "Cancel" : "Add Event"}
          </Button>
        )}
      </div>

      {message && (
        <div
          className={cn(
            "rounded-lg border px-4 py-3 text-sm",
            message.type === "success"
              ? "bg-accent/10 border-accent/30 text-accent"
              : "bg-destructive-light border-red-200 text-destructive"
          )}
        >
          {message.text}
        </div>
      )}

      {showAddForm && (
        <Card>
          <h2 className="text-sm font-semibold text-foreground mb-4">
            New Event
          </h2>
          <form onSubmit={handleAddEvent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Category
              </label>
              <select
                value={addForm.category_id}
                onChange={(e) =>
                  setAddForm({ ...addForm, category_id: e.target.value })
                }
                required
                className="w-full rounded-lg border border-border px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:border-primary-light"
              >
                <option value="">Select a category...</option>
                {categoriesForSelect.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input
                label="Name"
                value={addForm.name}
                onChange={(e) =>
                  setAddForm({ ...addForm, name: e.target.value })
                }
                required
              />
              <Input
                label="Slug (auto-generated if empty)"
                value={addForm.slug}
                onChange={(e) =>
                  setAddForm({ ...addForm, slug: e.target.value })
                }
                placeholder="my-event"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Description
              </label>
              <textarea
                value={addForm.description}
                onChange={(e) =>
                  setAddForm({ ...addForm, description: e.target.value })
                }
                rows={2}
                required
                className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm transition-colors duration-200 placeholder:text-muted-light focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:border-primary-light resize-y"
              />
            </div>
            <Input
              label="Duration (minutes)"
              type="number"
              min={15}
              step={5}
              value={addForm.duration}
              onChange={(e) =>
                setAddForm({ ...addForm, duration: Number(e.target.value) })
              }
            />
            <Button type="submit" size="sm" isLoading={saving}>
              Create Event
            </Button>
          </form>
        </Card>
      )}

      {grouped.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-muted-light"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
              />
            </svg>
            <p className="mt-3 text-sm font-medium text-foreground">
              No events yet
            </p>
            <p className="mt-1 text-xs text-muted">
              Create categories first, then add events to them.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {grouped.map((category) => (
            <Card key={category.id}>
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-sm font-semibold text-foreground">
                  {category.name}
                </h2>
                <Badge
                  variant={category.is_active ? "success" : "error"}
                  dot
                >
                  {category.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>

              {category.events.length === 0 ? (
                <p className="text-xs text-muted py-4 text-center">
                  No events in this category
                </p>
              ) : (
                <div className="space-y-2">
                  {category.events.map((event) => (
                    <div
                      key={event.id}
                      className="rounded-lg border border-border p-3"
                    >
                      {editingId === event.id ? (
                        <div className="space-y-3">
                          <AdminPhotoUploader
                            imageUrl={event.image_url}
                            alt={`${event.name} photo`}
                            size="sm"
                            onUpload={async (file) => {
                              const result = await uploadEventImage(
                                event.id,
                                file
                              );
                              if (result.ok && result.url) {
                                setGrouped((prev) =>
                                  prev.map((cat) => ({
                                    ...cat,
                                    events: cat.events.map((e) =>
                                      e.id === event.id
                                        ? { ...e, image_url: result.url ?? null }
                                        : e
                                    ),
                                  }))
                                );
                              }
                              return result;
                            }}
                            onDelete={async () => {
                              const result = await deleteEventImage(
                                event.id,
                                event.image_url
                              );
                              if (result.ok) {
                                setGrouped((prev) =>
                                  prev.map((cat) => ({
                                    ...cat,
                                    events: cat.events.map((e) =>
                                      e.id === event.id
                                        ? { ...e, image_url: null }
                                        : e
                                    ),
                                  }))
                                );
                              }
                              return result;
                            }}
                          />
                          <div className="grid gap-3 sm:grid-cols-2">
                            <Input
                              label="Name"
                              value={editForm.name}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  name: e.target.value,
                                })
                              }
                            />
                            <Input
                              label="Duration (minutes)"
                              type="number"
                              min={15}
                              step={5}
                              value={editForm.duration}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  duration: Number(e.target.value),
                                })
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">
                              Description
                            </label>
                            <textarea
                              value={editForm.description}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  description: e.target.value,
                                })
                              }
                              rows={2}
                              className="w-full rounded-lg border border-border px-3.5 py-2.5 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-light/40 focus:border-primary-light resize-y"
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleSaveEdit(event.id)}
                              isLoading={saving}
                            >
                              Save
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={cancelEdit}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-foreground">
                                {event.name}
                              </p>
                              <Badge
                                variant={
                                  event.is_active ? "success" : "error"
                                }
                                dot
                              >
                                {event.is_active ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted mt-0.5 line-clamp-1">
                              {event.description}
                            </p>
                            <div className="flex items-center gap-3 mt-1">
                              <p className="text-xs text-muted-light">
                                Duration: {event.duration ?? "N/A"} min
                              </p>
                              <p className="text-xs text-muted-light">
                                Slug: {event.slug}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => startEdit(event)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant={
                                event.is_active ? "secondary" : "outline"
                              }
                              size="sm"
                              onClick={() => handleToggleActive(event)}
                            >
                              {event.is_active ? "Deactivate" : "Activate"}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
