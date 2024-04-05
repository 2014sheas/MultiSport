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

const StandingsPage = async () => {
  const teams = await getTeams();
  teams.sort((a, b) => b.totalPoints - a.totalPoints);
  return (
    <div className="flex flex-col items-center">
      <Standings teams={teams} />
    </div>
  );
};

export default StandingsPage;
