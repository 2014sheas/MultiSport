"use client";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Tab,
  TableSortLabel,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
            <Table className="bg-slate-600 dark:bg-gray-800 w-11/12">
              <TableBody>
                {eventRows
                  .filter(
                    (event) => new Date(event.date).getDay() === uniqueDate
                  )
                  .map((filteredEvent, _index) => (
                    <TableRow
                      className="hover:bg-slate-700 dark:hover:bg-gray-700 w-full"
                      onClick={() => onRowClick(filteredEvent)}
                      key={filteredEvent.eventId}
                    >
                      <TableCell className="text-white w-1/3 md:text-lg">
                        {filteredEvent.eventName}
                      </TableCell>
                      <TableCell
                        className="text-white w-1/6 md:text-lg"
                        suppressHydrationWarning={true}
                      >
                        {filteredEvent.date.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell className="text-white w-1/2 md:text-lg">
                        {filteredEvent.location ? (
                          <a
                            href={`https://www.google.com/maps/dir//${filteredEvent.location.formatted_address}`}
                            className="text-blue-500 hover:underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {filteredEvent.location.name}
                          </a>
                        ) : (
                          ""
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        ))}
    </div>
  );
};

export default Schedule;
