async function getData(id){
  const r = await fetch(`${process.env.NEXT_PUBLIC_BASE ?? ""}/fin-customer/api/customers/${id}`, { cache: "no-store" });
  return r.json();
}

export default async function Detail({ params }) {
  const c = await getData(params.id);
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{c?.name}</h1>
      <p>DOB: {c?.dateOfBirth?.slice(0,10)}</p>
      <p>Member #: {c?.memberNumber}</p>
      <p>Interests: {c?.interests}</p>
    </main>
  );
}

