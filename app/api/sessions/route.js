import Boardgame from "@/models/boardgame";
import Session from "@/models/Session";
import connectToDB from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { players, boardgameId } = await req.json();
  console.log(players, boardgameId);

  //TODO: sort players by points desc and declare winner
  try {
    await connectToDB();
    const session = await Session.create({ players: players, boardgame: boardgameId });
    await Boardgame.findOneAndUpdate({ _id: boardgameId }, { $push: { sessions: session._id } });
    return NextResponse.json({ message: "session recorded", session }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "faild to record session" }, { status: 500 });
  }
}
