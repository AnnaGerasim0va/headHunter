import React, { Component } from "react";
import ListVacancies from "./Components/ListVacancies";
import { Router, Route } from "react-router-dom";
import VacancyDescription from "./Components/VacancyDescription"
import createBrowserHistory from "history/createBrowserHistory";


const HISTORY = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <>
        <Router history={HISTORY}>
          <Route exact path="/" component={ListVacancies} />
          <Route path="/vacancies/:id" component={VacancyDescription} />
        </Router>
      </>
    );
  }
}

export default App;
