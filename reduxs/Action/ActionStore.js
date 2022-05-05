import { checkStore, setStoreLocals } from 'modals/function';
import { MENU, KEY_PAGE } from 'common/constants';

export default class StorageReduxAction {
  static setMenuFooter( payload ) {
    // checkStore(payload, 'SET_MENU_FOOTER')
    return {
      type: MENU.SET_MENU_FOOTER,
      payload
    };
  }

  static setUser( payload ) {
    // checkStore( 'user', payload );
    return {
      type: MENU.USER,
      payload
    };
  }

  static setListWorker( payload ) {
    // checkStore( 'user', payload );
    return {
      type: KEY_PAGE.SET_LIST_WORKER,
      payload
    };
  }

  static setListNearWorkerLimit( payload ) {
    // checkStore( KEY_PAGE.SET_LIST_NEAR, payload );
    return {
      type: KEY_PAGE.SET_LIST_NEAR,
      payload
    };
  }

  static setListQualityWorker( payload ) {
    // checkStore( 'user', payload );
    return {
      type: KEY_PAGE.SET_LIST_QUALITY_WORKER,
      payload
    };
  }

  static setCalender( payload ) {
    // checkStore( 'user', payload );
    return {
      type: KEY_PAGE.SET_CALENDER,
      payload
    };
  }

  static setCalenderDoing( payload ) {
    // checkStore( 'user', payload );
    return {
      type: KEY_PAGE.SET_CALENDER_DOING,
      payload
    };
  }

  static setMessage( payload ) {
    // checkStore( 'user', payload );
    return {
      type: KEY_PAGE.MESSAGE,
      payload
    };
  }
  //wallet
  static setWallet( payload ) {
    // checkStore( 'user', payload );
    return {
      type: KEY_PAGE.WALLET,
      payload
    };
  }
  static setToken( payload ) {
    // checkStore( 'user', payload );
    return {
      type: KEY_PAGE.TOKEN,
      payload
    };
  }
  static setListChat( payload ) {
    // checkStore( 'user', payload );
    return {
      type: KEY_PAGE.LIST_CHAT,
      payload
    };
  }
  static setHistory( payload ) {
    setStoreLocals(  KEY_PAGE.HISTORY, payload );
    return {
      type: KEY_PAGE.HISTORY,
      payload
    };
  }
  static setBalance( payload ) {
    // checkStore( 'user', payload );
    return {
      type: KEY_PAGE.BALANCE,
      payload
    };
  }
  static setRPC( payload ) {
    // checkStore( 'user', payload );
    return {
      type: KEY_PAGE.RPC,
      payload
    };
  }
}
