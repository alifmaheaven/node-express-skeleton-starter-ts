export default interface PaginationInterfaces {
  meta: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
  data: any[];
}