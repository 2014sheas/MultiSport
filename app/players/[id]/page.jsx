import React from "react";
import Image from "next/image";
import ShowUpload from "@/app/(components)/uploads/ShowUpload";
import BtnEditPlayer from "@/app/(components)/players/BtnEditPlayer";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { Rating } from "@mui/material";
import Link from "next/link";

const BASE_URL = process.env.BASE_URL;

const getImage = async (fileName) => {
  try {
    const res = await fetch(`${BASE_URL}/api/Upload/${fileName}`, {
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

const getPlayerById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/api/Players/${id}`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get player", error);
  }
};

const getTeams = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/Teams`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.error("Failed to get teams", error);
  }
};

const PlayerPage = async ({ params }) => {
  const playerData = await getPlayerById(params.id);
  const player = playerData.foundPlayer;
  const events = await getEvents();
  const teams = await getTeams();
  let imageUrl = null;

  const overallRating =
    Object.values(player?.ratings).reduce((acc, rating) => acc + rating, 0) /
    Object.values(player?.ratings).length;

  const session = await getSession();
  const user = session?.user;
  const userCanEdit = user?.nickname === player.userId;

  if (!player) {
    return <p>Player not found</p>;
  }
  if (player.profile_image && player.profile_image.length > 0) {
    imageUrl = await getImage(player.profile_image);
  }

  let playerTeamName = null;
  let playerTeamLogo = null;
  if (player.team) {
    const playerTeam = teams.find((team) => team.teamId === player.team);
    if (playerTeam.logoUrl) {
      playerTeamLogo = await getImage(playerTeam.logoUrl);
    }
    playerTeamName = playerTeam.name;
  }

  const eventsForRatings = Object.keys(player?.ratings);

  return (
    <div className="flex flex-col items-center">
      <h1>
        {player.first_name} {player.last_name}
      </h1>
      {playerTeamName && (
        <Link href={`/teams/${player.team}`}>
          <div className="flex flex-row items-center">
            {playerTeamLogo && (
              <div className="pr-2">
                <ShowUpload
                  imageurl={playerTeamLogo}
                  altText={playerTeamName}
                  size={32}
                />
              </div>
            )}
            <h4 className="text-gray-400">{playerTeamName}</h4>
          </div>
        </Link>
      )}
      <br />
      {imageUrl && (
        <ShowUpload
          imageurl={imageUrl}
          altText={player.first_name}
          size={256}
        />
      )}
      <br />
      {userCanEdit && (
        <div className="w-full flex flex-col items-center">
          <BtnEditPlayer player={player} />
          <br />
        </div>
      )}
      <p>{player.bio}</p>

      <br />
      <div>
        <p className="text-lg font-bold">Self-Ratings:</p>
        <div className="flex items-center">
          <div className="w-20">Overall:</div>
          <Rating value={overallRating} readOnly />
        </div>

        <br />
        {eventsForRatings.map((event) => (
          <div key={event} className="flex items-center">
            <div className="w-20">
              {events.find((e) => e.eventId === event)?.name}:{" "}
            </div>
            <Rating value={player.ratings[event]} readOnly />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerPage;
