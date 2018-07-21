import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { scaleWindstop } from '../actions/windstop';

//Component Imports
import CapabilitiesPageCarousel from './CapabilitiesPageCarousel';
import CapabilitesPageListings from './CapabiltiesPageListings';
import Panel from './Panel';
import PanelTitle from './PanelTitle';
import PanelText from './PanelText';
import HandgunPartsPanel from './HandgunPartsPanel';
import RiflePartsPanel from './RiflePartsPanel';
import ScrollButton from './ScrollButton';

class CapabilitiesPage extends React.Component {
  state = {
    assets: [],
    panelIndex: 0,
    activePartsPanel: 0,
    activeButton: 0
  };
  componentDidMount() {
    fetch('https://lws.impactpreview.com/wp-json/wp/v2/pages/133')
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
          const baseResult = result.acf['capabilities_panel_group'];
          this.setState({
            assets: Object.values(baseResult)
          });
        },
        error => {
          console.log(error);
        }
      );
    this.props.dispatch(scaleWindstop());
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
  handleChangePartsPanels = () => {
    this.state.activePartsPanel === 0
      ? this.setState({
          activePartsPanel: 1,
          activeButton: 1
        })
      : this.setState({
          activePartsPanel: 0,
          activeButton: 0
        });
  };
  render() {
    const assets = this.state.assets;
    const panelIndex = this.state.panelIndex;
    const panels = assets.map((asset, i) => (
      <Panel
        className={panelIndex == i ? 'panel active' : 'panel inactive'}
        key={i + 1}
      >
        {/* Home Panel */}
        {i === 0 && (
          <div className="content-wrapper">
            <PanelTitle panelTitle={asset.panel_title} />
            <PanelText panelText={asset.panel_text} />
          </div>
        )}
        {/* Parts Panel */}
        {i === 1 && (
          <div className="content-wrapper">
            <PanelTitle panelTitle={asset.panel_title} colSpan={6} />
            <div className="row no-gutters justify-content-center">
              <p className="explore-text d-none d-lg-block">Click Below to Explore</p>
            </div>
            <div className="row no-gutters justify-content-center">
              <div className="col-lg-6">
                <div className="row no-gutters justify-content-between">
                  <div className="col-lg-auto col-6">
                    <button
                      className={
                        this.state.activeButton === 0
                          ? 'button--parts active'
                          : 'button--parts'
                      }
                      onClick={this.handleChangePartsPanels}
                    >
                      Handguns
                    </button>
                  </div>
                  <div className="col-lg-auto col-6">
                    <button
                      className={
                        this.state.activeButton === 1
                          ? 'button--parts active'
                          : 'button--parts'
                      }
                      onClick={this.handleChangePartsPanels}
                    >
                      Modern Sporting Rifles
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {this.state.activePartsPanel === 0 ? (
              <HandgunPartsPanel handgunsGroup={asset.handguns_group} />
            ) : (
              <RiflePartsPanel
                sportingRiflesGroup={asset.sporting_rifles_group}
              />
            )}
          </div>
        )}
        {/* For Gallery Panel */}
        {i === 2 && (
          <div className="content-wrapper">
            <PanelTitle panelTitle={asset.panel_title} />
            <CapabilitiesPageCarousel galleryImages={asset.gallery_images} />
            <PanelText panelText={asset.panel_text} />
          </div>
        )}
        {i === 3 && (
          <div className="content-wrapper">
            <CapabilitesPageListings
              pageListing={asset.capabilities_listings}
            />
          </div>
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

const mapStateToProps = (state) => ({
  windstop: state.windstop
});

export default connect(mapStateToProps)(CapabilitiesPage);