export type WithPagination<T> = T & {
  pagination?: {
    limit: number
    offset: number
  }
}

export type Paginated<T> = {
  data: T[]
  meta: {
    currentPage: number
    totalPages: number
    totalItems: number
  }
}
