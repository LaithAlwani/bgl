import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function AdminDashboardPage() {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "admin") {
    redirect('/');
  } 

  return (
    <div className="flex-page">
      <h1>Admin Dashboard</h1>
    </div>
  );
}
