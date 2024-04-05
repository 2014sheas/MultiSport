"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import EventCard from "./events/EventCard";

const Dashboard = ({ events, teams }) => {
  const { user, error, isLoading } = useUser();

  const uniqueStatuses = ["Upcoming", "In Progress", "Completed"];

  return (
    <div className="p-5">
      <div className="lg:grid grid-cols-2 xl:grid-cols-4">
        <div>
          {events &&
            uniqueStatuses?.map((uniqueStatus, statusIndex) => (
              <div key={statusIndex} className="mb-4">
                <h2>{uniqueStatus}</h2>
                <div className="lg:grid grid-cols-2 xl:grid-cols-4"></div>
                {events
                  .filter((event) => event.status === uniqueStatus)
                  .map((filteredEvent, _index) => (
                    <EventCard
                      key={_index}
                      event={filteredEvent}
                      teams={teams}
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
