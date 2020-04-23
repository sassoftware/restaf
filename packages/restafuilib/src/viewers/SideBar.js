import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Header from '../helpers/Header.js';

import '../css/styles.css';

function SideBar (props) {
  let { menu, title, ...others } = props;
  debugger;
  let switches = menu.map((m) => {
    let s;

		if (m.path === '/') {
			s = <Route exact path={m.path} key={m.text} render={(props) => <m.Component {...others}  />} />;
    } else {
      let path = m.path + '/:name';
      s = <Route path={path} key={m.text} render={(match) => <m.Component  {...others} mathc={match} />} />;
		}
		return s;
	});
  switches.push(<Redirect key="redirect" {...others} to="/" />);
	return (
		<Router>
			<div id="App" className="sm-navy w-100 h-100">
        <Header menu={menu} title={title} {...others} ></Header>
				<Switch>{switches}</Switch>
			</div>
		</Router>
	);
}
export default SideBar;
