import Boardgame from "@/models/boardgame";
import Session from "@/models/session"; //needed for populating, otherwise an error will happen
import connectToDB from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  const { params } = context;
  const id = params.id;
  try {
    await connectToDB();
    const boardgame = await Boardgame.findOne({ _id: id }).populate("sessions").exec();
    return NextResponse.json(boardgame, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error in fetching boardgame" + err }, { status: 500 });
  }
}
