import React from 'react';
// import {AppContext} from '../providers';
import "../css/styles.css";

function PlaceHolder (props) {
  // static contextType = AppContext;
    ;
    let model = props.match.path;
    return (
      <div id="page-wrap">
        <p> PlaceHolder for {model}</p>
      </div>
    );
  }
export default PlaceHolder;
