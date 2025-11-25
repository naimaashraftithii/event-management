// src/hooks/useAuth.js
"use client";

import { useEffect, useState } from "react";
import { subscribeToAuthChanges } from "../lib/firebase";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsub = subscribeToAuthChanges((firebaseUser) => {
      setUser(firebaseUser || null);
      setInitializing(false);
    });

    return () => unsub();
  }, []);

  return { user, initializing };
}
