import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

import Header from '../helpers/Header.js';


import "../css/styles.css";

function SideBar (props) {

   let {menu, store} = props;

   
  let switches = menu.map(m => {
    let s;
    if (m.path === '/') {
      s = <Route exact path={m.path} component={m.component} />;
    } else {
      s = <Route path={m.path}
        render={(props) => <m.component {...props} store={store} model={m.model} />}
      />;
    }
    return s;
  });
   switches.push(<Redirect to="/" />);
   console.log(switches);
   
    return (
      <Router>
        <div id="App" className="sm-navy w-100 h-100">
            <Header menu={menu} title="Viya At Work"></Header>
            <Switch>
             {switches}
            </Switch>
          </div>
      </Router>
    );
  }
export default SideBar;

