import * as React from "react";
import { OpportunitiesList } from "../components/opportunitiesList";
import { opportunitiesActions } from "../store/opportunitiesSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { SortOptions } from "../types";

export const OpportunitiesPage: React.FC = () => {

  const dispatch = useAppDispatch();
  const opportunities = useAppSelector((state) => state.opportunities);

  /**
   * Handle the sort option change
   * @param event - The event that triggered the sort select
   */
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const sortValue: SortOptions = event.target.value as SortOptions;
    dispatch(opportunitiesActions.setSort(sortValue));
  }

  return (
    <>
      <select value={opportunities.sort} onChange={(e) => handleChange(e)} name="sort-by">
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
