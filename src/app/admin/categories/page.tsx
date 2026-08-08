"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Spinner } from "@/components/ui/Loading";
import { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
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
    sort_order: 0,
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({
    name: "",
    slug: "",
    description: "",
    sort_order: 100,
  });
  const [saving, setSaving] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: fetchError } = await supabase
        .from("categories")
        .select("*")
        .order("sort_order", { ascending: true })
        .returns<Category[]>();

      if (fetchError) throw fetchError;
      setCategories(data ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load categories"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  async function handleToggleActive(category: Category) {
    setMessage(null);
    try {
      const supabase = createClient();
      const newState = !category.is_active;
      const { error: updateError } = await supabase
        .from("categories")
        .update({ is_active: newState })
        .eq("id", category.id);

      if (updateError) throw updateError;

      setCategories((prev) =>
        prev.map((c) =>
          c.id === category.id ? { ...c, is_active: newState } : c
        )
      );
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to update category",
      });
    }
  }

  function startEdit(category: Category) {
    setEditingId(category.id);
    setEditForm({
      name: category.name,
      description: category.description,
      sort_order: category.sort_order,
    });
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function handleSaveEdit(categoryId: string) {
    setSaving(true);
    setMessage(null);
    try {
      const slug = editForm.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("categories")
        .update({
          name: editForm.name,
          description: editForm.description,
          slug,
          sort_order: editForm.sort_order,
        })
        .eq("id", categoryId);

      if (updateError) throw updateError;

      setCategories((prev) =>
        prev.map((c) =>
          c.id === categoryId
            ? {
                ...c,
                name: editForm.name,
                description: editForm.description,
                slug,
                sort_order: editForm.sort_order,
              }
            : c
        )
      );
      setEditingId(null);
      setMessage({ type: "success", text: "Category updated successfully" });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to update category",
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleAddCategory(e: React.FormEvent) {
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
      const { error: insertError } = await supabase.from("categories").insert({
        name: addForm.name,
        slug,
        description: addForm.description,
        sort_order: addForm.sort_order,
        is_active: true,
      });

      if (insertError) throw insertError;

      setShowAddForm(false);
      setAddForm({ name: "", slug: "", description: "", sort_order: 100 });
      setMessage({ type: "success", text: "Category added successfully" });
      await fetchCategories();
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to add category",
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
        <h1 className="text-2xl font-bold text-foreground">Categories</h1>
        <Card>
          <div className="text-center py-12">
            <p className="text-destructive font-medium">Failed to load</p>
            <p className="text-sm text-muted mt-1">{error}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={fetchCategories}
            >
              Retry
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Categories</h1>
          <p className="mt-1 text-sm text-muted">
            {categories.length} categor{categories.length !== 1 ? "ies" : "y"}
          </p>
        </div>
        <Button
          variant={showAddForm ? "secondary" : "primary"}
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel" : "Add Category"}
        </Button>
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
            New Category
          </h2>
          <form onSubmit={handleAddCategory} className="space-y-4">
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
                placeholder="my-category"
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
              label="Sort Order"
              type="number"
              value={addForm.sort_order}
              onChange={(e) =>
                setAddForm({ ...addForm, sort_order: Number(e.target.value) })
              }
            />
            <Button type="submit" size="sm" isLoading={saving}>
              Create Category
            </Button>
          </form>
        </Card>
      )}

      {categories.length === 0 ? (
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
                d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
              />
            </svg>
            <p className="mt-3 text-sm font-medium text-foreground">
              No categories yet
            </p>
            <p className="mt-1 text-xs text-muted">
              Add categories above to organize your services.
            </p>
          </div>
        </Card>
      ) : (
        <Card padding="none">
          <div className="divide-y divide-border">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="px-6 py-4 hover:bg-surface transition-colors"
              >
                {editingId === cat.id ? (
                  <div className="space-y-3">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Input
                        label="Name"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                      />
                      <Input
                        label="Sort Order"
                        type="number"
                        value={editForm.sort_order}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            sort_order: Number(e.target.value),
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
                        onClick={() => handleSaveEdit(cat.id)}
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
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">
                          {cat.name}
                        </p>
                        <Badge
                          variant={cat.is_active ? "success" : "error"}
                          dot
                        >
                          {cat.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted mt-0.5 line-clamp-1">
                        {cat.description}
                      </p>
                      <p className="text-xs text-muted-light mt-0.5">
                        Slug: {cat.slug} &middot; Order: {cat.sort_order}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEdit(cat)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant={cat.is_active ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => handleToggleActive(cat)}
                      >
                        {cat.is_active ? "Deactivate" : "Activate"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
