import TournamentEvent from "@/app/(components)/events/tournament/TournamentEvent";
import ScoredEvent from "@/app/(components)/events/scored/ScoredEvent";

const getEventById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Events/${id}`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get event", error);
  }
};

const getTeams = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/Teams`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get teams", error);
  }
};

const getPlayers = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/Players`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get players", error);
  }
};

const getGames = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/Games`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get games", error);
  }
};

const EventPage = async ({ params }) => {
  let eventData = await getEventById(params.id);
  let teams = await getTeams();
  let players = await getPlayers();
  let games = await getGames();
  let eventGames = games.filter((game) => game.event == params.id);

  eventData = eventData.foundEvent;

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
  } else {
    return <ScoredEvent event={eventData} teams={teams} players={players} />;
  }
};

export default EventPage;
