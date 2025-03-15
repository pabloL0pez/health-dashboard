import { useConfig } from "@/config";
import { FilterConfig } from "@core/health-dashboard";
import axios from "axios";

interface FiltersResponse {
  filters: FilterConfig[];
}

export class ClaimsService {
  public static async getClaims(query: string = '') {
    const { apis: { healthDashboardApi }, endpoints: { claims } } = useConfig();
    const url = `${healthDashboardApi}${claims}${query ? '?' + query : ''}`;

    return axios
      .get<{}>(url)
      .then(response => {
        return response.data
      });
  }

  public static async getFilters() {
    const { apis: { healthDashboardApi }, endpoints: { filters } } = useConfig();
    const url = `${healthDashboardApi}${filters}`;

    return axios
      .get<FiltersResponse>(url)
      .then(response => {
        return response.data?.filters
      });
  }
}