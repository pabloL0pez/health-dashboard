import { FilterConfig } from "@core/health-dashboard";

export interface FiltersResponse {
  filters: FilterConfig[];
}

export interface ReplyFilters {
  200: FiltersResponse;
  500: { message: string };
}