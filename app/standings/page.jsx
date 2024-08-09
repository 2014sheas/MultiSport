import Standings from "../(components)/Standings";

const BASE_URL = process.env.BASE_URL;

const getTeams = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/Teams`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get teams", error);
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

const StandingsPage = async () => {
  const teams = await getTeams();
  teams.sort((a, b) => b.totalPoints - a.totalPoints);
  for (const team of teams) {
    team.logo = await getImage(team.logoUrl);
  }
  return (
    <div className="flex flex-col items-center">
      <br />
      <br />
      <Standings teams={teams} />
    </div>
  );
};

export default StandingsPage;
