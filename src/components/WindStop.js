import React from 'react';

const styles = {
  transition: 'all 1.25s ease',
  
};

export default class WindStop extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scale: 1,
      rotate: 0,
      rotating: false
    }
    this.onScale = this.onScale.bind(this);
    this.onRotateOnce = this.onRotateOnce.bind(this);
    this.onContinuousRotate = this.onContinuousRotate.bind(this);
  }
  onRotateOnce() {
    this.setState({
      rotate: this.state.rotate + 15
    });
  };
  onScale()  {
    this.setState({
      scale: this.state.scale > 1 ? 1 : 2,
      // rotating: !this.state.rotating
    });
  };
  onContinuousRotate() {
    this.setState({
      rotating: !this.state.rotating
    });
  };
  render() {
    return (
      <div id="windStop">
        <img
          className={this.state.rotating ? 'rotating' : ''}
          style={{ ...styles, transform: 'scale(' + this.state.scale + ') rotate(' + this.state.rotate + 'deg)' }}
          src={this.props.imageUrl} 
          alt=""
        />
      </div>
    )
  }
};
