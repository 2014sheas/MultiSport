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

const Schedule = ({ events }) => {
  let eventDates = events.map((event) => {
    return { eventName: event.name, date: new Date(event.date) };
  });
  eventDates.sort((a, b) => a.date - b.date);
  const uniqueDates = [
    ...new Set(eventDates.map((event) => event.date.getDay())),
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

  return (
    <div className="flex flex-col items-center w-full">
      <h1>Schedule</h1>
      {events &&
        uniqueDates?.map((uniqueDate, dateIndex) => (
          <div
            key={dateIndex}
            className="mb-4 w-full flex flex-col items-center"
          >
            <h2>{dayDict[uniqueDate]}</h2>
            <Table className="bg-slate-600 dark:bg-gray-800 w-1/2">
              <TableBody>
                {eventDates
                  .filter(
                    (event) => new Date(event.date).getDay() === uniqueDate
                  )
                  .map((filteredEvent, _index) => (
                    <TableRow key={_index}>
                      <TableCell className="text-white w-fit md:text-lg">
                        {filteredEvent.eventName}
                      </TableCell>
                      <TableCell className="text-white w-fit md:text-lg">
                        {filteredEvent.date.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
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
