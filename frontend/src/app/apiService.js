export const fetchEvents = async (token) => {
  const response = await fetch(
    "https://event-checkins-app.onrender.com/events/list/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to fetch events!");
  }
  return response.json(); // Returns the list of events
};

export const createEvent = async (eventData, token) => {
  const response = await fetch(
    "https://event-checkins-app.onrender.com/events/create/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(eventData),
    }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to create event!");
  }

  return response.json();
};

export const fetchEventDetails = async (eventId, token) => {
  const response = await fetch(
    `https://event-checkins-app.onrender.com/events/details/?event_id=${eventId}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Event not found");
  }
  return response.json(); // Returns event details with participants
};
