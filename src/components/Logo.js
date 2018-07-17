import React from 'react';
import { Link } from 'react-router-dom';

const Logo = props => (
  <div>
    <Link to="/">
      <img id="logo" src={props.imageUrl} alt="logo" />
    </Link>
  </div>
);
export default Logo;
