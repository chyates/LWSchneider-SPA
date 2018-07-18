import React, { Component } from 'react'

export default class HomePageCarousel extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const images = this.props.images;
    console.log(images);
    const slideShow = images.map((image, i) => (
      <div 
        className="slide-show-img-container"
        style={{backgroundImage: `url(${image.image})`}}
      >
        {/* <img className="home-slider-image" src={image.image} alt="slide-image"/> */}
      </div>
    ))
    return (
      <div className="row no-gutters justify-content-center">
        <div className="slideshow">
          <div className="slideshow-row">
            {slideShow}
          </div>
        </div>
      </div>
    )
  }
}
