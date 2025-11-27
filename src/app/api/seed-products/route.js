// src/app/api/seed-products/route.js
import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import data from "@/json/products.json"; 

export async function GET() {
  try {
    const colRef = collection(db, "products");

    for (const item of data) {

      const docRef = doc(colRef, item.id);
      await setDoc(docRef, item, { merge: true });
    }

    return NextResponse.json({
      ok: true,
      count: data.length,
      message: "Products collection seeded successfully"
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { ok: false, error: String(error) },
      { status: 500 }
    );
  }
}
