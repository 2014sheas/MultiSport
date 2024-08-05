import { useState } from "react";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SubContainer } from "./RoundContainer";

const GameCols = ({ event, teams, games, leftRound }) => {
  const rightRound = leftRound + 1;
  const leftGames = games.filter((game) => game.round === leftRound);
  const rightGames = games.filter((game) => game.round === rightRound);

  const maxGames = Math.max(leftGames.length, rightGames.length);
  const height = maxGames * 125;

  const hasGamesSwitch = (roundGames) => {
    if (roundGames.length > 0) {
      return (
        <div className="w-170px">
          <SubContainer
            event={event}
            teams={teams}
            games={roundGames}
            numGames={maxGames}
          />
        </div>
      );
    } else {
      return <div className={`h-[${height}px] w-[170px]`}></div>;
    }
  };
  return (
    <div className="flex flex-row justify-around w-[350px]">
      {hasGamesSwitch(leftGames)}
      {hasGamesSwitch(rightGames)}
    </div>
  );
};

const BracketMobile = ({ event, teams, players, games }) => {
  const nonCompletedGames = games.filter((game) => !game.winner);
  const uniqueRounds = [...new Set(games.map((game) => game.round))];
  const maxRound = Math.max(...uniqueRounds);
  let currentRound = maxRound - 1;

  if (nonCompletedGames.length > 0) {
    currentRound = Math.min(...nonCompletedGames.map((game) => game.round));
    if (currentRound == maxRound) {
      currentRound--;
    }
  }

  const [leftRound, setLeftRound] = useState(currentRound);
  const [rightRound, setRightRound] = useState(currentRound + 1);

  let winnerGames = games.filter((game) => game.type == "Winners Bracket");
  let loserGames = games.filter((game) => game.type == "Losers Bracket");

  const isDisplayingWinnerGames =
    winnerGames.filter(
      (game) => game.round >= leftRound && game.round <= rightRound
    ).length > 0;
  const isDisplayingLoserGames =
    loserGames.filter(
      (game) => game.round >= leftRound && game.round <= rightRound
    ).length > 0;

  const handleDereaseRound = () => {
    if (leftRound > 1) {
      setLeftRound(leftRound - 1);
      setRightRound(rightRound - 1);
    }
  };

  const handleIncreaseRound = () => {
    if (rightRound < maxRound) {
      setLeftRound(leftRound + 1);
      setRightRound(rightRound + 1);
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <button
        onClick={handleDereaseRound}
        disabled={leftRound === 1}
        className="disabled:opacity-20"
      >
        <FontAwesomeIcon icon={faChevronLeft} size="xl" />
      </button>
      <div className="flex flex-col min-h-[700px] justify-center">
        <GameCols
          event={event}
          teams={teams}
          games={winnerGames}
          leftRound={leftRound}
        />
        <GameCols
          event={event}
          teams={teams}
          games={loserGames}
          leftRound={leftRound}
        />
      </div>
      <button
        onClick={handleIncreaseRound}
        disabled={rightRound === maxRound}
        className="disabled:opacity-20"
      >
        <FontAwesomeIcon icon={faChevronRight} size="xl" />
      </button>
    </div>
  );
};

export default BracketMobile;
