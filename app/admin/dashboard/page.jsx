import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Meeple Nation | Admin",
  description: "For Admins only",
};

export default function AdminDashboardPage() {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "admin") {
    redirect('/');
  } 

  return (
    <div className="flex-page">
      <h1>Admin Dashboard</h1>
      <Link href="create-poll" className="btn">Create Poll</Link>
    </div>
  );
}
