import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import AddProductForm from "../../../components/AddProductForm";

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <section className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Add Product</h1>
      <p className="text-sm text-white/60 mb-4">
        Create a new event package for your clients.
      </p>
      <AddProductForm />
    </section>
  );
}
