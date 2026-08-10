"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { Spinner } from "@/components/ui/Loading";
import { createClient } from "@/lib/supabase/client";
import { formatDate, normalizePhoneNumber, isValidPhilippineMobile, uppercaseName } from "@/lib/utils";
import type { Profile } from "@/lib/types";

export default function ProfilePage() {
  const supabase = createClient();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setError("Not authenticated.");
      setLoading(false);
      return;
    }

    const { data, error: fetchError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (fetchError) {
      setError(fetchError.message);
    } else if (data) {
      setProfile(data);
      setFullName(data.full_name ?? "");
      setContactNumber(data.contact_number ?? "");
    }

    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMessage(null);

    const capitalizedFullName = uppercaseName(fullName);

    if (!capitalizedFullName) {
      setError("Full name is required.");
      setSaving(false);
      return;
    }

    const normalizedPhone = normalizePhoneNumber(contactNumber);
    const hasNumber = normalizedPhone.replace(/\D/g, "").length > 2; // more than just "+63"
    if (hasNumber && !isValidPhilippineMobile(normalizedPhone)) {
      setError(
        "Please enter a valid Philippine mobile number, e.g. +63 917 123 4567."
      );
      setSaving(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Not authenticated.");
      setSaving(false);
      return;
    }

    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        full_name: capitalizedFullName,
        contact_number: normalizedPhone || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (updateError) {
      setError(updateError.message);
    } else {
      setSuccessMessage("Profile updated successfully.");
      setFullName(capitalizedFullName);
      setContactNumber(normalizedPhone);
      setProfile((prev) =>
        prev
          ? {
              ...prev,
              full_name: capitalizedFullName,
              contact_number: normalizedPhone || null,
            }
          : prev
      );
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center py-12">
        <p className="text-muted">
          {error ?? "Unable to load profile."}
        </p>
        <Button variant="outline" className="mt-4" onClick={fetchProfile}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-xl space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="mt-1 text-muted">
          Manage your personal information.
        </p>
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 text-sm rounded-lg px-4 py-3">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="bg-destructive-light border border-red-200 text-destructive text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <Card>
        <form onSubmit={handleSave} className="space-y-5">
          <Input
            id="fullName"
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <Input
            id="email"
            label="Email"
            value={profile.email}
            disabled
            hint="Email cannot be changed."
            className="bg-gray-50"
          />

          <PhoneInput
            id="contactNumber"
            label="Contact Number"
            value={contactNumber}
            onChange={setContactNumber}
            hint="Your Philippine mobile number. The +63 country code is added automatically."
          />

          <div className="flex items-center justify-between pt-2">
            <Button type="submit" isLoading={saving}>
              Save Changes
            </Button>
          </div>
        </form>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold text-foreground mb-2">
          Account Information
        </h2>
        <p className="text-sm text-muted">
          Member since {formatDate(profile.created_at)}
        </p>
      </Card>
    </div>
  );
}
