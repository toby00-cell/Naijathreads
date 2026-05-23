import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/auth";
import { productsApi, type ApiProduct } from "@/services/products.api";
import { API_ENABLED } from "@/services/api";
import { formatNGN } from "@/data/products";
import { Plus, Pencil, Trash2, Upload, X } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Naija Threads" }] }),
  component: AdminPage,
});

const CATS = ["shirts", "trousers", "shoes", "headwears", "underwear"] as const;

function AdminPage() {
  const { user, isAdmin, loading } = useAuth();

  if (!API_ENABLED) {
    return (
      <Gate title="Backend not connected">
        Set <code className="rounded bg-muted px-1.5 py-0.5">VITE_API_URL</code> in <code>.env.local</code> to your running backend, then restart the dev server.
        See <code>backend/README.md</code> for setup.
      </Gate>
    );
  }
  if (loading) return <Gate title="Checking session…">Hold on.</Gate>;
  if (!user) return <Gate title="Sign in required"><Link to="/account" className="text-primary underline">Sign in</Link> as an admin to continue.</Gate>;
  if (!isAdmin) return <Gate title="Admin only">Your account ({user.email}) doesn't have admin access.</Gate>;

  return <AdminDashboard />;
}

function Gate({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-extrabold">{title}</h1>
      <p className="mt-3 text-sm text-muted-foreground">{children}</p>
    </section>
  );
}

function AdminDashboard() {
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-products"],
    queryFn: () => productsApi.list({ limit: 200, sort: "newest" }),
  });
  const [editing, setEditing] = useState<ApiProduct | null>(null);
  const [creating, setCreating] = useState(false);

  const del = useMutation({
    mutationFn: (id: string) => productsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-products"] }),
  });

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-display text-xs font-bold uppercase tracking-wider text-primary">Dashboard</p>
          <h1 className="font-display text-3xl font-extrabold">Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">{data?.total ?? 0} products</p>
        </div>
        <button onClick={() => setCreating(true)} className="inline-flex items-center gap-2 bg-primary px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" /> New product
        </button>
      </header>

      {isLoading && <p className="py-12 text-center text-sm text-muted-foreground">Loading…</p>}
      {error && <p className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">{(error as Error).message}</p>}

      {data && (
        <div className="mt-8 overflow-x-auto rounded-md border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left font-display text-xs uppercase tracking-wider">
              <tr><th className="p-3">Image</th><th className="p-3">Name</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3">Stock</th><th className="p-3"></th></tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.items.map((p) => (
                <tr key={p.id}>
                  <td className="p-3"><img src={p.image} alt={p.name} className="h-12 w-12 rounded object-cover" /></td>
                  <td className="p-3"><div className="font-medium">{p.name}</div><div className="text-xs text-muted-foreground">{p.slug}</div></td>
                  <td className="p-3 capitalize">{p.category}</td>
                  <td className="p-3 font-semibold text-primary">{formatNGN(p.price)}</td>
                  <td className="p-3">{p.stock}</td>
                  <td className="p-3 text-right">
                    <div className="inline-flex gap-2">
                      <button onClick={() => setEditing(p)} className="grid h-8 w-8 place-items-center rounded border border-border hover:bg-muted"><Pencil className="h-3 w-3" /></button>
                      <button onClick={() => { if (confirm(`Delete "${p.name}"?`)) del.mutate(p.id); }} className="grid h-8 w-8 place-items-center rounded border border-border hover:border-destructive hover:text-destructive"><Trash2 className="h-3 w-3" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {data.items.length === 0 && (
                <tr><td colSpan={6} className="p-10 text-center text-sm text-muted-foreground">No products yet. Click "New product".</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {(creating || editing) && (
        <ProductForm
          product={editing}
          onClose={() => { setEditing(null); setCreating(false); }}
          onSaved={() => { qc.invalidateQueries({ queryKey: ["admin-products"] }); setEditing(null); setCreating(false); }}
        />
      )}
    </section>
  );
}

function ProductForm({ product, onClose, onSaved }: { product: ApiProduct | null; onClose: () => void; onSaved: () => void }) {
  const [form, setForm] = useState({
    slug: product?.slug ?? "",
    name: product?.name ?? "",
    category: product?.category ?? "shirts",
    price: product?.price ?? 0,
    originalPrice: product?.originalPrice ?? "",
    brand: product?.brand ?? "Naija Threads",
    sizes: (product?.sizes ?? []).join(", "),
    colors: (product?.colors ?? []).join(", "),
    description: product?.description ?? "",
    isNew: product?.isNew ?? false,
    stock: product?.stock ?? 100,
  });
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState(product?.image ?? "");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => { setImageUrl(product?.image ?? ""); }, [product]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr(null);
    try {
      let finalImageUrl = imageUrl;
      if (file && !product) {
        const up = await productsApi.uploadImage(file);
        finalImageUrl = up.url;
      }
      if (!finalImageUrl) throw new Error("Please upload a product image.");
      const body = {
        slug: form.slug.trim().toLowerCase(),
        name: form.name.trim(),
        category: form.category,
        price: Number(form.price),
        originalPrice: form.originalPrice === "" ? null : Number(form.originalPrice),
        brand: form.brand.trim(),
        sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
        colors: form.colors.split(",").map((s) => s.trim()).filter(Boolean),
        description: form.description,
        isNew: form.isNew,
        stock: Number(form.stock),
        image: finalImageUrl,
      };
      let saved: ApiProduct;
      if (product) saved = await productsApi.update(product.id, body);
      else saved = await productsApi.create(body);
      if (file && product) await productsApi.replaceProductImage(saved.id, file);
      onSaved();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Save failed");
    } finally { setBusy(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={onClose}>
      <form onClick={(e) => e.stopPropagation()} onSubmit={submit} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-md bg-card p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-extrabold">{product ? "Edit product" : "New product"}</h2>
          <button type="button" onClick={onClose} className="grid h-8 w-8 place-items-center rounded-full hover:bg-muted"><X className="h-4 w-4" /></button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Slug (URL id)"><input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inp} placeholder="white-leather-low-top" /></Field>
          <Field label="Name"><input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inp} /></Field>
          <Field label="Category">
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as typeof form.category })} className={inp}>
              {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Brand"><input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} className={inp} /></Field>
          <Field label="Price (NGN)"><input type="number" min={0} required value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className={inp} /></Field>
          <Field label="Original price (optional)"><input type="number" min={0} value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value as never })} className={inp} /></Field>
          <Field label="Stock"><input type="number" min={0} value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} className={inp} /></Field>
          <Field label="Sizes (comma separated)"><input value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} className={inp} placeholder="S, M, L" /></Field>
          <Field label="Colors (comma separated)"><input value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} className={inp} placeholder="Black, White" /></Field>
          <label className="mt-7 inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.checked })} /> Mark as New</label>
          <div className="sm:col-span-2">
            <Field label="Description"><textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inp} /></Field>
          </div>
          <div className="sm:col-span-2">
            <span className="font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Image</span>
            <div className="mt-1 flex items-center gap-4">
              {imageUrl && <img src={imageUrl} alt="" className="h-20 w-20 rounded object-cover" />}
              <label className="inline-flex cursor-pointer items-center gap-2 rounded border border-dashed border-border px-4 py-2 text-xs hover:border-primary">
                <Upload className="h-3 w-3" /> {file ? file.name : "Choose image (≤5MB)"}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); setImageUrl(URL.createObjectURL(f)); } }} />
              </label>
            </div>
          </div>
        </div>

        {err && <p className="mt-4 rounded-md border border-destructive/30 bg-destructive/5 p-3 text-xs text-destructive">{err}</p>}

        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="border border-border px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider hover:border-foreground">Cancel</button>
          <button type="submit" disabled={busy} className="bg-primary px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90 disabled:opacity-60">
            {busy ? "Saving…" : product ? "Save changes" : "Create product"}
          </button>
        </div>
      </form>
    </div>
  );
}

const inp = "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>{children}</label>;
}