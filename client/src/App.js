import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Login from './component/login';
import Home from "./component/home";
import Userregister from './component/userregister';
import { Provider } from "react-redux";
import store from "./store/store.js";
const Routing = () => {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      history.push("/");
    }
    else {
      history.push("/login");
    }
  }, []);

  return (
    <React.Fragment>
      
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/userregister">
            <Userregister />
          </Route>
        </Switch>
    </React.Fragment>
  )
}


function App() {
  return (
    <React.Fragment>
      <Provider store={store}>
        <BrowserRouter>
          <Routing/>
        </BrowserRouter>
      </Provider>
    </React.Fragment>
  );
}

export default App;
