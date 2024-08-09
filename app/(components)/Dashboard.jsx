"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import EventCard from "./events/EventCard";

const Dashboard = ({ events, teams }) => {
  const { user, error, isLoading } = useUser();

  const allStatuses = ["In Progress", "Completed", "Upcoming"];
  const CurrentStatuses = new Set(events?.map((event) => event.status));

  const uniqueStatuses = allStatuses.filter((status) =>
    CurrentStatuses.has(status)
  );

  return (
    <div>
      <div className="p-5 hidden lg:block">
        {events &&
          uniqueStatuses?.map((uniqueStatus, statusIndex) => (
            <div key={statusIndex} className="mb-4">
              <h2>{uniqueStatus}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {events
                  .filter((event) => event.status === uniqueStatus)
                  .map((filteredEvent, _index) => (
                    <EventCard
                      key={_index}
                      event={filteredEvent}
                      teams={teams}
                      suppressHydrationWarning={true}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
      <div className="p-5 lg:hidden">
        {events &&
          uniqueStatuses?.map((uniqueStatus, statusIndex) => (
            <div key={statusIndex} className="mb-4">
              <h2>{uniqueStatus}</h2>
              <hr />
              <div className="flex flex-wrap justify-center items-center">
                {events
                  .filter((event) => event.status === uniqueStatus)
                  .map((filteredEvent, _index) => (
                    <EventCard
                      key={_index}
                      event={filteredEvent}
                      teams={teams}
                      suppressHydrationWarning={true}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
