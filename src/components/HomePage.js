import React from 'react';

export default class HomePage extends React.Component {
  state = {
    error: null,
    isLoaded: false,
    assets: []
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
  render() {
    let panelBackground = ''
    const assets = this.state.assets;
    const panels = assets.map((asset, i) => (
      <div 
        className='panel' 
        key={i}
        style= {
          {backgroundImage: `url(${asset.panel_image})`}
        }
      >
        <h1>{asset.panel_title}</h1>
        <p>{asset.panel_text}</p>
      </div>
    ));
    return (
      <div>
        {panels}
      </div>
    );
  }
}
