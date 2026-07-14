export interface BookingsI{
    serviceId: string,
    bookingDate: Date,
    customerNote?: string
}

export interface id{
    bookingId?: string,
    userId?: string,
    role?:string
}