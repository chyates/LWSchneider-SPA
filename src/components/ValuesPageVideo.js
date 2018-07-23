import React from 'react'

const ValuesPageVideo = (props) => {
  return (
    <div className="row no-gutters justify-content-center">
      <div className="col-sm-12 col-md-10 col-lg-9">
        <div className="embed-responsive embed-responsive-21by9">
          <video
            className="embed-responsive-item value-vid"
            poster="https://lwschneider.com/wp-content/themes/lws-theme/assets/img/VideoPreview.png"
            src={props.videoSrc}
            controls
          ></video>
        </div>
      </div>  
    </div>
  )
}

export default ValuesPageVideo;
