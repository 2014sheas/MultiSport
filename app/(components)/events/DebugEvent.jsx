const BtnDebugEvent = ({ event, teams }) => {
  const onSubmit = async (event) => {
    try {
      const res = await fetch(`/api/Events/${event.eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formdata: event }),
      });
      return res.json();
    } catch (error) {
      console.log("Failed to update event", error);
    }
  };
  return <div>BtnDebugEvent</div>;
};

export default BtnDebugEvent;
