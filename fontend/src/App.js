import React from "react";
import {Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Company from "./components/companies";
import CompaniesList from "./components/companies-list";

function App() {
  return (
    <div>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      
      <div className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to={"/companies"} className="nav-link">
            Companies
          </Link>
        </li>
        
      </div>
    </nav>

    <div className="container mt-3">
      <Switch>
        <Route exact path={["/", "/companies"]} component={CompaniesList} />
        <Route 
          path="/companies/:id"
          render={(props) => (
            <Company {...props}  />
          )}
        />
      </Switch>
    </div>
  </div>
  );
}

export default App;
