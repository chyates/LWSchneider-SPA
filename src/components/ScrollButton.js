import React from 'react';

const ScrollButton = props => (
  <div>
    <button className="scroll-button" onClick={props.handleChangePanels} >
      <img src="/images/scroll-arrow.svg" alt="" />
    </button>
  </div>
);

export default ScrollButton;
