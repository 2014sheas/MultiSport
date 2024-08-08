import Link from "next/link";
import React from "react";
import ShowUpload from "../uploads/ShowUpload";

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

const TeamCard = async ({ team, players }) => {
  let teamLogo = null;
  if (team.logoUrl) {
    teamLogo = await getImage(team.logoUrl);
  }

  return (
    <div className="border-2 border-gray-300 p-4 m-4 rounded-lg w-11/12 md:w-1/2">
      <Link href={`/teams/${team.teamId}`}>
        <div className="flex flex-row items-center">
          {team.logoUrl && (
            <ShowUpload imageurl={teamLogo} altText={team.name} size={32} />
          )}
          <div className="flex flex-col">
            <h4>{team.name}</h4>
            <div className="flex flex-row">
              {team.members.length > 0 && (
                <div>
                  {team.members.map((member) => {
                    const player = players.find((p) => p.playerId === member);
                    return (
                      <span key={player.playerId} className="pr-2">
                        {`${player.first_name} ${player.last_name}`}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TeamCard;
