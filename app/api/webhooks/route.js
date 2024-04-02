import { Webhook } from "svix";
import { headers } from "next/headers";
import User from "@/models/user";
import connectToDB from "@/utils/database";

export async function POST(req) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id, ...attributes } = evt.data;
  const { username, email_addresses, first_name, last_name, image_url, profile_image_url } =
    attributes;
  const eventType = evt.type;
  console.log(image_url, profile_image_url);
  switch (eventType) {
    case "user.created":
      try {
        await connectToDB();
        await User.create({
          clerk_id: id,
          username,
          email: email_addresses[0].email_address,
          first_name,
          last_name,
          image:image_url,
          avatar:profile_image_url,
        });
        return new Response("", { status: 200 });
      } catch (err) {
        console.log(err);
      }
      break;
    case "user.updated":
      console.log("user update");
      break;
    case "user.deleted":
      console.log("user delete");
      break;
    default:
      break;
  }

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  // console.log("Webhook body:", payload);

  return new Response("", { status: 200 });
}
