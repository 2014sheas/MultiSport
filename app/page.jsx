import Dashboard from "./(components)/Dashboard";

const BASE_URL = process.env.BASE_URL;

const getEvents = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/Events`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get events", error);
  }
};

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

const HomePage = async () => {
  const events = await getEvents();
  const teams = await getTeams();
  return (
    <div>
      <Dashboard events={events} teams={teams} />
    </div>
  );
};

export default HomePage;
