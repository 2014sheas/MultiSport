import React from "react";
import Image from "next/image";
import ShowUpload from "@/app/(components)/uploads/ShowUpload";
import getCroppedImg from "@/app/(components)/uploads/cropImage";
import BtnEditPlayer from "@/app/(components)/players/BtnEditPlayer";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { Rating } from "@mui/material";

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

const showCroppedImage = async (imageurl, croppedArea) => {
  try {
    const croppedImage = await getCroppedImg(imageurl, croppedArea);
    const croppedUrl = URL.createObjectURL(croppedImage);
    console.log({ croppedUrl });
  } catch (error) {
    console.error(error);
  }
};

const PlayerPage = async ({ params }) => {
  const playerData = await getPlayerById(params.id);
  const player = playerData.foundPlayer;
  const events = await getEvents();
  let imageUrl, croppedImage;

  const session = await getSession();
  const user = session?.user;
  const userCanEdit = user?.nickname === player.userId;

  if (!player) {
    return <p>Player not found</p>;
  }
  if (playerData.profile_image && playerData.profile_image.length > 0) {
    imageUrl = await getImage(player.profile_image);
    croppedImage = await showCroppedImage(imageUrl, player.croppedArea);
  } else {
    imageUrl = null;
  }

  const eventsForRatings = Object.keys(player?.ratings);

  return (
    <div className="flex flex-col items-center">
      <h2>
        {player.first_name} {player.last_name}
      </h2>
      {userCanEdit && <BtnEditPlayer player={player} />}
      {player.team?.length > 0 && (
        <p className="text-lg font-bold">Team: {player.team}</p>
      )}
      <p>{player.bio}</p>
      <br />
      <div>
        <p className="text-lg font-bold">Event Self-Ratings:</p>
        {eventsForRatings.map((event) => (
          <div key={event} className="flex items-center">
            {events.find((e) => e.eventId === event)?.name}:{" "}
            <Rating value={player.ratings[event]} readOnly />
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      {imageUrl ? <showCroppedImage imageurl={croppedImage} /> : <br />}
    </div>
  );
};

export default PlayerPage;
