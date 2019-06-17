import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";

import apolloClient from "./services/apollo";

import Header from "./components/Header";
import Routes from "./routes";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Header />
        <Routes />
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
