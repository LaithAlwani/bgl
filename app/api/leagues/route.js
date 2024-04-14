import { NextResponse } from "next/server";
import connectToDB from "@/utils/database";
import League from "@/models/league";
import Boardgame from "@/models/boardgame";
import mongoose from "mongoose";

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
  const { boardgame, startDate, endDate } = await req.json();
  const session = await mongoose.startSession();
  console.log(startDate, endDate)
  try {
    await session.withTransaction(async () => {
      const league = await League.create(
        [{ boardgame, startDate, endDate }],
        { session }
      );
      await Boardgame.findOneAndUpdate(
        { _id: boardgame },
        { $push: { leagues: league } },
        { session }
      );
    });

    return NextResponse.json({ message: "League created " }, { status: 201 });
  } catch (err) {
    return new NextResponse("Error in creating boardgame " + err, { status: 500 });
  } finally {
    session.endSession();
  }
};
