import Event from "@/app/(models)/Event";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    console.log("Creating Event");
    const body = await req.json();
    const eventData = body.formData;
    await Event.create(eventData);

    return NextResponse.json({ message: "Event Created" }, { status: 201 });
  } catch (error) {
    console.log("Error Creating Event", error);
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const events = await Event.find({});
    return NextResponse.json(events, { status: 200 });
  } catch (error) {
    const message = "Error Fetching Events";
    console.log("Error Fetching Events", error);
    console.log(error);
    return NextResponse.json({ message: message, error }, { status: 500 });
  }
}
