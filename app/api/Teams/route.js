import Team from "@/app/(models)/Team";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const teamData = body.formData;
    await Team.create(teamData);

    return NextResponse.json({ message: "Team Created" }, { status: 201 });
  } catch (error) {
    console.log("Error Creating Team", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const teams = await Team.find({});
    return NextResponse.json(teams, { status: 200 });
  } catch (error) {
    const message = error.message[0].messages[0].message;
    return NextResponse.json({ message: message, error }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    await Team.deleteMany({});
    return NextResponse.json({ message: "Teams Reset" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
