import * as pageReducers from './Reducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  ...pageReducers,
});

export default rootReducer;
