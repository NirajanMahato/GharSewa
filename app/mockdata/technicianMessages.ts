export interface TechnicianMessage {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
}

export const technicianMessages: TechnicianMessage[] = [
  {
    id: "1",
    name: "Customer Ravina",
    avatar: "https://ui-avatars.com/api/?name=Ravina&background=2563eb&color=fff",
    lastMessage: "Can you come at 5 PM?",
    time: "10:15 AM",
    unread: 1,
  },
  {
    id: "2",
    name: "Support Center",
    avatar: "https://ui-avatars.com/api/?name=Support&background=6366f1&color=fff",
    lastMessage: "Your schedule has been updated.",
    time: "Yesterday",
    unread: 0,
  },
  {
    id: "3",
    name: "Customer Sujan",
    avatar: "https://ui-avatars.com/api/?name=Sujan&background=0ea5e9&color=fff",
    lastMessage: "Thank you for your help!",
    time: "Monday",
    unread: 2,
  },
];
