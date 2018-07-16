import React from 'react';
import _ from 'lodash';

//Component Imports
import Panel from './Panel';
import PanelContact from './PanelContact';
import PanelLink from './PanelLink';
import PanelText from './PanelText';
import PanelTitle from './PanelTitle';
import ScrollButton from './ScrollButton';

export default class HomePage extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    assets: [],
    panelIndex: 0,
  };
  componentDidMount() {
    fetch('http://lws.impactpreview.com/wp-json/wp/v2/pages/120')
      .then(res => res.json())
      .then(
        result => {
          console.log(result.acf['home_panel_repeater']);
          this.setState({
            isLoaded: true,
            assets: result.acf['home_panel_repeater']
          });
        },
        error => {
          console.log(error);
        }
      );
  }
  handleChangePanels = () => {
    if (this.state.panelIndex < this.state.assets.length - 1) {
      this.setState(() => ({
        panelIndex: this.state.panelIndex + 1
      }));
    } else {
      this.setState(() => ({
        panelIndex: 0
      }));
    }
  };
  render() {
    const assets = this.state.assets;
    const panelIndex = this.state.panelIndex;
    const panels = assets.map((asset, i) => (
      <Panel
        className={
          panelIndex == i
            ? 'panel active'
            : 'panel inactive'
        }
        key={i + 1}
        style={{ backgroundImage: `url(${asset.panel_image})` }}
      >
        <PanelTitle 
          panelTitle={asset.panel_title}
          colSpan={4}
        />
        <PanelText 
          panelText={asset.panel_text}
          colSpan={4} 
        />
        {/* if panel has link to another page */}
        {asset.link_out.button_text && (
          <PanelLink
            linkTo={asset.link_out.button_to}
            linkText={asset.link_out.button_text}
          />
        )}
        {i === 5 && (
          <PanelContact />
        )}
      </Panel>
    ));
    return (
      <div className="page" onWheel={_.debounce(this.handleChangePanels, 100)}>
        {panels}
        <ScrollButton handleChangePanels={this.handleChangePanels} />
      </div>
    );
  }
}