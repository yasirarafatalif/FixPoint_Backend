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
