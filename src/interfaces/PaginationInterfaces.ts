export default interface Pagination {
  meta: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
  data: any[];
}