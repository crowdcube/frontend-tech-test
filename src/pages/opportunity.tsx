import { useLocation } from "react-router";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { opportunitiesActions } from "../store/opportunitiesSlice";

export const OpportunityPage: React.FC = () => {
  const location = useLocation();
  const id = location.pathname.replace("/opportunity/", "");
  const dispatch = useAppDispatch();
  const opportunity = useAppSelector((state) => state.opportunities.items[id]);

  React.useEffect(() => {
    dispatch(opportunitiesActions.fetchOpportunity(id));
  }, [id, dispatch]);

  console.log(location);
  if (!opportunity) {
    return null;
  }
  return (
    <>
      <h1>{opportunity.name}</h1>
      <p>{opportunity.description}</p>
      {"blocks" in opportunity ? (
        <>
          {opportunity.blocks.map((block) => (
            <div key={block.title}>
              <h2>{block.title}</h2>
              <p>{block.content}</p>
            </div>
          ))}
        </>
      ) : null}
    </>
  );
};
