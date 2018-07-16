import React from 'react'

const PanelText = (props) => {
  return (
    <div className="row no-gutters justify-content-center">
      <div 
        className={props.colSpan ? `col-${props.colSpan}` : "col-4"}
      >
        <p className="panel-text">{props.panelText}</p>
      </div>
    </div>
  )
}

export default PanelText;
