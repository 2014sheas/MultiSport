import Team from "@/app/(models)/Team";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const foundTeam = await Team.findOne({ teamId: id });
    return NextResponse.json({ foundTeam }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const teamData = body.formData;
    const updatedTeamData = await Team.findByIdAndUpdate(id, { ...teamData });

    return NextResponse.json({ updatedTeamData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
