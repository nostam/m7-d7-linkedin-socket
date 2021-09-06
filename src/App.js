import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import AppNavBar from "./components/AppNavBar";
import Footer from "./pages/Footer";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Welcome from "./pages/Welcome";
import Message from "./pages/Message";
// import PostModal from "./components/PostModal";
import "bootstrap/dist/css/bootstrap.min.css";

class App extends React.Component {
  state = {
    searchQuery: "",
    me: {},
  };
  searchHandler = (e) => {
    e.preventDefault();
    this.setState({ query: e.target.value });
  };
  getUser = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/profiles/me`, {
        headers: {
          Authorization: "Basic " + localStorage.getItem("token"),
        },
      });
      const user = await res.json();
      // console.log("login user", user);
      this.setState({ me: user });
      localStorage.setItem("id", user._id);
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.getUser();
  }
  render() {
    return (
      <Router>
        <Route
          path={["/user/:id", "/home", "/message"]}
          render={() => (
            <AppNavBar
              query={this.state.query}
              me={this.state.me}
              searchHandler={this.searchHandler}
            />
          )}
        />
        <Switch>
          <Route
            path={"/home"}
            exact
            render={(props) => (
              <Home title="Homepage" {...props} me={this.state.me} />
            )}
          />
          <Route
            path={"/message"}
            render={() => <Message me={this.state.me} />}
          />
          <Route
            path={"/user/:id"}
            exact
            render={(props) => (
              <Profile
                {...props}
                query={this.state.searchQuery}
                searchHandler={this.searchHandler}
              />
            )}
          />
        </Switch>
        <Route path={"/"} exact render={() => <Welcome />} />
        <Route path={"/login"} render={() => <Login />} />
        <Route path={"/signup"} render={() => <SignUp />} />
        <Route path={["/user/:id", "/home", "/message"]} component={Footer} />
      </Router>
    );
  }
}

export default App;
