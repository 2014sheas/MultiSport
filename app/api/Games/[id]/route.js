import Game from "@/app/(models)/Game";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const foundGame = await Game.findOne({ gameId: id });
    return NextResponse.json({ foundGame }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const gameData = await req.json();
    const updatedGameData = await Game.findByIdAndUpdate(id, {
      ...gameData,
    });

    return NextResponse.json({ updatedGameData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
