import React from 'react';
import wpAPI from '../data/api';
import { NavLink } from 'react-router-dom';

import Navigation from './Navigation';
import WindStop from './WindStop';
import HomePage from './HomePage'

export default class MainPage extends React.Component {
  state = {
    error: null,
    logo: null,
    windStop: null
  };
  componentDidMount() {
    fetch('http://lws.impactpreview.com/wp-json/wp/v2/media/81')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            logo: result.source_url
          });
        },
        error => {
          console.log(error);
        }
      );
    fetch('http://lws.impactpreview.com/wp-json/wp/v2/media/86')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            windStop: result.source_url
          })
        },
        error => {
          console.log(error)
        }
      );
  }
  render() {
    const logo = <img src={this.state.logo} alt="" />;
    const windStop = this.state.windStop;
    return (
      <div className="container-fluid">
        <div id="logo" >
          <NavLink to="/">
            {logo}
          </NavLink>
        </div>
        <WindStop imageUrl = {windStop} />
        <Navigation />
        {/* <HomePage /> */}
      </div>
    );
  }
}
