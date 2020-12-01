import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import AppNavBar from "./components/AppNavBar";
import Footer from "./components/Footer";
import EditPage from "./components/EditPage"

import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  state = { searchQuery: "" };
  searchHandler = (e) => {
    e.preventDefault();
    this.setState({ query: e.target.value });
  };
  render() {
    return (
      <Router>
        <AppNavBar
          query={this.state.query}
          searchHandler={this.searchHandler}
        />
        <Route
          path={"/"}
          exact
          render={(props) => <Home title="Homepage" {...props} />}
        />
        {/* <Route
        path={"/in/:name"}
        exact
        render={(props) => <Profile {...props} />}
      /> */}
        <EditPage />
        <Footer />
      </Router>
    );
  }
}

export default App;
