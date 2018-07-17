import React from 'react';

const PanelTitle = (props) => {
  let colClasses = [];
  if (props.colSpan === undefined) {
    colClasses = undefined;
  } else {
    if (typeof (props.colSpan) === "object") {
      const { xl, lg, md } = props.colSpan;
      colClasses = [
        (xl && `col-xl-${xl}`),
        (lg && `col-lg-${lg}`),
        (md && `col-md-${md}`),
        'col-10'
      ]
    } else if (typeof (props.colSpan === "number")) {
      colClasses = [
        `col-${props.colSpan}`
      ]
    }
  }
  return (
    <div className="row justify-content-center">
      <div 
        className={
          colClasses ? colClasses.join(' ') : "col-4"
        }
      >
        <h1 className="panel-title">{props.panelTitle}</h1>
      </div>
    </div>
  )
}

export default PanelTitle;
