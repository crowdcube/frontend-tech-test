import { MinimalOpportunityModel, SortOptions } from "../types";

// For the sake of the task. move this here.
interface CacheObject {
  [id: string]: Record<string, MinimalOpportunityModel>;
}
// For the sake of the task. move this here.
// This lovely global variable just collects all the opportunities.
const cache: CacheObject = {};

export const getOpportunities = async (
  sort?: SortOptions
) => {
  const response = await fetch(
    `http://localhost:9001/api/opportunities${sort ? `?sort=${sort}` : ""}`
  );
  const data = await response.json();
  return data;
};

export const initialiseOpportunityCache = () => {
  return async (opportunityId: string) => {

    // Leave the old cache in place for now.
    // Yay for talking points!
    if (cache[opportunityId]) {
      return cache[opportunityId];
    }

    const response = await fetch(
      `http://localhost:9001/api/opportunity/${opportunityId}`
    );
    const data = await response.json();

    // Set the cache. Cache is a global variable.
    cache[opportunityId] = data;

    return data;
  };
};
