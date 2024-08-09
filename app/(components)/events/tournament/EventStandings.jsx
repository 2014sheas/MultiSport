// This component displays the standings of a tournament event. It is used in the Tournament component.
import Link from "next/link";
import ShowUpload from "../../uploads/ShowUpload";

const EventStandingHeader = () => {
  return (
    <div className="flex justify-between w-full h-10 bg-gray-800 px-8 pt-1 rounded-t-md">
      <div className="w-1/6">Place</div>
      <div className="w-2/3 text-center">Team</div>
      <div className="w-1/6 text-right">Points</div>
    </div>
  );
};

const EventStandingRow = ({ place, teamName, points, teamLogo }) => {
  return (
    <div className="flex justify-between w-full h-10 bg-gray-700 px-8">
      <div className="w-1/6">{place}</div>
      <Link href={`/teams/${teamName}`} className="flex flex-row w-full">
        <div className="w-1/6">
          {teamLogo ? (
            <ShowUpload imageurl={teamLogo} altText={teamName} size={32} />
          ) : null}
        </div>
        <div className="w-7/12 text-left overflow-hidden whitespace-nowrap overflow-ellipsis">
          {teamName}
        </div>
      </Link>
      <div className="w-1/12 text-right">{points}</div>
    </div>
  );
};

const EventStandings = ({ games, teams, event }) => {
  const eventId = event.eventId;

  const pointArray = event.pointsArray;
  const placeArray = ["1st", "2nd", "3rd", "4th", "5th", "-", "7th", "-"];

  const standings = {
    first: games.find((game) => game.gameId === `${eventId}7`).winner,
    second: games.find((game) => game.gameId === `${eventId}7`).loser,
    third: games.find((game) => game.gameId === `${eventId}5`).loser,
    fourth: games.find((game) => game.gameId === `${eventId}4`).loser,
  };

  const standingsArray = [
    standings.first,
    standings.second,
    standings.third,
    standings.fourth,
  ];

  const rows = standingsArray.map((team, index) => {
    const place = placeArray[index];
    const points = pointArray[index];
    let teamName = "TBD";
    let logo = "";
    if (team) {
      teamName = teams.find((t) => t.teamId === team).name;
      logo = teams.find((t) => t.teamId === team).logo;
    }
    return { place, teamName, points, index, logo };
  });

  let table = (
    <div className="flex flex-col items-center w-11/12 bg-gray-800 rounded-md">
      <EventStandingHeader />
      {rows.map((row) => (
        <EventStandingRow
          key={row.index}
          place={row.place}
          teamName={row.teamName}
          points={row.points}
          teamLogo={row.logo}
        />
      ))}
    </div>
  );

  return <div className="flex flex-col items-center w-full">{table}</div>;
};

export default EventStandings;
