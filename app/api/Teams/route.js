import Team from "@/app/(models)/Team";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Creating Team");
    const body = await req.json();
    const teamData = body.formData;
    console.log("Team Data: ", teamData);
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
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function DELETE() {
  console.log("Resetting Teams");
  try {
    await Team.deleteMany({});
    return NextResponse.json({ message: "Teams Reset" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
