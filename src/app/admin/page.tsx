"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  MenuItem, 
  RestaurantTable, 
  RestaurantOrder, 
  MenuCategory 
} from "@/types/restaurant";
import { 
  UtensilsCrossed, 
  QrCode, 
  ShoppingBag, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  ArrowUpRight, 
  Clock, 
  Plus, 
  RefreshCw 
} from "lucide-react";

export default function AdminOverviewPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [tables, setTables] = useState<RestaurantTable[]>([]);
  const [orders, setOrders] = useState<RestaurantOrder[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [menuRes, tblRes, ordRes, catRes] = await Promise.all([
        fetch("/api/menu?includeUnavailable=true"),
        fetch("/api/tables"),
        fetch("/api/orders"),
        fetch("/api/categories"),
      ]);

      if (menuRes.ok) {
        const d = await menuRes.json();
        setItems(d.items || []);
      }
      if (tblRes.ok) {
        const d = await tblRes.json();
        setTables(d.tables || []);
      }
      if (ordRes.ok) {
        const d = await ordRes.json();
        setOrders(d.orders || []);
      }
      if (catRes.ok) {
        const d = await catRes.json();
        setCategories(d.categories || []);
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      setTogglingId(id);
      const res = await fetch(`/api/menu/${id}/availability`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !currentStatus }),
      });

      if (res.ok) {
        setItems((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, isAvailable: !currentStatus } : item
          )
        );
      }
    } catch (err) {
      alert("Failed to toggle item availability.");
    } finally {
      setTogglingId(null);
    }
  };

  const availableCount = items.filter((i) => i.isAvailable !== false).length;
  const soldOutCount = items.length - availableCount;
  const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "preparing").length;

  const filteredItems = items.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
        <div className="space-y-1">
          <h1 className="font-serif text-2xl font-bold text-stone-900">
            Operations & Live Menu Dashboard
          </h1>
          <p className="text-xs text-stone-500">
            Manage real-time dish availability, table QR codes, and incoming kitchen orders for Hotel Hanuman Sion Circle.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <Link
            href="/admin/menu"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Dish</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Menu Dishes */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Total Menu Items
            </span>
            <UtensilsCrossed className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-stone-900">
            {items.length}
          </div>
          <p className="text-[11px] text-stone-400">Across {categories.length} culinary categories</p>
        </div>

        {/* Available vs Sold Out */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Live Serving
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl font-extrabold text-emerald-600">
              {availableCount}
            </span>
            {soldOutCount > 0 && (
              <span className="text-xs font-bold text-red-600">
                ({soldOutCount} Sold Out)
              </span>
            )}
          </div>
          <p className="text-[11px] text-stone-400">Real-time customer visibility</p>
        </div>

        {/* Configured Dining Tables */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Dining Tables
            </span>
            <QrCode className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-stone-900">
            {tables.length}
          </div>
          <Link
            href="/admin/tables"
            className="text-[11px] text-amber-700 font-semibold inline-flex items-center gap-1 hover:underline"
          >
            <span>Print QR Cards</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Active Kitchen Orders */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
              Active Orders
            </span>
            <ShoppingBag className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-serif text-3xl font-extrabold text-stone-900">
            {pendingOrders}
          </div>
          <Link
            href="/admin/orders"
            className="text-[11px] text-amber-700 font-semibold inline-flex items-center gap-1 hover:underline"
          >
            <span>View Kitchen Board</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Quick 1-Click Availability Toggles Section */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-lg font-bold text-stone-900">
              Quick Dish Availability Switcher
            </h2>
            <p className="text-xs text-stone-500">
              Toggle any dish out-of-stock or back in-stock instantly. Reflects immediately on customer table QR menus without redeployment.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dish to toggle..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-stone-400">Loading dishes...</div>
        ) : (
          <div className="border border-stone-200 rounded-2xl overflow-hidden divide-y divide-stone-100">
            <div className="bg-stone-50 px-4 py-2.5 grid grid-cols-12 text-[11px] font-bold text-stone-500 uppercase">
              <div className="col-span-6 sm:col-span-5">Dish Name & Category</div>
              <div className="col-span-3 sm:col-span-2">Price</div>
              <div className="col-span-3 sm:col-span-3">Dietary Tag</div>
              <div className="col-span-12 sm:col-span-2 text-right">Serving Status</div>
            </div>

            <div className="max-h-96 overflow-y-auto divide-y divide-stone-100">
              {filteredItems.map((dish) => {
                const isAvailable = dish.isAvailable !== false;
                const isToggling = togglingId === dish.id;

                return (
                  <div
                    key={dish.id}
                    className="px-4 py-3 grid grid-cols-12 items-center text-xs hover:bg-stone-50/80 transition-colors"
                  >
                    <div className="col-span-6 sm:col-span-5 pr-2">
                      <span className="font-bold text-stone-900 block truncate">
                        {dish.name}
                      </span>
                      <span className="text-[10px] text-stone-400 uppercase tracking-wide">
                        {dish.category}
                      </span>
                    </div>

                    <div className="col-span-3 sm:col-span-2 font-bold text-stone-800">
                      ₹{dish.price}
                    </div>

                    <div className="col-span-3 sm:col-span-3">
                      {dish.dietary === "pure-jain" ? (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                          Pure Jain
                        </span>
                      ) : dish.isJainFriendly ? (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-900">
                          Jain Available
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-medium bg-stone-100 text-stone-700">
                          Pure Veg
                        </span>
                      )}
                    </div>

                    <div className="col-span-12 sm:col-span-2 flex items-center justify-end gap-2 pt-2 sm:pt-0">
                      <button
                        onClick={() => handleToggleAvailability(dish.id, isAvailable)}
                        disabled={isToggling}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm ${
                          isAvailable
                            ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                            : "bg-red-100 text-red-700 hover:bg-red-200 border border-red-300"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isAvailable ? "bg-white" : "bg-red-600"
                          }`}
                        />
                        <span>{isAvailable ? "In Stock" : "Sold Out"}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Recent Orders Sneak Peek */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-lg font-bold text-stone-900">
              Recent Kitchen Tickets
            </h2>
            <p className="text-xs text-stone-500">Orders submitted by dine-in tables and takeaway</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1"
          >
            <span>View All Orders ({orders.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <p className="text-xs text-stone-400 py-4 text-center">No orders recorded yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {orders.slice(0, 3).map((ord) => (
              <div
                key={ord.id}
                className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-xs text-amber-700">
                    {ord.orderReference}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      ord.status === "completed"
                        ? "bg-emerald-100 text-emerald-800"
                        : ord.status === "preparing"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-stone-200 text-stone-800"
                    }`}
                  >
                    {ord.status}
                  </span>
                </div>

                <div className="text-xs text-stone-700">
                  <strong>{ord.tableNumber ? `Table ${ord.tableNumber}` : "Takeaway"}</strong> • ₹{ord.totalAmount}
                </div>

                <div className="text-[11px] text-stone-500 line-clamp-1">
                  {ord.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
