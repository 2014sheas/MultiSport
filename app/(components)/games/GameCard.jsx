import Link from "next/link";

const GameCard = ({ game, allGames, event, teams }) => {
  const homeTeam = teams.find((team) => team.teamId === game.homeTeam);
  const awayTeam = teams.find((team) => team.teamId === game.awayTeam);
  const hasHomeTeam = homeTeam ? true : false;
  const hasAwayTeam = awayTeam ? true : false;
  const hasTeams = hasHomeTeam && hasAwayTeam;

  const headerSwitch = (status) => {
    let className =
      "flex mt-0 justify-center items-center w-inherit text-sm rounded-t-md ";
    let bg = "bg-slate-800";
    switch (status) {
      case "Upcoming":
        bg = "bg-slate-600";
        break;
      case "In Progress":
        bg = "bg-amber-400 text-black";
        break;
      case "Completed":
        bg = "bg-emerald-800";
        break;
      default:
        bg = "bg-slate-600";
        break;
    }
    return className + bg;
  };
  return (
    <div className="flex flex-col hover:bg-card-hover rounded-md shadow-lg m-5 w-44">
      <Link href={`/games/${game.gameId}`} style={{ display: "contents" }}>
        <div className={headerSwitch(game.status)}>
          <p className="">{game.gameId}</p>
        </div>
        <div className="flex flex-col bg-slate-800 m-0 p-1 w-inherit rounded-b-md">
          <div className="flex flex-row justify-between">
            <div>{hasHomeTeam ? homeTeam.abbreviation : game.homeTeam}</div>
            <div>{hasTeams ? game.homeScore : ""}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div>{hasAwayTeam ? awayTeam.abbreviation : game.awayTeam}</div>
            <div>{hasTeams ? game.awayScore : ""}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GameCard;
