import { auth } from "@clerk/nextjs";
import CreateLeagueForm from "@/components/CreateLeague";
import "../../../contact/contact.css";

export default function CreateLeague() {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "admin") {
    redirect('/');
  }

  return (
    <div className="page flex-page">
      <h2>Create League</h2>
      <p>pick a board game and create a league by with start and end date</p>
      <CreateLeagueForm />
    </div>
  );
}
