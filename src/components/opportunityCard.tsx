import * as React from "react";
import styled from "styled-components";
import { MinimalOpportunityModel } from "../types";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)`
  color: rgb(41, 56, 60);
  text-decoration: none;
`;

const StyledArticle = styled.article`
  background-color: rgb(244, 244, 244);
  border-radius: 20px;
  overflow: hidden;
  width: 100%;
`;

const StyledHeader = styled.header<{ backgroundImage?: string }>`
  align-items: center;
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 150px;
  padding: 10px 0;
  width: 100%;
`;

const StyledHeading = styled.h2`
  color: rgb(255, 255, 255);
  text-align: center;
  text-shadow: 0px 0px 20px black;
`;

const StyledLogo = styled.img`
  border: 2px solid rgb(244, 244, 244);
  border-radius: 6px;
  bottom: -20px;
  flex-shrink: 0;
  height: 100px;
  left: 20px;
  overflow: hidden;
  width: 100px;
`;

const StyledBody = styled.div`
  flex-grow: 1;
  padding: 40px 20px 20px 20px;
  line-height: 1.3em;
`;

export interface OpportunityProps {
  opportunity: MinimalOpportunityModel;
  className?: string;
}

export const OpportunityCard: React.FC<OpportunityProps> = ({
  opportunity,
  className,
}) => (
  <StyledLink to={`/opportunity/${opportunity.id}`} className={className}>
    <StyledArticle>
      <StyledHeader
        backgroundImage={
          opportunity.images.find((img) => img.type === "coverImage")?.src
        }
      >
        <StyledLogo
          src={opportunity.images.find((img) => img.type === "logo")?.src}
        />
        <StyledHeading>{opportunity.name}</StyledHeading>
      </StyledHeader>

      <StyledBody>
        {opportunity.investment.percentage}% funded
        <br />
        Most recent: {opportunity.most_recent_investment}
        <br />
        {opportunity.description}
      </StyledBody>
    </StyledArticle>
  </StyledLink>
);
