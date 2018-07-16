import React, { Component } from 'react';

//Component Imports
import FounderImage from './FounderImage';
import Panel from './Panel';
import PanelTitle from './PanelTitle';
import PanelText from './PanelText';

export default class AboutPage extends Component {
  state = {
    assets: [],
    panelIndex: 0
  }
  componentDidMount() {
    fetch('http://lws.impactpreview.com/wp-json/wp/v2/pages/174')
      .then(res => res.json())
      .then(
        result => {
          console.log(result)
          const baseResult = result.acf['about_panels_group']
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
    const panelIndex = this.state.panelIndex;
    const panels = assets.map((asset, i) => (
      <Panel
        className={
          panelIndex == i
            ? 'panel active'
            : 'panel inactive'
        }
        key={i + 1}
      >
        {/* Home Panel - Broken out for layout purposes */}
        {i == 0 && (
          <div>
            <FounderImage imgSrc={asset.panel_image} />
            <PanelTitle 
              panelTitle={asset.panel_title}
              colSpan={5} 
            />
            <PanelText panelText={asset.panel_text} />
          </div>
        )}
        {/* Panel 2 - Broken out for layout purposes */}
        {i === 1 && (
          <div>
            <PanelTitle
              panelTitle={asset.panel_title}
              colSpan={4}
            />
            <div className="row no-gutters justify-content-center">
              <img id="familyImage" src={asset.panel_image} alt="image"/>
            </div>
            <div className="row no-gutters justify-content-center">
              <ul>
                <div className="col-6">
                  {asset.panel_bullets.map((item, i) => (
                    <li key={item.list_items}>{item.list_items}</li>
                  ))}
                </div>
              </ul>
            </div>
          </div>
        )}
        {/* Panel 3 - Broken out for layout purposes */}
        {i === 2 && <PanelTitle panelTitle={asset.panel_title} />}
        {i === 2 && <PanelText panelText={asset.panel_text} />}
      </Panel>
    ));
    return (
      <div className="page">
        {panels}
        <button className="scroll-button" onClick={this.handleChangePanels}>
          <img src="/images/scroll-arrow.svg" alt="" />
        </button>
      </div>
    )
  }
};

