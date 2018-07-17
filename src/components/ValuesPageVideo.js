import React from 'react'

const ValuesPageVideo = (props) => {
  return (
    <div className="row no-gutters justify-content-center">
      <div className="col-9">
        <div className="embed-responsive embed-responsive-21by9">
          <video className="embed-responsive-item" src={props.videoSrc} controls></video>
        </div>
      </div>  
    </div>
  )
}

export default ValuesPageVideo;
