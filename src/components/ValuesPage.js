import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { scaleWindstop } from '../actions/windstop';

//Component Imports
import Panel from './Panel';
import PanelTitle from './PanelTitle';
import PanelText from './PanelText';
import ScrollButton from './ScrollButton';
import ValuesPageHero from './ValuesPageHero';
import ValuesPageVideo from './ValuesPageVideo';

class ValuesPage extends Component {
  state = {
    assets: [],
    panelIndex: 0
  }
  componentDidMount() {
    fetch('https://lws.impactpreview.com/wp-json/wp/v2/pages/165')
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
  render() {
    const assets = this.state.assets;
    const panelIndex = this.state.panelIndex;
    const panels = assets.map((asset, i) => (
      <Panel
        className={panelIndex == i ? 'panel active' : 'panel inactive'}
        key={i + 1}
      >
        {i === 0 && (
          <div>
            <ValuesPageHero imageSrc={asset.panel_image} />
            <PanelTitle 
              colSpan={{
                xl: 8,
                lg: 10,
                md: 10
              }}
              panelTitle={asset.panel_title} 
            />
            <PanelText
              colSpan={6} 
              panelText={asset.panel_text} 
            />
          </div>
        )}
        {i === 1 && (
          <div>
            <PanelTitle 
              colSpan={{
                xl: 6,
                lg: 8,
                md: 10
              }}
              panelTitle={asset.panel_title} 
            />
            <ValuesPageVideo videoSrc={asset.panel_video} />
          </div>
        )}
        {i === 2 && (
          <div>
            <ValuesPageHero imageSrc={asset.panel_image} />
            <PanelTitle panelTitle={asset.panel_title} />
            <PanelText
              colSpan={{
                xl: 4,
                lg: 6,
              }} 
              panelText={asset.panel_text} 
            />
          </div>
        )}
        {i === 3 && (
          <ValuesPageHero imageSrc={asset.panel_image} />
        )}
      </Panel>
    ));
    return (
      <div className="page" onWheel={_.debounce(this.handleChangePanels, 100)}>
        {panels}
        <ScrollButton handleChangePanels={this.handleChangePanels} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  windstop: state.windstop
});

export default connect(mapStateToProps)(ValuesPage);