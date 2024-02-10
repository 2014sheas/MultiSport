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

function EventCard({ event }) {
  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md shadow-lg p-3 m-2">
      <Link href={`/Events/${event.eventId}`} style={{ display: "contents" }}>
        <div className="flex mb-3">
          <div className="ml-auto"></div>
        </div>
        <h4>{event.title}</h4>
        <hr className="h-px border-0 bg-page mb-2" />
        <p className="whitespace-pre-wrap">Event Description</p>
        <div className="flex-grow"></div>
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs my-1">{formatTimeStamp(event.date)}</p>
          </div>
          <div className="ml-auto flex items-end">{event.status}</div>
        </div>
      </Link>
    </div>
  );
}

export default EventCard;
