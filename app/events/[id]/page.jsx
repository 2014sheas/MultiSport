import TournamentEvent from "@/app/(components)/events/tournament/TournamentEvent";
import ScoredEvent from "@/app/(components)/events/scored/ScoredEvent";
import BowlingPage from "@/app/(components)/events/Bowling/BowlingPage";
import BtnShowContent from "@/app/(components)/events/BtnShowContent";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";

const BASE_URL = process.env.BASE_URL;

const getEventById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/Events/${id}`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get event", error);
  }
};

const getTeams = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/Teams`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get teams", error);
  }
};

const getPlayers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/Players`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get players", error);
  }
};

const getGames = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/Games`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get games", error);
  }
};

const getImage = async (fileName) => {
  try {
    const res = await fetch(`${BASE_URL}/api/Upload/${fileName}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch image");
    }
    const data = await res.text();
    return data;
  } catch (error) {
    console.error("Error fetching image:", error);
  }
};

const EventPage = async ({ params }) => {
  let eventData = await getEventById(params.id);
  let teams = await getTeams();
  let players = await getPlayers();
  let games = await getGames();
  let eventGames = games.filter((game) => game.event == params.id);
  const session = await getSession();
  const userRoles = session?.user["https://multisport.games/roles"];
  const isAdmin =
    userRoles?.includes("admin") || userRoles?.includes("commish");
  const isCaptain = userRoles?.includes("captain");

  eventData = eventData.foundEvent;

  for (const team of teams) {
    team.logo = await getImage(team.logoUrl);
  }

  const captainBlock = () => {};

  //button that links to the evwent edit page for this event
  const adminBlock = () => {
    if (isAdmin) {
      return (
        <div className="flex flex-col items-center w-full">
          <Link href={`/admin/events/${eventData._id}`} className="w-full ">
            <button className="btn w-full">Edit Event</button>
          </Link>
          <br />
        </div>
      );
    }
  };

  const contentSwitch = (eventType) => {
    switch (eventType) {
      case "Tournament":
        return (
          <TournamentEvent
            event={eventData}
            teams={teams}
            players={players}
            games={eventGames}
          />
        );
      case "Bowling":
        return (
          <BowlingPage event={eventData} teams={teams} players={players} />
        );
      default:
        return (
          <ScoredEvent event={eventData} teams={teams} players={players} />
        );
    }
  };

  if (eventData === undefined) {
    return <div>Event Not Found</div>;
  } else {
    return (
      <div className="flex flex-col items-center w-full">
        {contentSwitch(eventData.eventType)}
        <br />
        <br />
        <br />

        {adminBlock()}

        <BtnShowContent content={eventData.rules} contentType={"Rules"} />
      </div>
    );
  }
};

export default EventPage;
