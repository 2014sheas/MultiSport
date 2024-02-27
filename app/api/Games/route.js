import Game from "@/app/(models)/Game";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Creating Game");
    const body = await req.json();
    const gameData = body.formData;
    console.log("Game Data: ", gameData);
    await Game.create(gameData);

    return NextResponse.json({ message: "Game Created" }, { status: 201 });
  } catch (error) {
    console.log("Error Creating Game", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const games = await Game.find({});
    return NextResponse.json(games, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE(req) {
  const body = await req.json();
  console.log("Resetting Games");
  console.log("Event ID: ", body);
  try {
    await Game.deleteMany({ event: body.eventId });
    return NextResponse.json({ message: "Games Reset" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
