"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const StatusColorMap = () => {
  return {
    Scheduled: "bg-blue-500",
    "In-Progress": "bg-yellow-500",
    Completed: "bg-green-500",
  };
};

const ScheduleRow = ({ event }) => {
  return (
    <div className="flex flex-row w-full bg-gray-600 p-2 my-2 border-b-2 border-gray-400">
      <div className="w-1/3 justify-center">
        <Link href={`/events/${event.eventId}`}>{event.eventName}</Link>
      </div>
      <div className="w-1/4">
        {event.date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
      <div className="w-5/12">
        {event.location ? (
          <a
            href={`https://www.google.com/maps/dir//${event.location.formatted_address}`}
            className="text-blue-500 hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            {event.location.name}
          </a>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

const Schedule = ({ events }) => {
  const router = useRouter();
  let eventRows = events.map((event) => {
    return {
      eventName: event.name,
      date: new Date(event.date),
      location: event.location,
      eventId: event.eventId,
    };
  });
  eventRows.sort((a, b) => a.date - b.date);
  const uniqueDates = [
    ...new Set(eventRows.map((event) => event.date.getDay())),
  ];
  const dayDict = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  const onRowClick = (event) => {
    router.push(`/events/${event.eventId}`);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1>Event Schedule</h1>
      <br />
      {events &&
        uniqueDates?.map((uniqueDate, dateIndex) => (
          <div
            key={dateIndex}
            className="mb-4 w-full flex flex-col items-center"
          >
            <h2>{dayDict[uniqueDate]}</h2>
            <div className="flex flex-col w-11/12 rounded-lg bg-gray-600">
              {eventRows
                .filter((event) => new Date(event.date).getDay() === uniqueDate)
                .map((filteredEvent, _index) => (
                  <ScheduleRow event={filteredEvent} key={_index} />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Schedule;
