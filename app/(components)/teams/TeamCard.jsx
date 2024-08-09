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

const writeCaptain = (isCaptain) => {
  if (isCaptain) {
    return " (C)";
  }
  return "";
};

const TeamCard = async ({ team, players }) => {
  let teamLogo = null;
  if (team.logoUrl) {
    teamLogo = await getImage(team.logoUrl);
  }

  let teamMembers = team.members.map((member) => {
    const player = players.find((player) => player.playerId === member);
    return player;
  });

  //sort members by last name, then first name
  teamMembers.sort((a, b) => {
    const aName = [a.first_name, a.last_name];
    const bName = [b.first_name, b.last_name];
    if (aName[1] < bName[1]) {
      return -1;
    }
    if (aName[1] > bName[1]) {
      return 1;
    }
    if (aName[0] < bName[0]) {
      return -1;
    }
    if (aName[0] > bName[0]) {
      return 1;
    }
    return;
  });

  let teamMemberSpan = (member) => {
    const isCaptain = team.captains && team.captains.includes(member.playerId);
    return (
      <div key={member._id} className="flex flex-row items-center">
        <p>
          {member.first_name} {member.last_name}
        </p>
        <p className="text-l text-gray-400">{writeCaptain(isCaptain)}</p>
      </div>
    );
  };

  //dived the members into two equal groups
  const half = Math.ceil(teamMembers.length / 2);
  let firstHalf = [];
  let secondHalf = [];
  for (let i = 0; i < half; i++) {
    firstHalf.push(teamMembers[i]);
  }
  for (let i = half; i < teamMembers.length; i++) {
    secondHalf.push(teamMembers[i]);
  }

  const memberRows = (
    <div className="flex flex-row w-full">
      <div className="px-6">
        {firstHalf.map((member) => (
          <span key={member._id}>{teamMemberSpan(member)}</span>
        ))}
      </div>
      <div>
        {secondHalf.map((member) => (
          <span key={member._id}>{teamMemberSpan(member)}</span>
        ))}
      </div>
    </div>
  );

  return (
    <div className="border-2 border-gray-300 p-4 m-4 rounded-lg w-11/12 md:w-1/2">
      <Link href={`/teams/${team.teamId}`}>
        <div className="flex flex-row items-center">
          {team.logoUrl && (
            <div className="pr-0 w-1/4">
              <ShowUpload imageurl={teamLogo} altText={team.name} size={64} />
            </div>
          )}
          <div className="flex flex-col w-3/4">
            <div className="flex flex-row items-center overflow-hidden whitespace-nowrap">
              <h4>{team.name}</h4>
            </div>
            <div className="flex flex-row">
              {team.members.length > 0 && memberRows}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default TeamCard;
