import React from 'react';

export default class CapabilitiesPageListings extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const capabilitiesListings = this.props.pageListing;

    const listings = capabilitiesListings.map((listing, i) => (
      <div 
        key={i + 1}
        className="col"
      >
        <h1>{listing.listings_title}</h1>
        <ul>
          {listing.list_items.map((item, i) => (
            <li
              key={i + 1}
            >
              {item.list_item}
            </li>
          ))}
        </ul>
      </div>
    ))
  return (
    <div className="row no-gutters justify-content-center">
      {listings}
    </div>
    )
  }
}