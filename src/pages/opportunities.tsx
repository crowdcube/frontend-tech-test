import * as React from "react";
import { OpportunitiesList } from "../components/opportunitiesList";

export const OpportunitiesPage: React.FC = () => {
  return (
    <>
      <select name="sort-by">
        <option disabled>Sort</option>
        <option value="most-recent">Most recent investment</option>
        <option value="percentage">Percentage complete</option>
        <option value="name-desc">a-z</option>
        <option value="name-asc">z-a</option>
      </select>
      <OpportunitiesList />
    </>
  );
};
