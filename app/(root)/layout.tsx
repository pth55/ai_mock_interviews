import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import { isAuthenticated } from "@/lib/actions/auth.action";
// import { Button } from "@/components/ui/button";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout">
      <nav className="flex justify-between items-center p-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="MockMate Logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepMate</h2>
        </Link>
        <div className="flex gap-5 items-center">
          <Link
            href="https://resume-bulider-psi.vercel.app/"
            className="text-[#CAC5FE] transition-colors hover:underline"
          >
            Resume Builder
          </Link>
          <Link
            href="/roadmap-generator"
            className="text-[#CAC5FE] transition-colors hover:underline"
          >
            Roadmap Generator
          </Link>
          <LogoutButton />
        </div>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
