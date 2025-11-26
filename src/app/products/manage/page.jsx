import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function ManageProductsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <section className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Manage Products</h1>
      <p className="text-sm text-white/60 mb-4">
        Here you will see all event packages with options to view and delete.
      </p>

      {/* TODO: map over database / Firestore data here */}
      <div className="rounded-xl border border-white/10 bg-[#050816] p-6 text-sm text-white/60">
        Product list table coming soon...
      </div>
    </section>
  );
}
