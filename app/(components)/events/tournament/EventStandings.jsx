import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";

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
    <Table className="w-96">
      <TableHead className="bg-slate-600 dark:bg-gray-800">
        <TableRow>
          {columns.map((column) => (
            <TableCell key={column.field} align="center" className="text-white">
              {column.headerName}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.index}>
            {columns.map((column) => (
              <TableCell
                key={column.field}
                align="center"
                className="text-white"
              >
                {row[column.field]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return <div className="flex flex-col items-center w-96">{table}</div>;
};

export default EventStandings;
