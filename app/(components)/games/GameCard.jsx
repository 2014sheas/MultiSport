import Link from "next/link";
import ShowUpload from "@/app/(components)/uploads/ShowUpload";

const teamContent = (team) => {
  return (
    <div className="text-center overflow-hidden whitespace-nowrap overflow-ellipsis flex items-center">
      <div className="w-10 mr-2">
        <ShowUpload imageurl={team.logo} altText={team.name} size={32} />
      </div>
      {team.abbreviation}
    </div>
  );
};

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

  const gameNum = game.gameId.replace(`${event.eventId}`, "");
  const bracketType = game.type === "Winners Bracket" ? "Winners" : "Losers";
  return (
    <div className="flex flex-col hover:bg-card-hover rounded-md shadow-lg m-0 w-40">
      <Link href={`/games/${game.gameId}`} style={{ display: "contents" }}>
        <div className={headerSwitch(game.status)}>
          <p className="">{`Game ${gameNum} (${bracketType})`}</p>
        </div>
        <div className="flex flex-col bg-slate-800 m-0 p-1 w-inherit rounded-b-md">
          <div className="flex flex-row justify-between">
            <div>{hasHomeTeam ? teamContent(homeTeam) : game.homeTeam}</div>
            <div>{hasTeams ? game.homeScore : ""}</div>
          </div>
          <div className="flex flex-row justify-between">
            <div>{hasAwayTeam ? teamContent(awayTeam) : game.awayTeam}</div>
            <div>{hasTeams ? game.awayScore : ""}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GameCard;
