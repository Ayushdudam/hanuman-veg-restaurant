"use client";

import React, { useState, useEffect } from "react";
import { RestaurantOrder, OrderStatus } from "@/types/restaurant";
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RefreshCw, 
  Filter, 
  ChefHat, 
  Utensils, 
  Phone,
  AlertCircle
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<RestaurantOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/orders");
      if (res.ok) {
        const d = await res.json();
        setOrders(d.orders || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
    // Poll every 20 seconds for live kitchen updates
    const interval = setInterval(loadOrders, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      setUpdatingId(orderId);
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      } else {
        alert("Failed to update status");
      }
    } catch {
      alert("Error updating order status");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (statusFilter === "all") return true;
    return o.status === statusFilter;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800">Pending Review</span>;
      case "preparing":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 flex items-center gap-1"><ChefHat className="w-3 h-3" /> Preparing</span>;
      case "ready":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 flex items-center gap-1"><Utensils className="w-3 h-3" /> Ready to Serve</span>;
      case "completed":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Served & Closed</span>;
      case "cancelled":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-200 text-stone-600">Cancelled</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">
            Live Kitchen Order Feed
          </h1>
          <p className="text-xs text-stone-500">
            Real-time orders received from table QR scans and takeaway counters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadOrders}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh Feed</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {["all", "pending", "preparing", "ready", "completed", "cancelled"].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all shrink-0 ${
              statusFilter === st
                ? "bg-stone-900 text-white shadow-sm"
                : "bg-white text-stone-600 hover:bg-stone-200 border border-stone-200"
            }`}
          >
            {st} ({orders.filter((o) => st === "all" || o.status === st).length})
          </button>
        ))}
      </div>

      {/* Orders Grid */}
      {loading && orders.length === 0 ? (
        <div className="py-12 text-center text-xs text-stone-400">Loading live orders...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-sm space-y-2">
          <ShoppingBag className="w-10 h-10 text-stone-300 mx-auto" />
          <h3 className="font-serif text-base font-bold text-stone-800">No orders in this category</h3>
          <p className="text-xs text-stone-400">New customer orders will appear here automatically.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrders.map((ord) => {
            const isUpdating = updatingId === ord.id;
            const createdTime = new Date(ord.createdAt).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={ord.id}
                className="bg-white rounded-3xl p-5 border border-stone-200 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
              >
                {/* Header Ticket Info */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-black text-amber-700">
                      {ord.orderReference}
                    </span>
                    {getStatusBadge(ord.status)}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-bold text-stone-900 text-sm">
                      {ord.tableNumber ? `Table ${ord.tableNumber.toUpperCase()}` : "Takeaway Order"}
                    </span>
                    <span className="text-stone-400 font-medium flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3" />
                      {createdTime}
                    </span>
                  </div>

                  {ord.customerName && ord.customerName !== "Dine-in Guest" && (
                    <div className="text-[11px] text-stone-600">
                      Guest: <strong>{ord.customerName}</strong> {ord.customerPhone ? `(${ord.customerPhone})` : ""}
                    </div>
                  )}
                </div>

                {/* Items Breakdown */}
                <div className="bg-stone-50 rounded-2xl p-3 border border-stone-200/80 space-y-2 text-xs">
                  {ord.items.map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between">
                      <div>
                        <span className="font-bold text-stone-900">{item.quantity}x</span>{" "}
                        <span className="text-stone-800">{item.name}</span>
                        {item.notes && (
                          <span className="block text-[10px] text-stone-500 italic ml-4">
                            ↳ Note: {item.notes}
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-stone-700">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}

                  {ord.notes && (
                    <div className="pt-2 border-t border-stone-200 text-[11px] text-amber-800">
                      <strong>Special Request:</strong> {ord.notes}
                    </div>
                  )}

                  <div className="pt-2 border-t border-stone-200 flex items-center justify-between font-bold text-stone-900">
                    <span>Total Amount</span>
                    <span className="text-sm font-serif">₹{ord.totalAmount}</span>
                  </div>
                </div>

                {/* Status Switcher Actions */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Update Order Status
                  </span>
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    {ord.status !== "preparing" && ord.status !== "completed" && (
                      <button
                        onClick={() => handleUpdateStatus(ord.id, "preparing")}
                        disabled={isUpdating}
                        className="py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold border border-blue-200 transition-colors"
                      >
                        Preparing
                      </button>
                    )}

                    {ord.status !== "ready" && ord.status !== "completed" && (
                      <button
                        onClick={() => handleUpdateStatus(ord.id, "ready")}
                        disabled={isUpdating}
                        className="py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold border border-purple-200 transition-colors"
                      >
                        Ready
                      </button>
                    )}

                    {ord.status !== "completed" && (
                      <button
                        onClick={() => handleUpdateStatus(ord.id, "completed")}
                        disabled={isUpdating}
                        className="py-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 font-bold transition-colors"
                      >
                        Done & Served
                      </button>
                    )}

                    {ord.status !== "cancelled" && ord.status !== "completed" && (
                      <button
                        onClick={() => handleUpdateStatus(ord.id, "cancelled")}
                        disabled={isUpdating}
                        className="py-1.5 rounded-lg bg-stone-100 text-stone-600 hover:bg-red-50 hover:text-red-700 font-medium transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
