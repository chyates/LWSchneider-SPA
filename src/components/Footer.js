import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { scaleWindstop } from '../actions/windstop';

const Footer = () => (
  <div id="footer" className="row no-gutters justify-content-center">
    <div className="col-11">
      <div className="row no-gutters">
        <div className="col-6">
          <div className="row no-gutters">
            <div className="col-4">
              <div className="row no-gutters">
                1180 North Sixth Street
              </div>
              <div className="row no-gutters">
                Princeton, IL 61356
              </div>
            </div>
            <div className="col-auto"> 
              815-875-3835
            </div>
            <div className="col-auto">
              
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="row no-gutters justify-content-end">
            <NavLink
              id="careersLink"
              to={{
                pathname: "/careers"
              }}
              activeClassName="is-active"
              className="text-right"
            >
              CAREERS
            </NavLink>
          </div>
          <div className="row no-gutters justify-content-end">
            <p className="text-right">
              &copy; 2018 L.W. Schneider. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  windstop: state.windstop
});

export default connect(mapStateToProps)(Footer);
