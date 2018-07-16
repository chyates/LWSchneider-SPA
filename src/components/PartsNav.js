import React, { Component } from 'react';

export default class PartsNav extends Component {
  state = {
    
  }
  render() {
    return (
      <div className="row no-gutters justify-content-center">
        <div className="col-4">
          <div className="row no-gutters justify-content-between">
            <button className="button--parts active">
              Handguns
            </button>
            <button className="button--parts">
              Modern Sporting Rifles
            </button>
          </div>
        </div>
      </div>
    )
  }
};
