"use client";

import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { RestaurantTable } from "@/types/restaurant";
import { 
  Plus, 
  Trash2, 
  Download, 
  Printer, 
  ExternalLink, 
  QrCode as QrIcon, 
  MapPin, 
  X, 
  Check, 
  Sparkles,
  AlertCircle
} from "lucide-react";

export default function AdminTablesPage() {
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTableNum, setNewTableNum] = useState("");
  const [newTableLabel, setNewTableLabel] = useState("");
  const [newTableCapacity, setNewTableCapacity] = useState("4");
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // QR Code Map: tableId -> dataUrl
  const [qrMap, setQrMap] = useState<Record<string, string>>({});
  const [activePrintTable, setActivePrintTable] = useState<RestaurantTable | null>(null);

  const [baseUrl, setBaseUrl] = useState("https://hanuman-veg-restaurant.vercel.app");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  const loadTables = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/tables");
      if (res.ok) {
        const d = await res.json();
        setTables(d.tables || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTables();
  }, []);

  // Generate QR codes for all tables
  useEffect(() => {
    if (tables.length === 0) return;

    tables.forEach(async (tbl) => {
      const targetUrl = `${baseUrl}/menu?table=${encodeURIComponent(tbl.tableNumber)}`;
      try {
        const dataUrl = await QRCode.toDataURL(targetUrl, {
          width: 400,
          margin: 2,
          color: {
            dark: "#0C0A09",
            light: "#FFFFFF",
          },
        });
        setQrMap((prev) => ({ ...prev, [tbl.id]: dataUrl }));
      } catch (err) {
        console.error("Failed to generate QR for", tbl.tableNumber, err);
      }
    });
  }, [tables, baseUrl]);

  const handleAddTable = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableNum.trim()) return;
    setError(null);

    try {
      const res = await fetch("/api/tables", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableNumber: newTableNum.trim(),
          label: newTableLabel.trim() || undefined,
          capacity: Number(newTableCapacity) || 4,
        }),
      });

      const d = await res.json();
      if (!res.ok) {
        setError(d.error || "Failed to add table");
        return;
      }

      setNewTableNum("");
      setNewTableLabel("");
      setIsAdding(false);
      loadTables();
    } catch (err) {
      setError("Error adding table.");
    }
  };

  const handleDeleteTable = async (id: string, num: string) => {
    if (!confirm(`Delete Table ${num}? Any printed QR codes will redirect to default menu.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/tables?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setTables((prev) => prev.filter((t) => t.id !== id));
      } else {
        alert("Failed to delete table");
      }
    } catch {
      alert("Error deleting table");
    }
  };

  const handleDownloadPng = (table: RestaurantTable) => {
    const dataUrl = qrMap[table.id];
    if (!dataUrl) return;

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `Hanuman-Table-${table.tableNumber}-QR.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handlePrintCard = (table: RestaurantTable) => {
    setActivePrintTable(table);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">
            Table QR Code Generator
          </h1>
          <p className="text-xs text-stone-500">
            Generate, preview, download, and print table-specific QR codes for Hotel Hanuman dining tables.
          </p>
        </div>

        <button
          onClick={() => {
            setIsAdding(true);
            setError(null);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-warm transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Dining Table</span>
        </button>
      </div>

      {/* Target Base URL Info Banner */}
      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-stone-700">
        <div>
          <span className="font-bold text-amber-950 block">Target QR Destination URL:</span>
          <span className="font-mono text-stone-600 break-all">
            {baseUrl}/menu?table=[TABLE_NUMBER]
          </span>
        </div>
        <span className="text-[11px] text-amber-800 font-semibold bg-white px-2.5 py-1 rounded-lg border border-amber-200 shrink-0">
          Scans open instantly on customer phone
        </span>
      </div>

      {/* Add Table Form Dialog */}
      {isAdding && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-white rounded-3xl border border-stone-200 shadow-2xl p-6">
            <button
              onClick={() => setIsAdding(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-lg font-bold text-stone-900 mb-3">
              Add New Dining Table
            </h2>

            {error && (
              <div className="p-3 mb-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2 border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleAddTable} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Table Identifier *
                </label>
                <input
                  type="text"
                  required
                  value={newTableNum}
                  onChange={(e) => setNewTableNum(e.target.value.toUpperCase())}
                  placeholder="e.g. T13, T14, Booth-1"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900 font-bold uppercase"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Table Label / Zone (Optional)
                </label>
                <input
                  type="text"
                  value={newTableLabel}
                  onChange={(e) => setNewTableLabel(e.target.value)}
                  placeholder="e.g. First Floor AC Window"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Seating Capacity
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={newTableCapacity}
                  onChange={(e) => setNewTableCapacity(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900 font-bold"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
                >
                  Add Table
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tables Grid */}
      {loading ? (
        <div className="py-12 text-center text-xs text-stone-400">Loading tables...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {tables.map((tbl) => {
            const qrDataUrl = qrMap[tbl.id];
            const targetUrl = `${baseUrl}/menu?table=${encodeURIComponent(tbl.tableNumber)}`;

            return (
              <div
                key={tbl.id}
                className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                {/* Table Header Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-serif text-xl font-extrabold text-stone-900">
                      Table {tbl.tableNumber}
                    </span>
                    <span className="text-[11px] text-stone-400 block -mt-0.5">
                      {tbl.label || "General Seating"} • {tbl.capacity || 4} Guests
                    </span>
                  </div>

                  <button
                    onClick={() => handleDeleteTable(tbl.id, tbl.tableNumber)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Table"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Scannable QR Code Preview */}
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-col items-center justify-center">
                  {qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt={`QR Code for Table ${tbl.tableNumber}`}
                      className="w-36 h-36 rounded-lg bg-white p-1 border border-stone-200 shadow-inner"
                    />
                  ) : (
                    <div className="w-36 h-36 flex items-center justify-center text-xs text-stone-400">
                      Generating...
                    </div>
                  )}

                  <a
                    href={targetUrl}
                    target="_blank"
                    className="mt-2 text-[11px] font-semibold text-amber-700 hover:underline flex items-center gap-1"
                  >
                    <span>Test Table Link</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Actions: Download PNG & Print Card */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleDownloadPng(tbl)}
                    className="py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>

                  <button
                    onClick={() => handlePrintCard(tbl)}
                    className="py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Card</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Printable Branded Table Card Modal */}
      {activePrintTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 space-y-4">
            <button
              onClick={() => setActivePrintTable(null)}
              className="absolute top-4 right-4 p-2 rounded-xl text-stone-400 hover:text-stone-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Print View Container */}
            <div
              id="printable-card"
              className="border-2 border-dashed border-amber-600/40 p-6 rounded-2xl bg-[#FDFBF7] text-center space-y-3"
            >
              {/* Header */}
              <div className="space-y-0.5">
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-amber-700 block">
                  HOTEL HANUMAN • SION CIRCLE
                </span>
                <h3 className="font-serif text-xl font-black text-stone-900 leading-tight">
                  Hanuman Veg Restaurant
                </h3>
                <p className="text-[10px] text-stone-500">
                  Pure Vegetarian & Jain Heritage Since Decades
                </p>
              </div>

              {/* Big Table Badge */}
              <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500 text-stone-950 font-black text-sm uppercase tracking-wider shadow-sm">
                TABLE {activePrintTable.tableNumber}
              </div>

              {/* QR Code */}
              <div className="flex justify-center py-1">
                {qrMap[activePrintTable.id] && (
                  <img
                    src={qrMap[activePrintTable.id]}
                    alt={`Table ${activePrintTable.tableNumber}`}
                    className="w-48 h-48 bg-white p-2 rounded-xl border border-stone-300 shadow"
                  />
                )}
              </div>

              {/* Instructions */}
              <div className="space-y-1">
                <p className="text-xs font-bold text-stone-800">
                  Scan to View Digital Menu & Order
                </p>
                <p className="text-[10px] text-stone-500">
                  Point your phone camera to browse fresh dosas, pav bhaji, juices & submit your order.
                </p>
              </div>

              {/* Footer seal */}
              <div className="pt-2 border-t border-stone-200 flex items-center justify-center gap-2 text-[10px] font-bold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>100% Pure Veg • Dedicated Jain Prep</span>
              </div>
            </div>

            {/* Print trigger */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setActivePrintTable(null)}
                className="px-4 py-2 rounded-xl text-stone-600 font-bold text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow"
              >
                <Printer className="w-4 h-4" />
                <span>Print Table Tent</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
