import * as React from "react";
import styled, { css } from "styled-components";
import { createGlobalStyle } from "styled-components";
import { HomePage } from "./pages/home";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { OpportunitiesPage } from "./pages/opportunities";
import { OpportunityPage } from "./pages/opportunity";

const APP_WIDTH = "1200px";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family:  Arial, Helvetica, sans-serif
  }
  body {
    margin: 0;
  }
`;

const centeredContainer = css`
  margin: 0 auto;
  max-width: ${APP_WIDTH};
  padding-left: 20px;
  padding-right: 20px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const StyledHeader = styled.header`
  align-items: center;
  justify-content: flex-start;
  background-color: rgb(136, 216, 205);
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.1);
  color: rgb(41, 56, 60);
  display: flex;
  margin-bottom: 20px;
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
`;

const StyledHeaderContent = styled.div`
  ${centeredContainer}
  font-size: 3em;
  padding-bottom: 20px;
  padding-top: 20px;
  width: 100%;
`;

const StyledFooter = styled.footer`
  background-color: rgb(244, 244, 244);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin-top: 20px;
  padding-bottom: 20px;
  padding-top: 20px;
  width: 100%;
`;

const StyledFooterContent = styled.div`
  ${centeredContainer}
`;

const StyledMain = styled.main`
  ${centeredContainer}
  flex-grow: 1;
  width: 100%;
`;

export const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <StyledContainer>
        <StyledHeader>
          <StyledHeaderContent>Crowdcube Tech Test</StyledHeaderContent>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/opportunities">Opportunities</Link>
              </li>
              {/* <li>
                <Link to="/my-account">My account</Link>
              </li> */}
            </ul>
          </nav>
        </StyledHeader>
        <StyledMain>
          <Switch>
            <Route path="/" exact>
              <HomePage />
            </Route>

            <Route path="/opportunities" exact>
              <OpportunitiesPage />
            </Route>

            <Route path="/opportunity/:id" exact>
              <OpportunityPage />
            </Route>
          </Switch>
        </StyledMain>
        <StyledFooter>
          <StyledFooterContent>
            (c) Crowdcube {new Date().getFullYear()}
          </StyledFooterContent>
        </StyledFooter>
      </StyledContainer>
    </Router>
  );
};
