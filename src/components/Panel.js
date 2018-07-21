import React from 'react';

//Component Imports
import PanelTitle from './PanelTitle';
import PanelText from './PanelText';
import PanelContact from './PanelContact';
import CapabilitesPageListings from './CapabiltiesPageListings';

export default class Panel extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div 
        className={this.props.className}
        style={this.props.style}
      >
        <div className="row no-gutters justify-content-center w-100 align-items-center">
          <div className="page-content col-12 justify-content-center">
            {this.props.children} 
          </div>
        </div>
      </div>
    );
  }
}