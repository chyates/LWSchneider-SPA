import React, { Component } from 'react';
import Panel from './Panel';

export default class ContactPage extends Component {
  state = {
    panelTitle: '',
    panelText: '',
    panelImage: ''
  }
  componentDidMount() {
    fetch('http://lws.impactpreview.com/wp-json/wp/v2/pages/167')
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            panelTitle: result.acf.panel_title,
            panelText: result.acf.panel_text,
            panelImage: result.acf.panel_image
          })
        },
        error => {
          console.log(error);
        }
      );
  }
  render() {
    return (
      <div className="page">
        <Panel
          className="panel"
          style={{ backgroundImage: `url(${this.state.panelImage})` }}
          panelTitle={this.state.panelTitle}
          panelText={this.state.panelText}
          panelContact={true}
        >
        <div className="row no-gutters justify-content-center">
          <p>Want to join our proud team of collaborators?</p>
        </div>
        <div className="row no-gutters justify-content-center">
          <a href="#">See open positions</a>
        </div>
        </Panel>
      </div>
    )
  }
}
