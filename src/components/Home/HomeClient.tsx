// src/app/(home)/HomeClient.tsx (Client Component)
"use client"; // Mark this file as client-side

import { useEffect } from "react";
import { useAuth } from "@/components/Auth/Context/AuthContext";
import { useRouter } from "next/navigation";

export default function HomeClient() {
  const { user, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth/sign-in");
    }
  }, [user, router]);

  return <div></div>;
}
