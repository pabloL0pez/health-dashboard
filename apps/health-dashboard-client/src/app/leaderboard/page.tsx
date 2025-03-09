import type { Metadata } from "next";
import { baseMetadata } from "../constants";
import { capitalize } from "@/shared/utils/capitalize";
import { pageName } from "@/app/leaderboard/constants";

export const metadata: Metadata = {
  title: baseMetadata.baseTitle.concat(` | ${capitalize(pageName)}`),
  description: `Health dashboard ${pageName}`,
};

const Leaderboard = () => {
  return (
    <div>
      <span>This is the {pageName} page</span>
    </div>
  );
}

export default Leaderboard;