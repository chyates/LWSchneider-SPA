import React, { Component } from 'react';

export default class CapabilitiesPageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      frontItem: 0,
      startItem: 1,
      position: 0,
      rightItem: 1,
      leftItem: this.props.galleryImages.length -1,
      itemCount: this.props.galleryImages.length
    };
    this.handleSwap = this.handleSwap.bind(this);
  }
  handleSwap() {
    let { leftItem, frontItem, rightItem, itemCount } = this.state;
    console.log("LEFT:", leftItem, " FRONT:", frontItem, " RIGHT:", rightItem);
    this.setState({
      rightItem: rightItem +1,
      frontItem: frontItem + 1,
      leftItem: leftItem + 1
    });
    if(rightItem == itemCount - 1 ){
      this.setState({rightItem: 0});
    };
    if(frontItem == itemCount - 1){
      this.setState({frontItem: 0});
    };
    if(leftItem == itemCount - 1){
      this.setState({leftItem: 0});
    };
  };
  render() {
    const { leftItem, frontItem, rightItem } = this.state;
    const images = this.props.galleryImages;
    const slides = images.map((image, i) => {
      return (
        <div 
          className={
            (i === frontItem) ? 
            "items front" : 
            (i === leftItem) ? 
            "items left" : 
            (i === rightItem) ? 
            "items right" : 
            "items back"
          }
          key={i}
          onTouchEnd={this.handleSwap}
          onClick={this.handleSwap}
        >
          <img src={image.gallery_image} alt="" />
        </div>
      );
    });
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