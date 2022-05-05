// import store from 'react-native-simple-store'

import { MENU, KEY_PAGE } from '../../common/constants';
// import createReducer from './CreateReducer';
import { createReducer } from './CreateReducer';
import initState from '../Lib/key';

export const menuFooterRedux = createReducer( initState.menuFooter, {
  [MENU.SET_MENU_FOOTER]( state, action ) {
    return action.payload;
  }
} );
export const user = createReducer( initState.user, {
  [MENU.USER]( state, action ) {
    return action.payload;
  }
} );
export const listWorker = createReducer( initState.list, {
  [KEY_PAGE.SET_LIST_WORKER]( state, action ) {
    return action.payload;
  }
} );
export const listQualityWorker = createReducer( initState.list, {
  [KEY_PAGE.SET_LIST_QUALITY_WORKER]( state, action ) {
    return action.payload;
  }
} );
export const listWorkerNearLimit = createReducer( initState.list, {
  [KEY_PAGE.SET_LIST_NEAR]( state, action ) {
    return action.payload;
  }
} );
export const calender = createReducer( initState.numberInit, {
  [KEY_PAGE.SET_CALENDER]( state, action ) {
    return action.payload;
  }
} );
export const calenderDoing = createReducer( initState.numberInit, {
  [KEY_PAGE.SET_CALENDER_DOING]( state, action ) {
    return action.payload;
  }
} );
export const message = createReducer( initState.numberInit, {
  [KEY_PAGE.MESSAGE]( state, action ) {
    return action.payload;
  }
} );

export const wallet = createReducer( initState.numberInit, {
  [KEY_PAGE.WALLET]( state, action ) {
    return action.payload;
  }
} );
export const listChat = createReducer( initState.list, {
  [KEY_PAGE.LIST_CHAT]( state, action ) {
    return action.payload;
  }
} );

export const token = createReducer( initState.token, {
  [KEY_PAGE.TOKEN]( state, action ) {
    return action.payload;
  }
} );
export const balance = createReducer( initState.numberInit, {
  [KEY_PAGE.BALANCE]( state, action ) {
    return action.payload;
  }
} );
export const rpc = createReducer( initState.numberInit, {
  [KEY_PAGE.BALANCE]( state, action ) {
    return action.payload;
  }
} );
export const history = createReducer( initState.list, {
  [KEY_PAGE.HISTORY]( state, action ) {
    return action.payload;
  }
} );



