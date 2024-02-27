import Event from "@/app/(models)/Event";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const foundEvent = await Event.findOne({ eventId: id });
    return NextResponse.json({ foundEvent }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const eventData = body.formData;
    const updatedEventData = await Event.findByIdAndUpdate(id, {
      ...eventData,
    });

    return NextResponse.json({ updatedEventData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
