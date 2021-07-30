import * as dashboardActions from '../actions/dashboardActions';

const initialState = {
  username: '',
  activeUsers: [],
  groupCallRooms: []
};

const reducer = (state = initialState, action) => {
  let res;
  switch (action.type) {
    case dashboardActions.DASHBOARD_SET_USERNAME:
      res = {
        ...state,
        username: action.username,
      };
      break;
    case dashboardActions.DASHBOARD_SET_ACTIVE_USERS:
      res = {
        ...state,
        activeUsers: action.activeUsers,
      };
      break;
    case dashboardActions.DASHBOARD_SET_GROUP_CALL_ROOMS:
      res = {
        ...state,
        groupCallRooms: action.groupCallRooms
      }
      break;
    default:
      res = state;
  }

  return res;
};

export default reducer;
