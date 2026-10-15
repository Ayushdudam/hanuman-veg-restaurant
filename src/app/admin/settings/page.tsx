"use client";

import React, { useState, useEffect } from "react";
import { RestaurantSettings } from "@/types/restaurant";
import { Save, Check, AlertCircle, Settings as SettingsIcon } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<RestaurantSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        setLoading(true);
        const res = await fetch("/api/settings");
        if (res.ok) {
          const d = await res.json();
          setSettings(d.settings);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (!res.ok) {
        throw new Error("Failed to save settings");
      }

      setSuccessMsg("Settings updated successfully!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to update settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return <div className="py-12 text-center text-xs text-stone-400">Loading settings...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">
            Restaurant Settings & Ordering Modes
          </h1>
          <p className="text-xs text-stone-500">
            Configure contact numbers, operational hours, and customer ordering workflows.
          </p>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
        {/* Section 1: Identity & Notice */}
        <div className="space-y-4">
          <h2 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
            General Identity & Live Notice
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Restaurant Display Name
              </label>
              <input
                type="text"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Legal Registered Name
              </label>
              <input
                type="text"
                value={settings.legalName}
                onChange={(e) => setSettings({ ...settings, legalName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Top Announcement Banner
            </label>
            <input
              type="text"
              value={settings.announcement || ""}
              onChange={(e) => setSettings({ ...settings, announcement: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
            />
          </div>
        </div>

        {/* Section 2: Contact & WhatsApp */}
        <div className="space-y-4">
          <h2 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
            Contact Numbers & WhatsApp Ordering Desk
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                WhatsApp Order Line (digits only)
              </label>
              <input
                type="text"
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                placeholder="e.g. 919820647374"
                className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900 font-mono"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Primary Mobile Display
              </label>
              <input
                type="text"
                value={settings.phoneDisplay}
                onChange={(e) => setSettings({ ...settings, phoneDisplay: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-stone-700 block mb-1">
                Landline Phone Display
              </label>
              <input
                type="text"
                value={settings.landlineDisplay}
                onChange={(e) => setSettings({ ...settings, landlineDisplay: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-stone-700 block mb-1">
              Physical Address
            </label>
            <textarea
              rows={2}
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
            />
          </div>
        </div>

        {/* Section 3: Ordering Workflow Modes */}
        <div className="space-y-4">
          <h2 className="font-serif text-base font-bold text-stone-900 border-b border-stone-100 pb-2">
            Customer Ordering Workflow Configuration
          </h2>

          <div className="space-y-3">
            <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-stone-200 bg-stone-50/60 cursor-pointer">
              <input
                type="radio"
                name="orderingMode"
                value="menu-and-ordering"
                checked={settings.orderingMode === "menu-and-ordering"}
                onChange={() => setSettings({ ...settings, orderingMode: "menu-and-ordering" })}
                className="mt-0.5 text-amber-600 focus:ring-amber-500"
              />
              <div>
                <span className="text-xs font-bold text-stone-900 block">
                  Mode B: Digital Menu + Live Ordering Enabled (Recommended)
                </span>
                <span className="text-[11px] text-stone-500">
                  Customers can add dishes to tray, submit orders to kitchen queue, or dispatch formatted WhatsApp summaries.
                </span>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3.5 rounded-2xl border border-stone-200 bg-stone-50/60 cursor-pointer">
              <input
                type="radio"
                name="orderingMode"
                value="menu-only"
                checked={settings.orderingMode === "menu-only"}
                onChange={() => setSettings({ ...settings, orderingMode: "menu-only" })}
                className="mt-0.5 text-amber-600 focus:ring-amber-500"
              />
              <div>
                <span className="text-xs font-bold text-stone-900 block">
                  Mode A: Digital Menu Only (Browse Only)
                </span>
                <span className="text-[11px] text-stone-500">
                  Customers can browse dishes, dietary info, and prices, but ordering buttons are hidden.
                </span>
              </div>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={settings.enableDirectOrderSubmission}
                onChange={(e) => setSettings({ ...settings, enableDirectOrderSubmission: e.target.checked })}
                className="rounded text-amber-600 focus:ring-amber-500"
              />
              <span className="font-semibold text-stone-800">Allow Direct Kitchen Ticket Submission</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={settings.enableWhatsAppCheckout}
                onChange={(e) => setSettings({ ...settings, enableWhatsAppCheckout: e.target.checked })}
                className="rounded text-amber-600 focus:ring-amber-500"
              />
              <span className="font-semibold text-stone-800">Enable WhatsApp Checkout Button</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-2 shadow-warm transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? "Saving Settings..." : "Save Restaurant Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
