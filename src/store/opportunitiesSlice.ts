import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getOpportunities,
  initialiseOpportunityCache,
} from "../api/opportunities";
import { FullOpportunityModel, MinimalOpportunityModel, SortOptions } from "../types";

export type OpportunitiesState = {
  list: string[];
  sort: SortOptions;
  items: Record<string, MinimalOpportunityModel | FullOpportunityModel>;
  status: "untouched" | "idle" | "loading" | "failed";
};

const initialState: OpportunitiesState = {
  list: [],
  items: {},
  sort: "most-recent",
  status: "untouched",
};

const getOpportunity = initialiseOpportunityCache();

export const fetchOpportunities = createAsyncThunk<
  MinimalOpportunityModel[],
  SortOptions | undefined
>("opportunities/fetchOpportunities", (sort) => getOpportunities(sort));

export const fetchOpportunity = createAsyncThunk<FullOpportunityModel, string>(
  "opportunities/fetchOpportunity",
  (opportunityId: string) => getOpportunity(opportunityId)
);

export const opportunitiesSlice = createSlice({
  name: "opportunities",
  initialState,
  reducers: {
    /**
     * Set the sort order of the opportunities list.
     * @param state OpportunitiesState
     * @param action { type: "opportunities/setSort", payload: SortOptions }   
     */
    setSort: (state: OpportunitiesState, { payload }) => {
      const sortvalue = payload as SortOptions;
      state.sort = sortvalue;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOpportunities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOpportunities.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchOpportunities.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = action.payload.map(({ id }) => id);
        state.items = action.payload.reduce<OpportunitiesState["items"]>(
          (acc, opp) => {
            acc[opp.id] = opp;
            return acc;
          },
          {}
        );
      })
      .addCase(fetchOpportunity.fulfilled, (state, action) => {
        state.items[action.meta.arg] = action.payload;
      });
  },
});

export const opportunitiesActions = {
  fetchOpportunities,
  fetchOpportunity,
  setSort: opportunitiesSlice.actions.setSort,
};

export const opportunitiesReducer = opportunitiesSlice.reducer;
