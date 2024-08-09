import React, { useState } from "react";
import BowlingTeamForm from "./BowlingTeamForm";
import TeamStandings from "./BowlingTeamStandings";
import BowlingTeamScores from "./BowlingTeamScores";
import BowlingOverallStandings from "./BowlingOverallStandings";
import BtnCompleteBowling from "./BtnCompleteBowling";
import Link from "next/link";

const BowlingActivePage = ({ event, teams, players, user }) => {
  const userRoles = user?.["https://multisport.games/roles"];
  const isCaptain = userRoles?.includes("captain");
  const isAdmin =
    userRoles?.includes("admin") || userRoles?.includes("commish");

  const [activeContent, setActiveContent] = useState("standings-teams");
  const [activeTeam, setActiveTeam] = useState(null);

  const captainBlock = () => {
    if (isCaptain) {
      const userplayerId = players.find(
        (player) => player.userId === user.nickname
      ).playerId;
      const captainsTeam = teams.find((team) =>
        team.captains.includes(userplayerId)
      );
      if (captainsTeam === undefined) {
        return null;
      }
      if (event.status === "In Progress") {
        return (
          <div className="flex flex-col items-center w-full">
            <BowlingTeamForm team={captainsTeam} players={players} />
            <br />
          </div>
        );
      } else {
        return null;
      }
    }
  };

  const adminBlock = () => {
    if (isAdmin) {
      return (
        event.status === "In Progress" && (
          <div className="flex flex-col items-center w-full">
            <br />
            <BtnCompleteBowling players={players} teams={teams} event={event} />
            <br />
          </div>
        )
      );
    }
  };

  const showContent = () => {
    switch (activeContent) {
      case "standings-overall":
        return <BowlingOverallStandings teams={teams} players={players} />;
      case "standings-teams":
        return <TeamStandings teams={teams} players={players} />;
      case `scores-team`:
        const team = teams.find((team) => team.teamId === activeTeam);
        return (
          <div>
            <BowlingTeamScores team={team} players={players} />
          </div>
        );
      case "edit-team":
        return (
          <div className="flex flex-col items-center w-full">
            {isCaptain && captainBlock()}
            <br />
          </div>
        );
      default:
        return <div>Overall Standings</div>;
    }
  };

  const handleTabClick = (tab) => {
    if (tab.includes("scores-team")) {
      const teamId = tab.split("-")[2];
      setActiveContent("scores-team");
      setActiveTeam(teamId);
    } else {
      setActiveContent(tab);
      setActiveTeam(null);
    }
  };

  const standingsTabs = [
    { name: "Individual Standings", value: "standings-overall" },
    { name: "Team Standings", value: "standings-teams" },
  ];

  const teamTabs = teams.map((team) => {
    return { name: team.abbreviation, value: `scores-team-${team.teamId}` };
  });

  const adminTabs = [{ name: "Edit Team", value: "edit-team" }];

  const showTabRow = (tabs) => {
    return (
      <div className="flex flex-row w-full">
        {tabs.map((tab) => {
          let tabColor =
            activeContent === tab.value ? "bg-blue-800" : "bg-blue-500";
          if (activeContent === "scores-team") {
            tabColor =
              activeTeam === tab.value.split("-")[2]
                ? "bg-blue-800"
                : "bg-blue-500";
          }

          const tabwidth = `1/${tabs.length}`;
          return (
            <button
              key={tab.value}
              onClick={() => handleTabClick(tab.value)}
              className={`flex-1 ${tabColor} w-${tabwidth} p-2 m-1 rounded-md`}
            >
              {tab.name}
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-2xl">{event.name}</h1>
        <br />
      </div>
      {isCaptain && event.status === "In Progress" && showTabRow(adminTabs)}
      <br />
      {showTabRow(standingsTabs)}
      {showTabRow(teamTabs)}
      <br></br>
      {showContent()}
      <br />
      {isAdmin && adminBlock()}
    </div>
  );
};

export default BowlingActivePage;
