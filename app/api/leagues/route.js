import { NextResponse } from "next/server";
import connectToDB from "@/utils/database";
import League from "@/models/league";
import Boardgame from "@/models/boardgame";


export const GET = async () => {
  try {
    await connectToDB();
    const leagues = await League.find().populate("boardgame");
    return new NextResponse(JSON.stringify(leagues), { status: 200 });
  } catch (err) {
    return new NextResponse("Error in fetching leagues " + err, { status: 500 });
  }
};

export const POST = async (req) => {
  const { boardgame, maxPlayers, startDate, endDate } = await req.json();
  try {
    await connectToDB();
    const league = await League.create({ boardgame, maxPlayers, startDate, endDate });
    await Boardgame.findOneAndUpdate({boardgame},{"$push":{"leagues":league}})
    return NextResponse.json({ message: "League created "}, { status: 201 });
  } catch (err) {
    return new NextResponse("Error in creating boardgame " + err, { status: 500 });
  }
};
