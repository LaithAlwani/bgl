import { auth } from "@clerk/nextjs";
import CreateBoardgameForm from "@/components/CreateBoardgameForm";
import "@/styles/contact.css";

export default function CreateBoardgame() {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "admin") {
    redirect('/');
  }

  return (
    <div className="page flex-page">
      <h2>Create Boardgame</h2>
      <CreateBoardgameForm />
    </div>
  );
}