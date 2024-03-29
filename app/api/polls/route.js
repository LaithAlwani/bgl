import { NextResponse } from "next/server";
import connectToDB from "@/utils/database";
import Poll from "@/models/poll";

export const GET = async () => {
  try {
    await connectToDB();
    const polls = await Poll.find();
    return new NextResponse(JSON.stringify(polls), { status: 200 });
  } catch (err) {
    return new NextResponse("Error in fetching polls " + err, { status: 500 });
  }
};

export const POST = async (req) => {
  const {title, items} = await req.json()
  try {
    await connectToDB();
    await Poll.create({title, items});
    return NextResponse.json({ message: "New poll created" }, { status: 201 });
  } catch (err) {
    return new NextResponse("Error in creating poll " + err, { status: 500 });
  }
};
