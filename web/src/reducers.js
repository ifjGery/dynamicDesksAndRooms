import { combineReducers } from 'redux';

import Navigation from './containers/Navigation/reducer';
import FloorPlan from './containers/FloorPlan/reducer';
import User from './containers/User/reducer';
import Reservations from './containers/Reservations/reducer';
import NotificationSettings from './containers/NotificationSettings/reducer';
import Notifications from './containers/Notifications/reducer';
import Search from './containers/Search/reducer';

const reservables = (state = null, action) => state;

export default combineReducers({
    navigation: Navigation, 
    map: FloorPlan, 
    user: User, 
    reservable: reservables,
    reserved: Reservations,
    notificationSettings: NotificationSettings,
    notifications: Notifications,
    search: Search
});