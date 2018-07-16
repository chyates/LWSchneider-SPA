import React, { Component } from 'react';

//Component Imports
import Panel from './Panel';
import PanelTitle from './PanelTitle';
import PanelText from './PanelText';
import ScrollButton from './ScrollButton';
import ValuesPageHero from './ValuesPageHero';

export default class componentName extends Component {
  state = {
    assets: [],
    panelIndex: 0
  }
  componentDidMount() {
    fetch('http://lws.impactpreview.com/wp-json/wp/v2/pages/165')
      .then(res => res.json())
      .then(
        result => {
          console.log(result)
          const baseResult = result.acf['values_panels_group']
          this.setState({
            assets: Object.values(baseResult)
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
    console.log(assets);
    const panelIndex = this.state.panelIndex;
    const panels = assets.map((asset, i) => (
      <Panel
        className={panelIndex == i ? 'panel active' : 'panel inactive'}
        key={i + 1}
      >
        {i === 0 && (
          <div>
            <ValuesPageHero imageSrc={asset.panel_image} />
            <PanelTitle panelTitle={asset.panel_title} />
            <PanelText panelText={asset.panel_text} />
          </div>
        )}
        {i === 1 && (
          <div>
            <PanelTitle panelTitle={asset.panel_title} />
            <ValuesPageHero imageSrc={asset.panel_video} />
          </div>
        )}
        {i === 2 && (
          <div>
            <ValuesPageHero imageSrc={asset.panel_image} />
            <PanelTitle panelTitle={asset.panel_title} />
            <PanelText panelText={asset.panel_text} />
          </div>
        )}
        {i === 3 && (
          <ValuesPageHero imageSrc={asset.panel_image} />
        )}
      </Panel>
    ));
    return (
      <div className="page">
        {panels}
        <ScrollButton handleChangePanels={this.handleChangePanels} />
      </div>
    )
  }
}
