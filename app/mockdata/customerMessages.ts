export interface CustomerMessage {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export const customerMessages: CustomerMessage[] = [
  {
    id: "1",
    name: "Milan Mistri",
    avatar:
      "https://ui-avatars.com/api/?name=Saroj&background=2563eb&color=fff",
    lastMessage: "I will arrive in 20 minutes.",
    time: "09:45 AM",
    unread: 2,
  },
  {
    id: "2",
    name: "Atom Kumar",
    avatar:
      "https://ui-avatars.com/api/?name=Sapana&background=0ea5e9&color=fff",
    lastMessage: "Thank you!",
    time: "Monday",
    unread: 1,
  },
  {
    id: "3",
    name: "Amit Sah",
    avatar:
      "https://ui-avatars.com/api/?name=Bikash&background=8b5cf6&color=fff",
    lastMessage: "I'm on my way to your location.",
    time: "2 hours ago",
    unread: 0,
  },
];
