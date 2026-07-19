export interface ServicesI {
    bio?: string,
    description: string,
    title: string,
    duration: Number,
    price: Number,
    categoryId: string
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