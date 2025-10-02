"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Edit({ params }) {
  const router = useRouter();
  const [form, setForm] = useState({ name:"", dateOfBirth:"", memberNumber:"", interests:"" });

  useEffect(() => {
    (async () => {
      const r = await fetch(`/fin-customer/api/customers/${params.id}`);
      const c = await r.json();
      setForm({
        name: c?.name ?? "",
        dateOfBirth: c?.dateOfBirth?.slice(0,10) ?? "",
        memberNumber: c?.memberNumber ?? "",
        interests: c?.interests ?? ""
      });
    })();
  }, [params.id]);

  async function save(e) {
    e.preventDefault();
    await fetch(`/fin-customer/api/customers/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        dateOfBirth: form.dateOfBirth,
        memberNumber: Number(form.memberNumber),
        interests: form.interests
      })
    });
    router.push("/fin-customer/customers");
  }

  return (
    <main className="p-6 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Edit Customer</h1>
      <form onSubmit={save} className="grid gap-2">
        <input value={form.name} onChange={e=>setForm({ ...form, name:e.target.value })} />
        <input type="date" value={form.dateOfBirth} onChange={e=>setForm({ ...form, dateOfBirth:e.target.value })} />
        <input value={form.memberNumber} onChange={e=>setForm({ ...form, memberNumber:e.target.value })} />
        <input value={form.interests} onChange={e=>setForm({ ...form, interests:e.target.value })} />
        <button className="border rounded px-3 py-1">Save</button>
      </form>
    </main>
  );
}
