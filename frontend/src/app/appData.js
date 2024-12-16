const events = [
  {
    name: "Music Festival",
    description: "An exciting outdoor music event featuring top artists.",
    startDate: new Date(2024, 5, 20),
    endDate: new Date(2024, 5, 22),
    location: "Central Park, NYC",
    participants: [
      { id: "1", name: "Alice Johnson", checked: false },
      { id: "2", name: "Bob Smith", checked: false },
      { id: "3", name: "Charlie Brown", checked: true},
    ],
  },
  {
    name: "Tech Conference",
    description: "A gathering for tech enthusiasts to discuss emerging trends.",
    startDate: new Date(2024, 6, 15),
    endDate: new Date(2024, 6, 17),
    location: "San Francisco Convention Center",
    participants: [
      { id: "4", name: "Ahmed Abbas", checked: false },
      { id: "5", name: "Kamel Lina", checked: true },
      { id: "6", name: "Dalil Boumaaza", checked: true},
    ],
  },
  {
    name: "Art Exhibition",
    description: "Showcasing contemporary art from emerging artists.",
    startDate: new Date(2024, 7, 1),
    endDate: new Date(2024, 7, 5),
    location: "Modern Art Gallery, LA",
    participants: [
      { id: "7", name: "Amine Boumediene", checked: true },
      { id: "8", name: "Fidor Dosto", checked: false },
      { id: "9", name: "Naom Chomeskey", checked: true},
    ],
  },
  {
    name: "Marathon",
    description: "Annual city marathon for fitness enthusiasts.",
    startDate: new Date(2024, 8, 10),
    endDate: new Date(2024, 8, 10),
    location: "Downtown Chicago",
    participants: [],
  },
];

const participants = [
  { id: "10", name: "Alice Johnson", checked: false },
  { id: "11", name: "Bob Smith", checked: false },
  { id: "12", name: "Charlie Brown", checked: false },
  { id: "13", name: "Diana Prince", checked: false },
  { id: "14", name: "Ethan Hunt", checked: false },
  { id: "15", name: "Fiona Gallagher", checked: false },
  { id: "16", name: "George Michaels", checked: false },
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
