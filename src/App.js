import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import AppNavBar from "./components/AppNavBar";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <Router>
      <AppNavBar />
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
    </Router>
  );
}

export default App;
