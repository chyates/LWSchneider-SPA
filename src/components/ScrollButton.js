import React from 'react';

const ScrollButton = props => (
  <div>
    <button className="scroll-button" onClick={props.handleChangePanels}>
      <img
        src="https://lws.impactpreview.com/wp-content/uploads/2018/06/scroll-arrow.svg"
        alt="arrow-down"
      />
    </button>
  </div>
);

export default ScrollButton;
