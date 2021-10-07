import { MinimalOpportunityModel } from "../types";

export const getOpportunities = async (
  sort?: "most-recent" | "percentage" | "name-desc" | "name-asc"
) => {
  const response = await fetch(
    `http://localhost:9001/api/opportunities${sort ? `?sort=${sort}` : ""}`
  );
  const data = await response.json();
  return data;
};

export const initialiseOpportunityCache = () => {
  return async (opportunityId: string) => {
    const cache: Record<string, MinimalOpportunityModel> = {};
    if (cache[opportunityId]) {
      return cache[opportunityId];
    }

    const response = await fetch(
      `http://localhost:9001/api/opportunity/${opportunityId}`
    );
    const data = await response.json();
    cache[opportunityId] = data;
    return data;
  };
};
