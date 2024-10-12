import { combineReducers } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'home',
};

function tabReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.payload,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  tabs: tabReducer,
});

export default rootReducer;