import { auth } from "@clerk/nextjs";
import CreatePollForms from "@/components/CreatePollForms";
import "../../contact/contact.css";

export default function CreatePolls() {
  const { sessionClaims } = auth();

  if (sessionClaims?.metadata.role !== "admin") {
    redirect('/');
  }

  return (
    <>
      <h2>Create a Poll</h2>
      <CreatePollForms />
    </>
  );
}
