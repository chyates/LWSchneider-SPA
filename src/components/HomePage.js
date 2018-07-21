import _ from 'lodash';
import React from 'react';
import { isScrollingDown, isScrollingUp } from 'react-is-scrolling';

import { connect } from 'react-redux';

//Component Imports
import Panel from './Panel';
import PanelContact from './PanelContact';
import PanelLink from './PanelLink';
import PanelText from './PanelText';
import PanelTitle from './PanelTitle';
import ScrollButton from './ScrollButton';
import HomePageCarousel from './HomePageCarousel';
import { revertWindstop, rotateOnce } from '../actions/windstop';

class HomePage extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    assets: [],
    panelIndex: 0,
    buttonText: '',
    lastScrollPos: 0
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
    this.props.dispatch(revertWindstop());
    if (this.state.panelIndex === 0) {
      this.state.buttonText = ("Scroll")
    }
  }
  handleChangePanels = e => {
    console.log(e.deltaY)
    if (e.deltaY > 0 && this.state.panelIndex < this.state.assets.length - 1) {
      this.setState({
        panelIndex: this.state.panelIndex + 1
      });
    } else if (e.deltaY < 0 && this.state.panelIndex > 0) {
      this.setState({
        panelIndex: this.state.panelIndex - 1
      })
    }
  };
  handleRotateWindstop = e => {
    console.log({deltaX: e.deltaX, deltaY: e.deltaY, deltaZ: e.deltaZ})
    // deltaY > 0 => scrolling down
    // deltaY < 0 => scrolling up
    // deltaX != 0 => you are on a touchpad and scrolling sideways by accident
    // deltaZ => no idea what this means
    if (e.deltaY !== 0) this.props.dispatch(rotateOnce(e.deltaY));
  }
  setButtonText(text) {
    this.setState({
      buttonText: text
    })
  }
  render() {
    const assets = this.state.assets;
    const panelIndex = this.state.panelIndex;
    const panels = assets.map((asset, i) => (
      <Panel
        className={
          panelIndex == i
            ? 'homepage-panel active'
            : 'homepage-panel inactive'
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
          colSpan={i === 5 ? 3 : 4} 
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
        onWheel={e => {
            e.persist()
            // this.handleChangePanels(e, this.state.panelIndex)
            // this.handleChangePanels(e, this.state.panelIndex)
            _.debounce(e => this.handleChangePanels(e), 100)(e)
            _.debounce(e => this.handleRotateWindstop(e), 100)(e)
          }
        }
      >
        {panels}
        <ScrollButton
          buttonText={
            (panels[this.state.panelIndex] === 0) ? "Scroll" : ''
          }
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