import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useQueryClient } from "@tanstack/react-query";
import {
  Loader2,
  LogOut,
  Pencil,
  Plus,
  Save,
  Settings,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Category } from "../backend.d";
import type { MenuItem, SiteSettings } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddMenuItem,
  useDeleteMenuItem,
  useGetAllMenuItems,
  useGetSiteSettings,
  useIsCallerAdmin,
  useUpdateMenuItem,
  useUpdateSiteSettings,
} from "../hooks/useQueries";

const emptyItem = (): Omit<MenuItem, "id"> => ({
  name: "",
  category: Category.cakes,
  price: "",
  description: "",
  imageUrl: "",
  isAvailable: true,
});

export default function Admin() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const qc = useQueryClient();
  const isAuthenticated = !!identity;

  const { data: isAdmin, isLoading: adminLoading } = useIsCallerAdmin();
  const { data: menuItems, isLoading: itemsLoading } = useGetAllMenuItems();
  const { data: siteSettings } = useGetSiteSettings();

  const addItem = useAddMenuItem();
  const updateItem = useUpdateMenuItem();
  const deleteItem = useDeleteMenuItem();
  const updateSettings = useUpdateSiteSettings();

  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [editForm, setEditForm] = useState<Omit<MenuItem, "id">>(emptyItem());
  const [isAdding, setIsAdding] = useState(false);
  const [newForm, setNewForm] = useState<Omit<MenuItem, "id">>(emptyItem());
  const [settingsForm, setSettingsForm] = useState<SiteSettings>({
    tagline: "",
    aboutText: "",
  });
  const [editingSettings, setEditingSettings] = useState(false);

  const handleLogin = async () => {
    try {
      await login();
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = async () => {
    await clear();
    qc.clear();
  };

  const handleAdd = async () => {
    try {
      await addItem.mutateAsync({ ...newForm, id: 0n });
      setNewForm(emptyItem());
      setIsAdding(false);
      toast.success("Menu item added!");
    } catch {
      toast.error("Failed to add item");
    }
  };

  const handleUpdate = async (id: bigint) => {
    try {
      await updateItem.mutateAsync({ id, item: { ...editForm, id } });
      setEditingId(null);
      toast.success("Item updated!");
    } catch {
      toast.error("Failed to update item");
    }
  };

  const handleDelete = async (id: bigint) => {
    if (!confirm("Delete this item?")) return;
    try {
      await deleteItem.mutateAsync(id);
      toast.success("Item deleted!");
    } catch {
      toast.error("Failed to delete item");
    }
  };

  const startEdit = (item: MenuItem) => {
    setEditingId(item.id);
    setEditForm({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description,
      imageUrl: item.imageUrl,
      isAvailable: item.isAvailable,
    });
  };

  const openSettingsEdit = () => {
    setSettingsForm(siteSettings ?? { tagline: "", aboutText: "" });
    setEditingSettings(true);
  };

  const saveSettings = async () => {
    try {
      await updateSettings.mutateAsync(settingsForm);
      setEditingSettings(false);
      toast.success("Settings saved!");
    } catch {
      toast.error("Failed to save settings");
    }
  };

  // Not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen section-dark flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white/5 border border-white/10 rounded-3xl p-10 text-center">
          <span className="text-5xl block mb-4">🎂</span>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-2">
            Admin Panel
          </h1>
          <p className="text-white/50 mb-8">
            Sign in to manage Bake Town Bakery
          </p>
          <Button
            onClick={handleLogin}
            disabled={loginStatus === "logging-in"}
            className="w-full bg-brand-yellow text-brand-dark font-bold uppercase tracking-wider hover:brightness-110"
            data-ocid="admin.primary_button"
          >
            {loginStatus === "logging-in" ? (
              <Loader2 className="animate-spin mr-2" size={16} />
            ) : null}
            {loginStatus === "logging-in"
              ? "Signing In..."
              : "Sign In with Internet Identity"}
          </Button>
        </div>
      </div>
    );
  }

  if (adminLoading) {
    return (
      <div
        className="min-h-screen section-dark flex items-center justify-center"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="animate-spin text-brand-yellow" size={40} />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen section-dark flex items-center justify-center px-4">
        <div className="text-center" data-ocid="admin.error_state">
          <span className="text-5xl block mb-4">🚫</span>
          <h2 className="text-2xl font-black text-white mb-2">Access Denied</h2>
          <p className="text-white/50 mb-6">
            You don&apos;t have admin privileges.
          </p>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-brand-yellow text-brand-yellow"
          >
            <LogOut size={16} className="mr-2" /> Sign Out
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen section-dark">
      {/* Header */}
      <header className="bg-brand-dark border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎂</span>
          <div>
            <span className="font-black text-brand-yellow uppercase tracking-wider">
              BAKE TOWN
            </span>
            <span className="text-white text-xs ml-1 opacity-60">Admin</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={openSettingsEdit}
            variant="outline"
            size="sm"
            className="border-white/20 text-white/70 hover:border-brand-yellow hover:text-brand-yellow"
            data-ocid="admin.edit_button"
          >
            <Settings size={14} className="mr-1" /> Site Settings
          </Button>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="border-white/20 text-white/70 hover:border-red-400 hover:text-red-400"
            data-ocid="admin.secondary_button"
          >
            <LogOut size={14} className="mr-1" /> Logout
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Site Settings Modal */}
        {editingSettings && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            data-ocid="admin.modal"
          >
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 w-full max-w-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-lg">Site Settings</h3>
                <button
                  type="button"
                  onClick={() => setEditingSettings(false)}
                  className="text-white/40 hover:text-white"
                  data-ocid="admin.close_button"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-white/70 text-sm">Tagline</Label>
                  <Input
                    value={settingsForm.tagline}
                    onChange={(e) =>
                      setSettingsForm((p) => ({
                        ...p,
                        tagline: e.target.value,
                      }))
                    }
                    className="bg-white/5 border-white/10 text-white mt-1"
                    data-ocid="admin.input"
                  />
                </div>
                <div>
                  <Label className="text-white/70 text-sm">About Text</Label>
                  <Textarea
                    value={settingsForm.aboutText}
                    onChange={(e) =>
                      setSettingsForm((p) => ({
                        ...p,
                        aboutText: e.target.value,
                      }))
                    }
                    rows={4}
                    className="bg-white/5 border-white/10 text-white mt-1"
                    data-ocid="admin.textarea"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  onClick={saveSettings}
                  className="flex-1 bg-brand-yellow text-brand-dark font-bold"
                  disabled={updateSettings.isPending}
                  data-ocid="admin.save_button"
                >
                  {updateSettings.isPending ? (
                    <Loader2 size={14} className="animate-spin mr-1" />
                  ) : (
                    <Save size={14} className="mr-1" />
                  )}
                  Save
                </Button>
                <Button
                  onClick={() => setEditingSettings(false)}
                  variant="outline"
                  className="border-white/20 text-white/70"
                  data-ocid="admin.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Menu Management */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">
            Menu Items
          </h2>
          <Button
            onClick={() => {
              setIsAdding(true);
              setNewForm(emptyItem());
            }}
            className="bg-brand-yellow text-brand-dark font-bold hover:brightness-110"
            data-ocid="admin.primary_button"
          >
            <Plus size={16} className="mr-1" /> Add Item
          </Button>
        </div>

        {/* Add Form */}
        {isAdding && (
          <div
            className="bg-white/5 border border-brand-yellow/30 rounded-2xl p-6 mb-6"
            data-ocid="admin.panel"
          >
            <h3 className="text-white font-bold mb-4">New Menu Item</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-white/70 text-sm">Name</Label>
                <Input
                  value={newForm.name}
                  onChange={(e) =>
                    setNewForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="bg-white/5 border-white/10 text-white mt-1"
                  data-ocid="admin.input"
                />
              </div>
              <div>
                <Label className="text-white/70 text-sm">Price</Label>
                <Input
                  value={newForm.price}
                  onChange={(e) =>
                    setNewForm((p) => ({ ...p, price: e.target.value }))
                  }
                  placeholder="₹150"
                  className="bg-white/5 border-white/10 text-white mt-1"
                  data-ocid="admin.input"
                />
              </div>
              <div>
                <Label className="text-white/70 text-sm">Category</Label>
                <Select
                  value={newForm.category}
                  onValueChange={(v) =>
                    setNewForm((p) => ({ ...p, category: v as Category }))
                  }
                >
                  <SelectTrigger
                    className="bg-white/5 border-white/10 text-white mt-1"
                    data-ocid="admin.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={Category.cakes}>🎂 Cakes</SelectItem>
                    <SelectItem value={Category.pastries}>
                      🍰 Pastries
                    </SelectItem>
                    <SelectItem value={Category.fastFood}>
                      🍔 Fast Food
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-white/70 text-sm">Image URL</Label>
                <Input
                  value={newForm.imageUrl}
                  onChange={(e) =>
                    setNewForm((p) => ({ ...p, imageUrl: e.target.value }))
                  }
                  className="bg-white/5 border-white/10 text-white mt-1"
                  data-ocid="admin.input"
                />
              </div>
              <div className="sm:col-span-2">
                <Label className="text-white/70 text-sm">Description</Label>
                <Input
                  value={newForm.description}
                  onChange={(e) =>
                    setNewForm((p) => ({ ...p, description: e.target.value }))
                  }
                  className="bg-white/5 border-white/10 text-white mt-1"
                  data-ocid="admin.input"
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={newForm.isAvailable}
                  onCheckedChange={(v) =>
                    setNewForm((p) => ({ ...p, isAvailable: v }))
                  }
                  data-ocid="admin.switch"
                />
                <Label className="text-white/70 text-sm">Available</Label>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <Button
                onClick={handleAdd}
                className="bg-brand-yellow text-brand-dark font-bold"
                disabled={addItem.isPending}
                data-ocid="admin.save_button"
              >
                {addItem.isPending ? (
                  <Loader2 size={14} className="animate-spin mr-1" />
                ) : (
                  <Plus size={14} className="mr-1" />
                )}
                Add Item
              </Button>
              <Button
                onClick={() => setIsAdding(false)}
                variant="outline"
                className="border-white/20 text-white/70"
                data-ocid="admin.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Items Table */}
        {itemsLoading ? (
          <div
            className="flex justify-center py-12"
            data-ocid="admin.loading_state"
          >
            <Loader2 className="animate-spin text-brand-yellow" size={32} />
          </div>
        ) : (
          <div className="space-y-3">
            {(!menuItems || menuItems.length === 0) && (
              <div
                className="text-center py-12 text-white/30"
                data-ocid="admin.empty_state"
              >
                <span className="text-4xl block mb-3">🍽️</span>
                <p>No menu items yet. Add your first item!</p>
              </div>
            )}
            {menuItems?.map((item, idx) => (
              <div
                key={String(item.id)}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
                data-ocid={`admin.item.${idx + 1}`}
              >
                {editingId === item.id ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-white/70 text-xs">Name</Label>
                      <Input
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm((p) => ({ ...p, name: e.target.value }))
                        }
                        className="bg-white/5 border-white/10 text-white mt-1 h-8 text-sm"
                        data-ocid="admin.input"
                      />
                    </div>
                    <div>
                      <Label className="text-white/70 text-xs">Price</Label>
                      <Input
                        value={editForm.price}
                        onChange={(e) =>
                          setEditForm((p) => ({ ...p, price: e.target.value }))
                        }
                        className="bg-white/5 border-white/10 text-white mt-1 h-8 text-sm"
                        data-ocid="admin.input"
                      />
                    </div>
                    <div>
                      <Label className="text-white/70 text-xs">Category</Label>
                      <Select
                        value={editForm.category}
                        onValueChange={(v) =>
                          setEditForm((p) => ({
                            ...p,
                            category: v as Category,
                          }))
                        }
                      >
                        <SelectTrigger
                          className="bg-white/5 border-white/10 text-white mt-1 h-8 text-sm"
                          data-ocid="admin.select"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={Category.cakes}>
                            🎂 Cakes
                          </SelectItem>
                          <SelectItem value={Category.pastries}>
                            🍰 Pastries
                          </SelectItem>
                          <SelectItem value={Category.fastFood}>
                            🍔 Fast Food
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white/70 text-xs">Image URL</Label>
                      <Input
                        value={editForm.imageUrl}
                        onChange={(e) =>
                          setEditForm((p) => ({
                            ...p,
                            imageUrl: e.target.value,
                          }))
                        }
                        className="bg-white/5 border-white/10 text-white mt-1 h-8 text-sm"
                        data-ocid="admin.input"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-white/70 text-xs">
                        Description
                      </Label>
                      <Input
                        value={editForm.description}
                        onChange={(e) =>
                          setEditForm((p) => ({
                            ...p,
                            description: e.target.value,
                          }))
                        }
                        className="bg-white/5 border-white/10 text-white mt-1 h-8 text-sm"
                        data-ocid="admin.input"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={editForm.isAvailable}
                        onCheckedChange={(v) =>
                          setEditForm((p) => ({ ...p, isAvailable: v }))
                        }
                        data-ocid="admin.switch"
                      />
                      <Label className="text-white/70 text-xs">Available</Label>
                    </div>
                    <div className="flex gap-2 items-center justify-end">
                      <Button
                        onClick={() => handleUpdate(item.id)}
                        size="sm"
                        className="bg-brand-yellow text-brand-dark font-bold h-8"
                        disabled={updateItem.isPending}
                        data-ocid="admin.save_button"
                      >
                        {updateItem.isPending ? (
                          <Loader2 size={12} className="animate-spin" />
                        ) : (
                          <Save size={12} />
                        )}
                      </Button>
                      <Button
                        onClick={() => setEditingId(null)}
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white/60 h-8"
                        data-ocid="admin.cancel_button"
                      >
                        <X size={12} />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-lg">
                        {item.category === Category.cakes
                          ? "🎂"
                          : item.category === Category.pastries
                            ? "🍰"
                            : "🍔"}
                      </span>
                      <div className="min-w-0">
                        <p className="text-white font-semibold text-sm truncate">
                          {item.name}
                        </p>
                        <p className="text-white/40 text-xs truncate">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-brand-yellow font-bold text-sm">
                        {item.price}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${item.isAvailable ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
                      >
                        {item.isAvailable ? "Available" : "Hidden"}
                      </span>
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="text-white/40 hover:text-brand-yellow transition-colors"
                        data-ocid={`admin.edit_button.${idx + 1}`}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        className="text-white/40 hover:text-red-400 transition-colors"
                        data-ocid={`admin.delete_button.${idx + 1}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
