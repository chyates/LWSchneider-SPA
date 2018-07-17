import React from 'react';

const PanelText = (props) => {
  console.log(typeof(props.colSpan))
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
  console.log(colClasses)
  return (
    <div className="row no-gutters justify-content-center">
      <div 
        className={
          colClasses !== undefined
          ? colClasses.join(' ') 
          : "col-5"
          }
      >
        <p className="panel-text">{props.panelText}</p>
      </div>
    </div>
  )
}

export default PanelText;