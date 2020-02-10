import { combineReducers } from 'redux';

import Navigation from './containers/Navigation/reducer';
import FloorPlan from './containers/FloorPlan/reducer';
import User from './containers/User/reducer';

const reservables = (state = null, action) => state;

export default combineReducers({navigation: Navigation, map: FloorPlan, user: User, reservable: reservables});