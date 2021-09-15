import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import Trainings from "./components/Trainings";

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await axios.get("http://localhost:8000/api/users");

    setUsers(res.data.data);
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => (
              <Login {...props} users={users} user={user} setUser={setUser} />
            )}
          />
          <Route
            path="/trainings"
            exact
            render={(props) => (
              <Trainings
                {...props}
                users={users}
                user={user}
                setUser={setUser}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
