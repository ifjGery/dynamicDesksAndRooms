import React from 'react';

class ZoomButtons extends React.Component {
  render() {
    return (
      <div className="ZoomButtons">
        <button className="button navIcon" onClick={() => this.props.zoomIn()}>+</button>
        <button className="button navIcon" onClick={() => this.props.zoomOut()}>-</button>
      </div>  
    );
  }
}

export default ZoomButtons;
