import React from 'react';
import windstop from '../reducers/windstop';
import { connect } from 'react-redux';


class WindStop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: '91.69vh',
      rotate: 0,
      rotating: false,  
    };
    
  }
  componentWillReceiveProps(props) {
    this.setState(props.windstop);
  }

  render() {
    const styles = {
      transition: 'all 1.25s ease',
      height: this.state.height,
      transform: 'rotate(' + this.state.rotate + 'deg)'
    };
    return (
      <div id="windStop">
        <img
          className={this.state.rotating ? 'rotating' : ''}
          style={{ ...styles}}
          src={this.props.imageUrl} 
          alt="turny-thing"
        />
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  windstop: state.windstop
});
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(WindStop);