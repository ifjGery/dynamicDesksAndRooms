import React from 'react';
import Notification from '../containers/Notification/Notification';
import FloorSelector from '../containers/FloorSelector/FloorSelector';
import Search from '../containers/Search/Search';
import Menu from '../containers/Menu/Menu';
import ZoomButtons from '../containers/ZoomButtons/ZoomButtons';
import FloorPlan from '../containers/FloorPlan/FloorPlan';

function App() {
  return (
    <div className="App">
        <Notification />
        <FloorSelector />
        <Search />
        <Menu />
        <ZoomButtons />
        <FloorPlan />
    </div>
  );
}

export default App;
