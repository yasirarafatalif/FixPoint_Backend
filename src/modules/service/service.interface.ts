export interface ServicesI {
    bio?: string,
    discription: string,
    title: string,
    duration: Number,
    price: Number
}

export interface ServiceFilters {
  type?: string;
  location?: string;

  searchTerm?: string;

  page?: number;
  limit?: number;

  sortBy?: string;
  sortOrder?: "asc" | "desc";
}