import EventCard from "./(components)/EventCard";

const getEvents = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Events", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get events", error);
  }
};

const Dashboard = async () => {
  const events = await getEvents();
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
                    <EventCard key={_index} id={_index} event={filteredEvent} />
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
