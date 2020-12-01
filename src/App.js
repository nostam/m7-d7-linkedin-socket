import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import AppNavBar from "./components/AppNavBar";
import Footer from "./components/Footer";
import Profile from "./components/ProfileBody";
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
        {/* <Route
          path={"/home"}
          exact
          render={(props) => <Home title="Homepage" {...props} />}
        /> */}
        <Route path={"/"} exact render={(props) => <Profile {...props} />} />

        <Footer />
      </Router>
    );
  }
}

export default App;