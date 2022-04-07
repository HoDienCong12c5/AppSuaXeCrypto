export const createReducer = ( initialState, handlers ) => function reducer( state = initialState, action ) {
  if ( Object.prototype.hasOwnProperty.call( handlers, action.type ) ) {
    return handlers[action.type]( state, action );
  }
  return state;
};
