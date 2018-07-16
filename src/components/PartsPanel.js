import React, { Component } from 'react';

export default class PartsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panelIndex: 0,
      partsIndex: "Main"
    }
  }
  handleTogglePartsImage = () => {
    console.log('click')
  }
  render() {
    const partsIndex = this.state.partsIndex;
    console.log(this.props.handgunsGroup);
    // console.log(this.props.sportingRiflesGroup);
    const handgunsGroup = this.props.handgunsGroup;
    const handgunPanels = handgunsGroup.map((image, i) => (
      <div
        className="col-10 position-absolute"
      >
        <div className="row no-gutters justify-content-center">
          <img
            className={
              partsIndex == image.part_label
                ? 'parts-panel active'
                : 'parts-panel inactive'
            }
            src={image.part_image}
            alt="parts"
            key={image.part_label}
          />
          {image.part_label !== "Main" &&
            <div className="col-3">
              <div className="row no-gutters justify-content-center">
                <button
                  id={image.part_label + "Button"}
                  className="button--parts-panel"
                >
                  {image.part_label}
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    ));
    return (
      <div className="row no-gutters justify-content-center py-5">
        <div className="col-10 position-relative">
          <div className="row no-gutters justify-content-center">
            <img
              className="parts-image invisible"
              src={handgunsGroup[0]['part_image']}
              alt="parts"
            />
            {handgunPanels}
          </div>
        </div>
      </div>
    )
  }
};
