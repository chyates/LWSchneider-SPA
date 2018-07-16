import React, { Component } from 'react';

export default class CapabilitiesPageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      activeIndex: 0,
      startItem: 1,
      position: 0,
      itemCount: this.props.galleryImages.length
    };
    this.handleSwap = this.handleSwap.bind(this);
  }
  handleSwap() {
    const { activeIndex, startItem } = this.state;
    this.setState({
      activeIndex: activeIndex + 1,
      startItem: startItem + 1
    });
  };
  render() {
    const { activeIndex, itemCount, startItem } = this.state;
    const images = this.props.galleryImages;
    const slides = images.map((image, i) => {
      return (
        <div 
          className={
            (i === activeIndex) ? 
            "items front" : 
            (i === itemCount - startItem) ? 
            "items left" : 
            (i === activeIndex + 1) ? 
            "items right" : 
            "items back"
          }
          key={i}
          onTouchEnd={this.handleSwap}
        >
          <img src={image.gallery_image} alt="" />
        </div>
      );
    })
    return (
      <div 
        className="row no-gutters justify-content-center"
      >
        <div className="col-12">
          <div id="capPageCarousel" className="row no-gutters justify-content-center">
            {slides}
          </div>
          <div className="row no-gutters justify-content-center">
            <button onClick={this.handleSwap}>Prev</button>
            <button onClick={this.handleSwap}>Next</button>
          </div>
        </div>
      </div>
    )
  }
};