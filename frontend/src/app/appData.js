const events = [
  {
    name: "Music Festival",
    description: "An exciting outdoor music event featuring top artists.",
    startDate: new Date(2024, 5, 20),
    endDate: new Date(2024, 5, 22),
    location: "Central Park, NYC",
    participants: ["Peter", "Quinn", "Rachel"],
  },
  {
    name: "Tech Conference",
    description: "A gathering for tech enthusiasts to discuss emerging trends.",
    startDate: new Date(2024, 6, 15),
    endDate: new Date(2024, 6, 17),
    location: "San Francisco Convention Center",
    participants: [],
  },
  {
    name: "Art Exhibition",
    description: "Showcasing contemporary art from emerging artists.",
    startDate: new Date(2024, 7, 1),
    endDate: new Date(2024, 7, 5),
    location: "Modern Art Gallery, LA",
    participants: [],
  },
  {
    name: "Marathon",
    description: "Annual city marathon for fitness enthusiasts.",
    startDate: new Date(2024, 8, 10),
    endDate: new Date(2024, 8, 10),
    location: "Downtown Chicago",
    participants: [],
  },
  {
    name: "Cooking Workshop",
    description: "Learn the secrets of gourmet cooking with top chefs.",
    startDate: new Date(2024, 9, 20),
    endDate: new Date(2024, 9, 22),
    location: "Culinary Academy, Miami",
    participants: [],
  },
  {
    name: "Book Fair",
    description: "A paradise for book lovers with book launches and signings.",
    startDate: new Date(2024, 10, 5),
    endDate: new Date(2024, 10, 7),
    location: "City Library, Boston",
  },
  {
    name: "Film Festival",
    description:
      "Premieres of independent films and meet-the-director sessions.",
    startDate: new Date(2024, 11, 15),
    endDate: new Date(2024, 11, 20),
    location: "Downtown Theater, Seattle",
    participants: [],
  },
];

const participants = [
  { id: "1", name: "Alice Johnson", checked: false },
  { id: "2", name: "Bob Smith", checked: false },
  { id: "3", name: "Charlie Brown", checked: false },
  { id: "4", name: "Diana Prince", checked: false },
  { id: "5", name: "Ethan Hunt", checked: false },
  { id: "6", name: "Fiona Gallagher", checked: false },
  { id: "7", name: "George Michaels", checked: false },
];

export const addEvent = (event) => {
  events.push(event);
};

export const getEvents = () => {
  return events;
};

export const getParticipants = () => {
  return participants;
};
