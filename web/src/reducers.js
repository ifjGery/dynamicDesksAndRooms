import { combineReducers } from 'redux';

import Navigation from './containers/Navigation/reducer';
import FloorPlan from './containers/FloorPlan/reducer';
import User from './containers/User/reducer';

export default combineReducers({ navigation: Navigation, map: FloorPlan, user: User});