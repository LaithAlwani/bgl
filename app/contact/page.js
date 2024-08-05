import ContactForm from "@/components/ContactForm";
import "@/styles/contact.css";

export const metadata = {
  title: "Meeple Nation | Contact",
  description: "Connet with Meeple Nation",
};

export default function ContactPage() {
  return (
    <div className="flex-page page">
      <ContactForm />
     </div>
  );
}
