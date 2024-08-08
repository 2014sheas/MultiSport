import React from "react";
import ShowUpload from "@/app/(components)/uploads/ShowUpload";
import Link from "next/link";
import { Rating } from "@mui/material";

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
const PlayerCard = async ({ player, team }) => {
  let profilePicture = null;
  if (player.profile_image) {
    profilePicture = await getImage(player.profile_image);
  }

  const isCaptain = team?.captains && team.captains.includes(player.playerId);

  const overallRating =
    Object.values(player.ratings).reduce((acc, rating) => acc + rating, 0) /
    Object.values(player.ratings).length;

  return (
    <div className="w-11/12 ">
      <Link href={`/players/${player.playerId}`}>
        <div className="flex flex-row w-full border-2 border-gray-300 p-4 m-4 rounded-lg items-center">
          {player.profile_image && (
            <ShowUpload
              imageurl={profilePicture}
              altText={player.first_name}
              size={64}
            />
          )}
          <div className="flex flex-col pl-4">
            <div className="flex flex-row items-center">
              <h3 className="pr-2">
                {player.first_name + " " + player.last_name}
              </h3>
              {isCaptain && <p className="text-xl text-gray-400"> (C)</p>}
            </div>
            <Rating value={overallRating} readOnly />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PlayerCard;
