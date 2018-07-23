import React, { Component } from 'react';
// import _ from 'lodash';
import { connect } from 'react-redux';
import { scaleWindstop } from '../actions/windstop';

//Component Imports
import FounderImage from './FounderImage';
import Panel from './Panel';
import PanelTitle from './PanelTitle';
import PanelText from './PanelText';
import AboutPageCarousel from './AboutPageCarousel';
import ScrollButton from './ScrollButton';

class AboutPage extends Component {
  state = {
    assets: [],
    panelIndex: 0,
    didScroll: 0,
    touchY: null
  }
  componentDidMount() {
    fetch('https://lws.impactpreview.com/wp-json/wp/v2/pages/174')
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
    this.props.dispatch(scaleWindstop());
    this.interval = setInterval(() => {
      if (this.state.didScroll !== 0) {
        this.handleChangePanels(this.state.didScroll)
        this.setState({didScroll: 0})
      }
    }, 500)
  }
  componentWillUnmount() {
    clearInterval(this.interval)
  }
  handleScroll = e => {
    this.setState({
      didScroll: this.state.didScroll + e.deltaY
    })
  }
  handleTouchStart = e => {
    this.setState({
        touchY: e.changedTouches[0].clientY
    })
  }
  handleTouchEnd = e => {
    if (this.state.touchY) {
      this.handleChangePanels(this.state.touchY - e.changedTouches[0].clientY)
      this.setState({touchY: null})
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
  render() {
    const assets = this.state.assets;
    const panelIndex = this.state.panelIndex;
    const panels = assets.map((asset, i) => (
      <Panel
        className={panelIndex == i ? 'panel active' : 'panel inactive'}
        key={i + 1}
      >
        {/* Home Panel - Broken out for layout purposes */}
        {i == 0 && (
          <div>
            <FounderImage imgSrc={asset.panel_image} />
            <PanelTitle
              panelTitle={asset.panel_title}
              colSpan={{
                xl: 4,
                lg: 6
              }}
            />
            <PanelText
              colSpan={{
                xl: 4,
                lg: 6
              }}
              panelText={asset.panel_text}
            />
          </div>
        )}
        {/* Panel 2 - Broken out for layout purposes */}
        {i === 1 && (
          <div>
            <PanelTitle
              colSpan={{
                xl: 5,
                lg: 6
              }}
              panelTitle={asset.panel_title}
            />
            <div className="row no-gutters justify-content-center">
              <div className="col-6">
                <div className="row no-gutters justify-content-center">
                  <img
                    id="familyImage"
                    src={asset.panel_image}
                    alt="image"
                  />
                </div>
              </div>
            </div>
            <div className="row no-gutters justify-content-center">
              <div className="col-6">
                <div className="row no-gutters justify-content-center">
                  <div className="col-6">
                    <ul className="about-ul">
                      {asset.panel_bullets_col_1.map((item, i) => (
                        <li key={item.list_items}>{item.list_items}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="col-6">
                    <ul className="about-ul">
                      {asset.panel_bullets_col_2.map((item, i) => (
                        <li key={item.list_items}>{item.list_items}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Panel 3 - Broken out for layout purposes */}
        {i === 2 && (
          <div>
            <AboutPageCarousel images={asset.panel_images_for_carousel} />
            <PanelTitle panelTitle={asset.panel_title} />
            <PanelText panelText={asset.panel_text} />
          </div>
        )}
      </Panel>
    ));
    let buttonText = ''
    if (panelIndex == 0) buttonText = 'Scroll'
    return (
      <div
        className="page"
        onWheel={this.handleScroll}
        onTouchStart={this.handleTouchStart}
        onTouchEnd={this.handleTouchEnd}
      >
        {panels}
        {(panelIndex < assets.length - 1) ?
          <ScrollButton
            handleChangePanels={() => this.handleChangePanels(1)}
            buttonText={buttonText}
          />
          : null
        }
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  windstop: state.windstop
});

export default connect(mapStateToProps)(AboutPage);