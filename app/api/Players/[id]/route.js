import Player from "@/app/(models)/Player";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const foundPlayer = await Player.findOne({ playerId: id });
    return NextResponse.json({ foundPlayer }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  console.log("Updating Player");
  console.log(params);
  try {
    const { id } = params;
    const body = await req.json();
    const playerData = body.formData;
    const updatedPlayerData = await Player.findByIdAndUpdate(id, {
      ...playerData,
    });

    return NextResponse.json({ updatedPlayerData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
