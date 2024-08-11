import React from "react";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import BtnEditTeam from "@/app/(components)/teams/BtnEditTeam";
import ShowUpload from "@/app/(components)/uploads/ShowUpload";
import PlayerCard from "@/app/(components)/players/PlayerCard";
import { Rating } from "@mui/material";

const BASE_URL = process.env.BASE_URL;

const getTeamById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/Teams/${id}`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get team", error);
  }
};

const getPlayers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/Players`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get players", error);
  }
};

const getImage = async (fileName) => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/Upload/${fileName}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch image");
    }
    const data = await res.text();
    return data;
  } catch (error) {
    console.error("Error fetching image:", error);
  }
};

const getEvents = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/Events`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.error("Failed to get events", error);
  }
};

const TeamPage = async ({ params }) => {
  const teamData = await getTeamById(params.id);
  const team = teamData.foundTeam;
  const events = await getEvents();

  const players = await getPlayers();

  let teamLogo = null;
  if (team.logoUrl) {
    teamLogo = await getImage(team.logoUrl);
  }

  const allowedRoles = ["admin", "captain"];
  const session = await getSession();
  const user = session?.user;

  let userCanEdit = false;
  if (user) {
    const userPlayer = players.find((player) => player.email === user.eamil);
    const userplayerId = userPlayer?.playerId;
    const userRoles = user?.["https://multisport.games/roles"];
    userCanEdit = userRoles.some((role) => allowedRoles.includes(role));
    if (userCanEdit) {
      if (userRoles.includes("admin")) {
        userCanEdit = true;
      } else if (userRoles.includes("captain")) {
        if (updateTeamData.captain === userplayerId) {
          userCanEdit = true;
        }
      }
    }
  }

  let playersOnTeam = players.filter((player) =>
    team.members.includes(player.playerId)
  );

  //Sort team members by last name, using first name as a tiebreaker
  playersOnTeam.sort((a, b) => {
    if (a.last_name < b.last_name) {
      return -1;
    } else if (a.last_name > b.last_name) {
      return 1;
    } else {
      if (a.first_name < b.first_name) {
        return -1;
      } else if (a.first_name > b.first_name) {
        return 1;
      } else {
        return 0;
      }
    }
  });

  let overallEventRatingAverages = events.map((event) => {
    let eventRatingAverage = 0;
    let eventRatingCount = 0;
    playersOnTeam.forEach((player) => {
      if (player.ratings[event.eventId]) {
        eventRatingAverage += player.ratings[event.eventId];
        eventRatingCount++;
      }
    });
    if (eventRatingCount > 0) {
      eventRatingAverage = eventRatingAverage / eventRatingCount;
    }
    return { eventName: event.name, rating: eventRatingAverage };
  });

  const overallRating =
    overallEventRatingAverages
      .map((event) => event.rating)
      .reduce((acc, rating) => acc + rating, 0) /
    overallEventRatingAverages.length;

  return (
    <div className="flex flex-col items-center w-full">
      <h1>{team.name}</h1>
      <br />
      {teamLogo && (
        <ShowUpload imageurl={teamLogo} altText={team.name} size={258} />
      )}
      <br />
      <p className="italic">{team.motto}</p>
      <br />
      {userCanEdit && <BtnEditTeam team={team} />}
      <br />

      {playersOnTeam.map((player) => (
        <PlayerCard key={player.playerId} player={player} team={team} />
      ))}

      <br />
      <div>
        <p className="text-lg font-bold">Team Ratings:</p>
        <div className="flex items-center">
          <div className="w-20">Overall:</div>
          <Rating value={overallRating} readOnly />
        </div>

        <br />
        {overallEventRatingAverages.map((event) => (
          <div key={event.eventName} className="flex items-center">
            <div className="w-20">{event.eventName}: </div>
            <Rating value={event.rating} readOnly />
          </div>
        ))}

        <br />
      </div>
    </div>
  );
};

export default TeamPage;
