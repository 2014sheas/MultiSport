import Dashboard from "./(components)/Dashboard";

const getEvents = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Events", {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.log("Failed to get events", error);
  }
};

const HomePage = async () => {
  const events = await getEvents();
  return (
    <div>
      <Dashboard events={events} />
    </div>
  );
};

export default HomePage;
