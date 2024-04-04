import { auth } from "@clerk/nextjs";
import CreateLeague from "@/components/CreateLeague";
import "../../../contact/contact.css";

export default function CreateLeagues() {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "admin") {
    redirect('/');
  }

  return (
    <div className="page flex-page">
      <h2>Create League</h2>
      <CreateLeague />
    </div>
  );
}
