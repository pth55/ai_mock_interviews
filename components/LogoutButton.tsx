"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/client"; // Adjust this path as needed
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // First, sign out from Firebase
      await signOut(auth);

      // Then, call your API to clear the session cookie
      await fetch("/api/auth/signout", { method: "POST" });

      // Refresh the router to ensure the new (logged out) state is loaded
      router.refresh();
      router.push("/sign-in");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button onClick={handleLogout} className="btn-secondary">
      Logout
    </Button>
  );
}
