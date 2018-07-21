import React from 'react';

const ScrollButton = props => (
  <div
    className="scroll-button row no-gutters justify-content-center flex-column"
    onClick={props.handleRotateWindstop
      ? (e) => (props.handleChangePanels(e), props.handleRotateWindstop(e))
      : props.handleChangePanels
    }
  >
      <div className="scroll-text mb-2">
        {props.buttonText && props.buttonText}
      </div>
      <img
        src="https://lws.impactpreview.com/wp-content/uploads/2018/06/scroll-arrow.svg"
        alt="arrow-down"
      />
  </div>
);

export default ScrollButton;
