import React from 'react';
import { useLocation } from 'react-router-dom';
function PlaceHolder (props) {

  let show =
    <div id="page-wrap">
      <pre> {JSON.stringify(useLocation().state, null, 4)} </pre>
      <pre> {JSON.stringify(props, null,4)}</pre>

    </div>;
  return show;
  }
export default PlaceHolder;
