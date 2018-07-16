import React from 'react';
import { Link } from 'react-router-dom';

const PanelLink = (props) => {
  return (
    <div className="row no-gutters justify-content-center">
      <button className="button--link">
        <Link to={props.linkTo}>{props.linkText}</Link>
      </button>
    </div>
  );
};

export default PanelLink;
