import React from 'react'

const PanelTitle = (props) => {
  return (
    <div className="row justify-content-center">
      <div 
        className={
          props.colSpan ? `col-${props.colSpan}` : "col-4"
        }
      >
        <h1 className="panel-title">{props.panelTitle}</h1>
      </div>
    </div>
  )
}

export default PanelTitle;
