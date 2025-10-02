"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CustomersPage() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({ name:"", dateOfBirth:"", memberNumber:"", interests:"" });

  async function load() {
    const r = await fetch("/fin-customer/api/customers");
    setRows(await r.json());
  }
  useEffect(() => { load(); }, []);

  async function create(e) {
    e.preventDefault();
    await fetch("/fin-customer/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        dateOfBirth: form.dateOfBirth,
        memberNumber: Number(form.memberNumber),
        interests: form.interests
      })
    });
    setForm({ name:"", dateOfBirth:"", memberNumber:"", interests:"" });
    load();
  }

  async function del(id) {
    await fetch(`/fin-customer/api/customers/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Customers</h1>

      <form onSubmit={create} className="grid gap-2 max-w-md">
        <input placeholder="Name" value={form.name} onChange={e=>setForm({ ...form, name:e.target.value })} />
        <input type="date" value={form.dateOfBirth} onChange={e=>setForm({ ...form, dateOfBirth:e.target.value })} />
        <input placeholder="Member Number" value={form.memberNumber} onChange={e=>setForm({ ...form, memberNumber:e.target.value })} />
        <input placeholder="Interests" value={form.interests} onChange={e=>setForm({ ...form, interests:e.target.value })} />
        <button className="border rounded px-3 py-1">Add</button>
      </form>

      <ul className="divide-y">
        {rows.map(c=>(
          <li key={c._id} className="flex items-center justify-between py-2">
            <Link href={`/fin-customer/customers/${c._id}`} className="underline">{c.name}</Link>
            <div className="space-x-2">
              <Link href={`/fin-customer/customers/${c._id}/edit`} className="underline">Edit</Link>
              <button onClick={()=>del(c._id)} className="underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
