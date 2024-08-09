import TournamentEvent from "@/app/(components)/events/tournament/TournamentEvent";
import ScoredEvent from "@/app/(components)/events/scored/ScoredEvent";
import BowlingPage from "@/app/(components)/events/Bowling/BowlingPage";

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

  eventData = eventData.foundEvent;

  for (const team of teams) {
    team.logo = await getImage(team.logoUrl);
  }

  if (eventData === undefined) {
    return <div>Event Not Found</div>;
  } else if (eventData.eventType == "Tournament") {
    return (
      <TournamentEvent
        event={eventData}
        teams={teams}
        players={players}
        games={eventGames}
      />
    );
  } else if (eventData.eventType == "Bowling") {
    return <BowlingPage event={eventData} teams={teams} players={players} />;
  } else {
    return <ScoredEvent event={eventData} teams={teams} players={players} />;
  }
};

export default EventPage;
