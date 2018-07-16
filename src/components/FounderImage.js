import React from 'react'

const FounderImage = (props) => (
  <div className="row no-gutters justify-content-center">
    <img
      id="founderImage"
      src={props.imgSrc}
      alt="LW Schneider"
    />
  </div>
)

export default FounderImage;
