import React from "react";
import { useRouter } from "next/navigation";
import updatePoints from "../updatePoints";

const BtnCompleteBowling = ({ players, teams, event }) => {
  const router = useRouter();
  const teamScores = teams.map((team) => {
    const playersOnTeam = players.filter((player) =>
      team.members.includes(player.playerId)
    );
    if (playersOnTeam.length === 0) {
      return {
        team: team,
        teamBestScore: 0,
        playerBestScores: [],
      };
    }
    const playerBestScores = playersOnTeam.map((player) => {
      if (player.bowlScore === undefined || player.bowlScore.length != 2) {
        return 0;
      }
      return Math.max(player.bowlScore[0], player.bowlScore[1]);
    });
    playerBestScores.sort((a, b) => b - a);
    const teamBestScore = playerBestScores.reduce((acc, score) => {
      return acc + score;
    }, 0);
    return {
      team: team,
      teamBestScore: teamBestScore,
      playerBestScores: playerBestScores,
    };
  });

  console.log(teamScores);

  // Sort teams according to their overall score, then the highest score of any player on the team (and so on)
  teamScores.sort((a, b) => {
    if (a.teamBestScore > b.teamBestScore) {
      return -1;
    } else if (a.teamBestScore < b.teamBestScore) {
      return 1;
    } else {
      for (let i = 0; i < a.playerBestScores.length; i++) {
        if (a.playerBestScores[i] > b.playerBestScores[i]) {
          return -1;
        } else if (a.playerBestScores[i] < b.playerBestScores[i]) {
          return 1;
        }
      }
      return 0;
    }
  });

  const resultsArr = teamScores.map((teamScore) => {
    return teamScore.team.teamId;
  });

  const handleComplete = async (e) => {
    e.preventDefault();
    const updatedEvent = { ...event, results: resultsArr, status: "Completed" };

    const res = await fetch(`/api/Events/${event._id}`, {
      method: "PUT",
      body: JSON.stringify({ formData: updatedEvent }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Failed to start event" + res.status);
    } else {
      await updatePoints();
      router.push(`/standings`);
    }
    router.push(`/events/${event.eventId}`);
  };

  return (
    <button onClick={handleComplete} className="btn w-1/2">
      Complete Event
    </button>
  );
};

export default BtnCompleteBowling;
