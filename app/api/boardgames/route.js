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
  const { boardgames } = await req.json();
  try {
    await connectToDB();
    for (const bgIdx in boardgames){
      await Boardgame.create(boardgames[bgIdx]);
    }
    return NextResponse.json({ message: `boardgame created` }, { status: 201 });
  } catch (err) {
    return new NextResponse("Error in creating boardgame " + err, { status: 500 });
  }
};
