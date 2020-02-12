import React from 'react';

import Window from './PopUpWindow';
import PopUpNotification from './PopUpNotification';

import NotificationManager from './NotificationManager';
import SettingsManager from './SettingsManager';
import AdvancedSearch from './AdvancedSearch';
import ReservationPage from './ReservationPage';
import Feedback from './Feedback';
import SearchList from './SearchList';
import OwnReservations from './OwnReservations';
import FloorPlan from './FloorPlan';
import Login from './Login';
import Header from './Header';

import useNavigation from '../containers/Navigation/useNavigation';

import {
  NOTIFICATION_MANAGER,
  SETTINGS_MANAGER,
  ADVANCED_SEARCH,
  RESERVATION_PAGE,
  SEARCH_LIST,
  OWN_RESERVATIONS,
  LOGIN,
  RATE
} from './constants';

import L1 from '../assets/floor/L1';

function App() {
  const { navigation } = useNavigation();
  const activePage = navigation.activePage;
  const activeWindow = navigation.activeWindow;
  
  let content;
  switch(activePage) {
    case NOTIFICATION_MANAGER:
      content = <NotificationManager />;
      break;
    case SETTINGS_MANAGER:
      content = <SettingsManager />;
      break;
    case ADVANCED_SEARCH:
      content = <AdvancedSearch />;
      break;
    case RESERVATION_PAGE:
      content = <ReservationPage />;
      break;
    case SEARCH_LIST:
      content = <SearchList />;
      break;
    case OWN_RESERVATIONS:
      content = <OwnReservations />;
      break;
    default:
      content = (
        <FloorPlan>
          <L1 />
        </FloorPlan>
      );
  }

  let windowContent;
  switch(activeWindow) {
    case LOGIN:
      windowContent = (
        <Window>
          <Login />
        </Window>
      );
      break;
    case RATE:
      windowContent = (
        <Window isCloseable>
          <Feedback />
        </Window>
      );
      break;
    default:
      windowContent = "";     
  }

  return (
    <div className="App">
      {windowContent}
      <div className="fixed">
        <Header />
        <div className="content">
          {content}
        </div>
      </div>
      <PopUpNotification text="your room is ready" />
    </div>
  )
}

export default App;
