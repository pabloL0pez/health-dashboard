import { FilterConfig } from "@core/health-dashboard";
import { iFiltersService } from "./filters.service.js";

export interface iFiltersController {
  getFilters: () => Promise<FilterConfig[]>;
}

export class FiltersController implements iFiltersController {
  constructor(
    private readonly filtersService: iFiltersService,
  ) {}

  public async getFilters() {
    return this.filtersService.fetchFilters();
  }
}