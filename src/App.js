import React from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import { firebaseConfig } from "./firebaseconfig";
import Landing from './pages/Landing';
import Contact from "./pages/Contact";

import * as firebase from "firebase/app";

function App() {
  firebase.initializeApp(firebaseConfig)
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/'>
            <Landing />
          </Route>
          <Route path='/contact'>
            <Contact />
          </Route>
        </Switch>
      </div>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
