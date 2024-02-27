import React from "react";
import SeedSelection from "./SeedSelection";
import BtnGameCreation from "./BtnGameCreation";

const TournamentEvent = ({ event, teams, players }) => {
  return (
    <div>
      <h1>{event.name}</h1>
      <BtnGameCreation event={event} />
    </div>
  );
};

export default TournamentEvent;
