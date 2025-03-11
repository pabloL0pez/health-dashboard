import { useConfig } from "@/config";
import { filterWidgetConfig } from "@/contexts/FiltersContext/constants";
import axios from "axios";

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
    return Promise.resolve(
      filterWidgetConfig
    );
  }
}