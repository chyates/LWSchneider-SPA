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
import { revertWindstop, rotateOnce } from '../actions/windstop';

class HomePage extends React.Component {
  state = {
    assets: [],
    buttonText: '',
    error: null,
    isLoaded: false,
    isMobile: false,
    lastScrollPos: 0,
    panelIndex: 0,
    touchX: null,
    touchY: null
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
    this.interval = setInterval(() => {
      if (this.state.didScroll !== 0) {
        this.handleChangePanels(this.state.didScroll)
        this.handleRotateWindstop(this.state.didScroll)
        this.setState({didScroll: 0})
      }
    }, 500)
    window.innerWidth < 992 && this.setState({
      isMobile: true
    });
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  handleScroll = e => {
    console.log(Object.assign({}, e))
    e.persist()
    this.setState({
      didScroll: this.state.didScroll + e.deltaY,
    })
  }
  handleTouchStart = e => {
    // console.log('touch start!', Object.assign({}, e))
    this.setState({
        touchX: e.changedTouches[0].clientX,
        touchY: e.changedTouches[0].clientY
    })
  }
  handleTouchEnd = e => {
    // console.log('touch end!', Object.assign({}, e))
    let deltaX = this.state.touchX - e.changedTouches[0].clientX
    let deltaY = this.state.touchY - e.changedTouches[0].clientY
    let slope = Math.abs(deltaY / deltaX)
    // console.log('∆X:', deltaX, '∆Y:', deltaY, 'slope:', slope)
    if (this.state.touchY && slope >= .5) {
      this.handleChangePanels(deltaY)
      this.handleRotateWindstop(deltaY)
      this.setState({
        touchX: null,
        touchY: null
      })
    }
  }
  handleChangePanels = direction => {
    if (direction > 0 && this.state.panelIndex < this.state.assets.length - 1) {
      this.setState({
        panelIndex: this.state.panelIndex + 1
      });
    } else if (direction < 0 && this.state.panelIndex > 0) {
      this.setState({
        panelIndex: this.state.panelIndex - 1
      })
    }
  };
  handleRotateWindstop = direction => {
    this.props.dispatch(rotateOnce(direction));
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
        style={
          window.innerWidth < 576 
          ? { backgroundImage: `url(${asset.panel_image_mobile})` }
          : { backgroundImage: `url(${asset.panel_image})` }
        }
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
        onWheel={this.handleScroll}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
      >
        {(panelIndex !== 0) ?
          <ScrollButton
            arrowUp={true}
            buttonText={panelIndex === 1 && "Go Back"}
            handleRotateWindstop={() => this.handleRotateWindstop(-1)}
            handleChangePanels={() => this.handleChangePanels(-1)}
          />
          : null
        }
        {panels}
        {(panelIndex < assets.length - 1) ?
          <ScrollButton
            buttonText={
              (panelIndex === 0) ? "Scroll" : ''
            }
            handleRotateWindstop={() => this.handleRotateWindstop(1)}  
            handleChangePanels={() => this.handleChangePanels(1)}
          />
          : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  windstop: state.windstop
});

export default connect(mapStateToProps)(HomePage);