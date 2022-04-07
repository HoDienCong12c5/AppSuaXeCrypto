import { createStore, combineReducers } from 'redux';

const store = createStore( rootReducer, composeEnhancers( applyMiddleware( ...middleWare ), Reactotron.createEnhancer() ) );

export default store;
