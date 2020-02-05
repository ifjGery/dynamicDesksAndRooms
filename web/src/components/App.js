import React from 'react';
import Notification from '../containers/Notification/Notification';
import FloorSelector from '../containers/FloorSelector/FloorSelector';
import Search from '../containers/Search/Search';
import Menu from '../containers/Menu/Menu';

function App() {
  return (
    <div className="App">
        <Notification />
        <FloorSelector />
        <Search />
        <Menu />
    </div>
  );
}

export default App;
