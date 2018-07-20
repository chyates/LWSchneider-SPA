import _ from 'lodash';
import React from 'react';

import { connect } from 'react-redux';

//Component Imports
import Panel from './Panel';
import PanelContact from './PanelContact';
import PanelLink from './PanelLink';
import PanelText from './PanelText';
import PanelTitle from './PanelTitle';
import ScrollButton from './ScrollButton';
import HomePageCarousel from './HomePageCarousel';
import WindStop from './WindStop';
import { rotateOnce } from '../actions/windstop';

class HomePage extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    assets: [],
    panelIndex: 0,
  };
  componentDidMount() {
    fetch('https://lws.impactpreview.com/wp-json/wp/v2/pages/120')
      .then(res => res.json())
      .then(
        result => {
          console.log(result);
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
  handleRotateWindstop = () => {
    this.props.dispatch(rotateOnce());
  }
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
          colSpan={i === 3 ? 6 : 4}
          panelTitle={asset.panel_title}
          titleId={`homePanel${i}`}
        />
        {asset.carousel_images && (
          <HomePageCarousel images={asset.carousel_images} />
        )}
        <PanelText 
          colSpan={4} 
          panelText={asset.panel_text}
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
      <div 
        className="page" 
        onWheel={() => (this.handleChangePanels(), this.handleRotateWindstop())}
      >
        {panels}
        <ScrollButton 
          handleRotateWindstop={this.handleRotateWindstop}  
          handleChangePanels={this.handleChangePanels} 
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  windstop: state.windstop
});

export default connect(mapStateToProps)(HomePage);