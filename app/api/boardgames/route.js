import { NextResponse } from "next/server";
import connectToDB from "@/utils/database";
import Boardgame from "@/models/boardgame";

export const GET = async () => {
  try {
    await connectToDB();
    const boardgames = await Boardgame.find();
    return new NextResponse(JSON.stringify(boardgames), { status: 200 });
  } catch (err) {
    return new NextResponse("Error in fetching boardgames " + err, { status: 500 });
  }
};

export const POST = async (req) => {
  const { title, image, thumbnail, bggLink, minPlayers, maxPlayers, desc } = await req.json();
  try {
    await connectToDB();
    await Boardgame.create({ title, image, thumbnail, bggLink, minPlayers, maxPlayers, desc });
    return NextResponse.json({ message: `${title} boardgame created` }, { status: 201 });
  } catch (err) {
    return new NextResponse("Error in creating boardgame " + err, { status: 500 });
  }
};
