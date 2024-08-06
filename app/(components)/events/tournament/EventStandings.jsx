// This component displays the standings of a tournament event. It is used in the Tournament component.

const EventStandingHeader = () => {
  return (
    <div className="flex justify-between w-full h-10 bg-gray-800 px-8 pt-1 rounded-t-md">
      <div className="w-1/4">Place</div>
      <div className="w-1/2 text-center">Team</div>
      <div className="w-1/4 text-right">Points</div>
    </div>
  );
};

const EvbentStandingRow = ({ place, teamName, points }) => {
  return (
    <div className="flex justify-between w-full h-10 bg-gray-700 px-8">
      <div className="w-1/4">{place}</div>
      <div className="w-1/2 text-center overflow-hidden whitespace-nowrap overflow-ellipsis">
        {teamName}
      </div>
      <div className="w-1/4 text-right">{points}</div>
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
    console.log("team", team);
    if (team) {
      teamName = teams.find((t) => t.teamId === team).name;
    }
    return { place, teamName, points, index };
  });

  const columns = [
    { field: "place", headerName: "Place", width: 100 },
    { field: "teamName", headerName: "Team", width: 200 },
    { field: "points", headerName: "Points", width: 100 },
  ];

  let table = (
    <div className="flex flex-col items-center w-4/5 bg-gray-800 rounded-md">
      <EventStandingHeader />
      {rows.map((row) => (
        <EvbentStandingRow
          key={row.index}
          place={row.place}
          teamName={row.teamName}
          points={row.points}
        />
      ))}
    </div>
  );

  return <div className="flex flex-col items-center w-full">{table}</div>;
};

export default EventStandings;
