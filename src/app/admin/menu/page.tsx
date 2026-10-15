"use client";

import React, { useState, useEffect } from "react";
import { MenuItem, MenuCategory, DietaryType } from "@/types/restaurant";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Flame, 
  ShieldCheck, 
  Star, 
  AlertCircle,
  UtensilsCrossed,
  Filter
} from "lucide-react";

export default function AdminMenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Form Fields
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("south-indian");
  const [formPrice, setFormPrice] = useState("150");
  const [formDesc, setFormDesc] = useState("");
  const [formDietary, setFormDietary] = useState<DietaryType>("pure-veg");
  const [formSpiceLevel, setFormSpiceLevel] = useState<number>(1);
  const [formIsSignature, setFormIsSignature] = useState(false);
  const [formIsBestseller, setFormIsBestseller] = useState(false);
  const [formIsJainFriendly, setFormIsJainFriendly] = useState(false);
  const [formBadge, setFormBadge] = useState("");
  const [formImageUrl, setFormImageUrl] = useState("");
  const [formIsAvailable, setFormIsAvailable] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadMenu = async () => {
    try {
      setLoading(true);
      const [menuRes, catRes] = await Promise.all([
        fetch("/api/menu?includeUnavailable=true"),
        fetch("/api/categories")
      ]);
      if (menuRes.ok) {
        const d = await menuRes.json();
        setItems(d.items || []);
      }
      if (catRes.ok) {
        const d = await catRes.json();
        setCategories(d.categories || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setFormName("");
    setFormCategory("south-indian");
    setFormPrice("150");
    setFormDesc("");
    setFormDietary("pure-veg");
    setFormSpiceLevel(1);
    setFormIsSignature(false);
    setFormIsBestseller(false);
    setFormIsJainFriendly(false);
    setFormBadge("");
    setFormImageUrl("");
    setFormIsAvailable(true);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormCategory(item.category);
    setFormPrice(String(item.price));
    setFormDesc(item.description);
    setFormDietary(item.dietary);
    setFormSpiceLevel(item.spiceLevel ?? 1);
    setFormIsSignature(Boolean(item.isSignature));
    setFormIsBestseller(Boolean(item.isBestseller));
    setFormIsJainFriendly(Boolean(item.isJainFriendly));
    setFormBadge(item.badge || "");
    setFormImageUrl(item.imageUrl || "");
    setFormIsAvailable(item.isAvailable !== false);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSaveDish = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSubmitting(true);

    const payload = {
      name: formName.trim(),
      category: formCategory,
      price: Number(formPrice),
      description: formDesc.trim(),
      dietary: formDietary,
      spiceLevel: Number(formSpiceLevel),
      isSignature: formIsSignature,
      isBestseller: formIsBestseller,
      isJainFriendly: formIsJainFriendly || formDietary === "pure-jain",
      badge: formBadge.trim() || undefined,
      imageUrl: formImageUrl.trim() || undefined,
      isAvailable: formIsAvailable,
    };

    try {
      if (editingItem) {
        // Update existing dish
        const res = await fetch(`/api/menu/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const d = await res.json();
          throw new Error(d.error || "Failed to update dish");
        }
      } else {
        // Create new dish
        const res = await fetch("/api/menu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const d = await res.json();
          throw new Error(d.error || "Failed to create dish");
        }
      }

      setIsModalOpen(false);
      loadMenu();
    } catch (err: any) {
      setFormError(err.message || "Failed to save dish.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteDish = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${name}" from the menu?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      } else {
        alert("Failed to delete dish.");
      }
    } catch {
      alert("Error deleting dish.");
    }
  };

  const filtered = items.filter((item) => {
    if (selectedCategory !== "all" && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
        <div>
          <h1 className="font-serif text-2xl font-bold text-stone-900">
            Menu Dishes Management
          </h1>
          <p className="text-xs text-stone-500">
            Create, edit, price, and organize all dishes served at Hotel Hanuman.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-warm transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Dish</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish by name or ingredients..."
            className="w-full pl-10 pr-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
              selectedCategory === "all"
                ? "bg-stone-900 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            All ({items.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                selectedCategory === c.id
                  ? "bg-amber-600 text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Dishes Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-12 text-center text-xs text-stone-400">Loading dishes...</div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <UtensilsCrossed className="w-10 h-10 text-stone-300 mx-auto" />
            <p className="text-xs text-stone-500">No dishes found matching filters.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 uppercase font-bold text-[10px]">
                <tr>
                  <th className="px-4 py-3">Dish Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Dietary</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-stone-800">
                {filtered.map((dish) => (
                  <tr key={dish.id} className="hover:bg-stone-50/60 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-stone-900">{dish.name}</div>
                      <div className="text-[11px] text-stone-400 line-clamp-1 max-w-xs">
                        {dish.description}
                      </div>
                      {dish.badge && (
                        <span className="inline-block px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-amber-200 text-stone-900 mt-0.5">
                          {dish.badge}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-stone-600 capitalize">
                      {dish.category.replace("-", " ")}
                    </td>
                    <td className="px-4 py-3 font-bold text-stone-900 font-sans">
                      ₹{dish.price}
                    </td>
                    <td className="px-4 py-3">
                      {dish.dietary === "pure-jain" ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-900">
                          Pure Jain
                        </span>
                      ) : dish.isJainFriendly ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-100 text-emerald-900">
                          Jain Available
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-stone-100 text-stone-700">
                          Pure Veg
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {dish.isAvailable !== false ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600">
                          <span className="w-2 h-2 rounded-full bg-red-500" />
                          Sold Out
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => openEditModal(dish)}
                          className="p-1.5 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors"
                          title="Edit Dish"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteDish(dish.id, dish.name)}
                          className="p-1.5 rounded-lg text-red-600 hover:text-red-900 hover:bg-red-50 transition-colors"
                          title="Delete Dish"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Dish Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-stone-200 shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-serif text-xl font-bold text-stone-900 mb-4">
              {editingItem ? "Edit Menu Dish" : "Add New Dish"}
            </h2>

            {formError && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSaveDish} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Dish Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Special Mysore Cheese Dosa"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Price in INR (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="10"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Ingredients, preparation style, accompaniments..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Dietary Classification
                  </label>
                  <select
                    value={formDietary}
                    onChange={(e) => setFormDietary(e.target.value as DietaryType)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                  >
                    <option value="pure-veg">Pure Vegetarian</option>
                    <option value="jain-available">Jain Option Available</option>
                    <option value="pure-jain">100% Pure Jain Only</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Spice Level (0 to 3)
                  </label>
                  <select
                    value={formSpiceLevel}
                    onChange={(e) => setFormSpiceLevel(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                  >
                    <option value={0}>0 - Mild / Non-Spicy</option>
                    <option value={1}>1 - Medium</option>
                    <option value={2}>2 - Spicy</option>
                    <option value={3}>3 - Extra Spicy</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Promotional Badge
                  </label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="e.g. Chef's Pick, Hot Seller"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-stone-50 border border-stone-200 text-stone-900"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsAvailable}
                    onChange={(e) => setFormIsAvailable(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span className="font-semibold text-stone-800">In Stock (Available)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsBestseller}
                    onChange={(e) => setFormIsBestseller(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span className="font-semibold text-stone-800">Mark as Bestseller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsSignature}
                    onChange={(e) => setFormIsSignature(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span className="font-semibold text-stone-800">Chef Signature Dish</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsJainFriendly}
                    onChange={(e) => setFormIsJainFriendly(e.target.checked)}
                    className="rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span className="font-semibold text-stone-800">Jain Prep Compliant</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-600 hover:bg-stone-100 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-warm"
                >
                  {submitting ? "Saving..." : editingItem ? "Update Dish" : "Create Dish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
