type PaginateType = (
  page: number,
  limit: number,
  total: number
) => PaginationType;

type PaginationType = {
  current_page: number;
  total_page: number;
  start_index: number;
  end_index: number;
  next_page?: number;
  prev_page?: number;
};

export const paginate: PaginateType = (page, per_page, total) => {
  const pageCount = Math.ceil(total / per_page);
  const start = (page - 1) * per_page + 1;
  let end = start + per_page - 1;

  if (end > total) end = total;

  const Pagination: PaginationType = {
    current_page: page,
    total_page: pageCount,
    start_index: start,
    end_index: end,
  };

  if (page < pageCount) Pagination.next_page = page + 1;
  if (page > 1) Pagination.prev_page = page - 1;
  return Pagination;
};
