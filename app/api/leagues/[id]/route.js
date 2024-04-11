import { NextResponse } from "next/server";
import connectToDB from "@/utils/database";
import League from "@/models/league";
import User from "@/models/user";
import mongoose from "mongoose";

export const GET = async (req) => {
  try {
    await connectToDB();
    const league = await League.findOne(req.params.id).populate("boardgame");
    return new NextResponse(JSON.stringify(league), { status: 200 });
  } catch (err) {
    return new NextResponse("Error in fetching leagues " + err, { status: 500 });
  }
};

export const POST = async (req) => {
  const { userId, leagueId } = await req.json();
  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const player = await User.findOne(
        { clerk_id: userId }
        // { $push: { leagues: leagueId } },
        // { session }
      );
      if (player.leagues.includes(leagueId)) {
        await session.abortTransaction();
        return NextResponse.json({ message: "Already Registered" }, { status: 200 });
        /*this is not sending*/
      } else {
        player.leagues.push(leagueId);
        await player.save({session});
      }

      await League.findOneAndUpdate(
        { _id: leagueId },
        { $push: { players: { playerId: player._id, score: 0 } } },
        { session }
      );
    });

    return NextResponse.json({ message: "Registration succesful" }, { status: 201 });
  } catch (err) {
    return new NextResponse("Error in registration " + err, { status: 500 });
  } finally {
    session.endSession();
  }
};
