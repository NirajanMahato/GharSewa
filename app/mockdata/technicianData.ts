export interface Technician {
  id: string;
  fullName: string;
  role: string;
  rating: number;
  reviewCount: number;
  distance: string;
  arrivalTime: string;
  serviceCharge: string;
  avatar?: string;
  isOnline: boolean;
}

export const technicianData: Technician = {
  id: "tech_001",
  fullName: "Milan Mistri",
  role: "Plumbing Specialist",
  rating: 0,
  reviewCount: 0,
  distance: "2.1 km away",
  arrivalTime: "10-15 minutes",
  serviceCharge: "Rs 2200",
  avatar: "https://ui-avatars.com/api/?name=MM&background=2563eb&color=fff", // Will use default image
  isOnline: true,
};

export const getTechnicianByBookingId = (bookingId: string): Technician => {
  return {
    ...technicianData,
    id: bookingId,
  };
};
