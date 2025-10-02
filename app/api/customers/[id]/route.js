import db from "@/lib/db";
import Customer from "@/models/Customer";

export async function GET(_req, { params }) {
  await db();
  const doc = await Customer.findById(params.id);
  return Response.json(doc);
}

export async function PUT(req, { params }) {
  await db();
  const body = await req.json();
  const updated = await Customer.findByIdAndUpdate(params.id, body, { new: true });
  return Response.json(updated);
}

export async function DELETE(_req, { params }) {
  await db();
  await Customer.findByIdAndDelete(params.id);
  return Response.json({ ok: true });
}

