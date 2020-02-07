import React from 'react';

function ControlButton(props) {
    let className = "ControlButton" + (props.className.length ? " " + props.className : "");
  return (
    <button className={className} onClick={props.onClick}>
      {props.content}
    </button>
  );
}

export default ControlButton;
