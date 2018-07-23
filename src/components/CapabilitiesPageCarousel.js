import React, { Component } from 'react';

export default class CapabilitiesPageCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      frontItem: 0,
      startItem: 1,
      position: 0,
      rightItem: 1,
      leftItem: this.props.galleryImages.length - 1,
      itemCount: this.props.galleryImages.length,
      touchX: null
    };
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
    this.handleSwapLeft = this.handleSwapLeft.bind(this);
    this.handleSwapRight = this.handleSwapRight.bind(this);
  }
  handleTouchStart(e) {
    e.stopPropagation()
    this.setState({
      touchX: e.changedTouches[0].clientX
    })
  }
  handleTouchEnd(e) {
    e.stopPropagation()
    if (this.state.touchX) {
      if (this.state.touchX - e.changedTouches[0].clientX > 0) {
        this.handleSwapLeft()
      } else if (this.state.touchX - e.changedTouches[0].clientX < 0) {
        this.handleSwapRight()
      }
      this.setState({touchX: null})
    }
  }
  handleSwapLeft() {
    let { leftItem, frontItem, rightItem, itemCount } = this.state;
    this.setState({
      rightItem: (rightItem < itemCount - 1) ? rightItem + 1 : 0,
      frontItem: (frontItem < itemCount - 1) ? frontItem + 1 : 0,
      leftItem: (leftItem < itemCount - 1) ? leftItem + 1 : 0
    });
  }
  handleSwapRight() {
    let { leftItem, frontItem, rightItem, itemCount } = this.state;
    this.setState({
      rightItem: (rightItem > 0) ? rightItem - 1 : itemCount - 1,
      frontItem: (frontItem > 0) ? frontItem - 1 : itemCount - 1,
      leftItem: (leftItem > 0) ? leftItem - 1 : itemCount - 1
    });
  }
  render() {
    const { leftItem, frontItem, rightItem } = this.state;
    const images = this.props.galleryImages;
    const slides = images.map((image, i) => {
      return (
        <div
          className={
            i === frontItem
              ? 'col-8 col-lg-5 items front'
              : i === leftItem
                ? 'col-8 col-lg-5 items left'
                : i === rightItem
                  ? 'col-8 col-lg-5 items right'
                  : 'col-8 col-lg-5 items back'
          }
          key={i}
          id={i}
          onTouchEnd={
            i === frontItem || i === rightItem
              ? this.handleSwapLeft
              : i === leftItem
                ? this.handleSwapRight
                : function(){}
          }
          onClick={
            i === frontItem || i === rightItem
              ? this.handleSwapLeft
              : i === leftItem
                ? this.handleSwapRight
                : function(){}
          }
        >
          <img className="parts-gallery-image" src={image.gallery_image} alt="" />
        </div>
      );
    });
    // console.log(this.state.itemCount)
    return (
      <div className="row no-gutters justify-content-center">
        <div className="col-10">
          <div
            className="click-shield d-lg-none"
            onTouchStart={this.handleTouchStart}
            onTouchEnd={this.handleTouchEnd}
          ></div>
          <div
            id="capPageCarousel"
            className="row no-gutters justify-content-center"
          >
            {slides}
          </div>
        </div>
      </div>
    );
  }
}
