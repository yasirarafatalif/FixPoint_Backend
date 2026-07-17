export interface PaymentI {
  bookingId: string;
}

export interface CustomerI {
  name: string;
  email: string;
  phone: string;
  bookingId?: string
  address?: string,
  city?: string,
  postcode?: string
}
