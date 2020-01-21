import React from "react";
import { Container } from "react-bootstrap";
import styled from "styled-components";

import Router from "../Routes";

const AppContent = styled(Container)``;

const App: React.FC = () => (
  <AppContent>
    <Router />
  </AppContent>
);

export default App;
