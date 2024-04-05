import Link from "next/link";

const formatTimeStamp = (timestamp) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString("en-US", options);

  return formattedDate;
};

function EventCard({ event, teams }) {
  const bodyDataSwitch = () => {
    const eventLocation = event.location ? event.location : "Location";
    switch (event.status) {
      case "Upcoming":
        return (
          <div className="flex flex-col">
            <p className="text-s mt-2">{eventLocation}</p>
            <p className="text-s mt-2" suppressHydrationWarning={true}>
              {formatTimeStamp(event.date)}
            </p>
          </div>
        );
      case "In Progress":
        return (
          <div className="flex flex-col">
            <p className="text-s my-1">{eventLocation}</p>
            <p className="text-s my-1" suppressHydrationWarning={true}>
              {formatTimeStamp(event.date)}
            </p>
          </div>
        );
      case "Completed":
        const firstPlace = teams.find(
          (team) => team.teamId === event.results[0]
        );
        const secondPlace = teams.find(
          (team) => team.teamId === event.results[1]
        );
        const thirdPlace = teams.find(
          (team) => team.teamId === event.results[2]
        );
        return (
          <div className="flex flex-col">
            <p className="text-s mt-0.5">1st: {firstPlace.name}</p>
            <p className="text-s mt-0.5">2nd: {secondPlace.name}</p>
            <p className="text-s mt-0.5">3rd: {thirdPlace.name}</p>
          </div>
        );
      default:
        return (
          <div className="flex flex-col">
            <p className="text-s my-1">{eventLocation}</p>
            <p className="text-s my-1" suppressHydrationWarning={true}>
              {formatTimeStamp(event.date)}
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m- w-64 h-32">
      <Link href={`/events/${event.eventId}`} style={{ display: "contents" }}>
        <h4>{event.name}</h4>
        <hr className="h-px border-0 bg-page mb-2" />
        {bodyDataSwitch()}
      </Link>
    </div>
  );
}

export default EventCard;
