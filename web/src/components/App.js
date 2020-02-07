import React from 'react';
import Redux from 'redux';

import ControlButton from './ControlButton';
import FullScreenWindow from './FullScreenWindow';

import FloorPlan from '../containers/FloorMap/FloorMap';
import PopUpNotification from '../containers/PopUpNotification/PopUpNotification';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullScreen: true
    }
  }

  render() {
    const closeAction = { type: 'CLOSE_WINDOW' };
    return (
      <div className="App">
        {this.state.showFullScreen && <FullScreenWindow onClick={() => Redux.disp} />}
        <FloorPlan />
        <ControlButton className="FloorSelector fixed" content="L1" onClick={() => console.log("FloorSelector")} />
        <ControlButton className="Notification fixed" content="!" onClick={() => console.log("Notification")} />
        <ControlButton className="Search fixed" content="S" onClick={() => console.log("Search")} />
        <ControlButton className="Menu fixed" content="=" onClick={() => console.log("Menu")} />
        <PopUpNotification />
      </div>
    )
  }
}

export default App;
