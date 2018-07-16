import React from 'react';

const ScrollButton = props => (
  <button className="scroll-button" onClick={props.handleChangePanels} >
    <img src="/images/scroll-arrow.svg" alt="" />
  </button>
);

export default ScrollButton;
