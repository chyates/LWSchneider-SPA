import React, { Component } from 'react';

//Component Imports
import Panel from './Panel';
import PanelTitle from './PanelTitle';
import PanelText from './PanelText';
import PanelContact from './PanelContact';

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
          console.log(result)
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
    console.log(this.state.panelText);
    return (
      <div className="page">
        <Panel
          className="panel"
          style={{ backgroundImage: `url(${this.state.panelImage})` }}
        >
          <PanelTitle 
            panelTitle={this.state.panelTitle}
          />
          <PanelText
            panelText={this.state.panelText}
          />
          <PanelContact />
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
