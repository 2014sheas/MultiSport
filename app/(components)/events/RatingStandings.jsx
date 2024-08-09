import React from "react";
import ShowUpload from "../uploads/ShowUpload";
import { Rating } from "@mui/material";

const RatingStandings = ({ teams, players, event }) => {
  let overallteamRatingAverages = teams.map((team) => {
    const playersOnTeam = players.filter((player) =>
      team.members.includes(player.playerId)
    );
    let teamRatingAverage = 0;
    let teamRatingCount = 0;
    playersOnTeam.forEach((player) => {
      if (player.ratings[event.eventId]) {
        teamRatingAverage += player.ratings[event.eventId];
        teamRatingCount++;
      }
    });
    if (teamRatingCount > 0) {
      teamRatingAverage = teamRatingAverage / teamRatingCount;
    }
    return { teamId: team.teamId, rating: teamRatingAverage };
  });

  overallteamRatingAverages.sort((a, b) => {
    return b.rating - a.rating;
  });

  const teamRatingStandings = overallteamRatingAverages.map((teamEntry) => {
    const team = teams.find((t) => t.teamId === teamEntry.teamId);
    return (
      <div key={team.teamId} className="flex flex-row items-center w-5/6 mb-2">
        <div className="pr-2">
          <ShowUpload imageurl={team.logo} altText={team.name} size={32} />
        </div>
        <div className="w-7/12 text-left overflow-hidden whitespace-nowrap overflow-ellipsis">
          {team.name}
        </div>
        <Rating value={teamEntry.rating} precision={0.1} readOnly />
      </div>
    );
  });

  return (
    <div className="flex flex-col items-center w-full">
      {teamRatingStandings}
    </div>
  );
};

export default RatingStandings;
