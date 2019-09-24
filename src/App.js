import React from "react";
import WeatherWidget from "./components/WeatherWidget/WeatherWidget";
import ErrorBoundary from "./ErrorBoundary";
import styled from "styled-components";

const StyledWrapper = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 0 auto;
`;

const App = () => {
  return (
    <StyledWrapper>
      <h1>Weather Widget</h1>
      <ErrorBoundary>
        <WeatherWidget />
      </ErrorBoundary>
    </StyledWrapper>
  );
};

export default App;
