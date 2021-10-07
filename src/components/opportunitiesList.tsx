import * as React from "react";
import styled from "styled-components";
import { OpportunityCard } from "./opportunityCard";
import { opportunitiesActions } from "../store/opportunitiesSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

const StyledList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledListItem = styled.li``;

// Make any changes to the opportunity anchor element here
const StyledOpportunityCard = styled(OpportunityCard)``;

export const OpportunitiesList: React.FC = () => {
  const dispatch = useAppDispatch();
  const opportunities = useAppSelector((state) => state.opportunities);

  React.useEffect(() => {
    dispatch(opportunitiesActions.fetchOpportunities());
  }, [dispatch]);

  return (
    <StyledList>
      {opportunities.list.map((opportunity) => (
        <StyledListItem key={opportunities.items[opportunity].id}>
          <StyledOpportunityCard
            opportunity={opportunities.items[opportunity]}
          />
        </StyledListItem>
      ))}
    </StyledList>
  );
};
