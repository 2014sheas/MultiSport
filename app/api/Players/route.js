import Player from "@/app/(models)/Player";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Creating Player");
    const body = await req.json();
    const playerData = body.formData;
    await Player.create(playerData);

    return NextResponse.json({ message: "Player Created" }, { status: 201 });
  } catch (error) {
    console.log("Error Creating Player", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const players = await Player.find({});
    return NextResponse.json(players, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await Player.deleteMany({});
    return NextResponse.json({ message: "Players Reset" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
