import { BookingStatus, WeekDay } from "../../../generated/prisma/client";

export interface TechniciansI {
  skills?: string[];
  bio?: string;
  experience?: number;
  location?: string;
  isAvailable?: boolean;
  status?: string
}
export interface UpdateAvailabilityI {
  day: WeekDay;
  startTime: string;
  endTime: string;
}
export interface UpdateStatus {
  status?: BookingStatus
}

export interface TechnicianFilters {
  searchTerm?: string;
  location?: string;
  skills?: string;
  experience?: string;
  isAvailable?: string;

  page?: string;
  limit?: string;

  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
