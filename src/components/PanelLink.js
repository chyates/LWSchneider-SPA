import React from 'react';
import { Link } from 'react-router-dom';

const PanelLink = (props) => {
  return (
    <div className="row no-gutters justify-content-center">
        <Link to={props.linkTo}>
          <button className="button--link">
            {props.linkText}
          </button>
        </Link>
    </div>
  );
};

export default PanelLink;
