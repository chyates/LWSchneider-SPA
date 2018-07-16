import React from 'react'

const PartCallouts = (props) => {
  const callouts = props.callouts.map((callout, i) => (
    <li 
      key={callout.callout}
    >
      {callout.callout}
    </li>
  ))
  return (
    <ul 
      style={props.style}
    >
      {callouts}
    </ul>
  )
}

export default PartCallouts;
