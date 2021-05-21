import { SAVE_USER_DATA, REMOVE_USER_DATA } from '../actions/userData';

const initialState = {
  data: [],

};

function userDataReducer(state = initialState, action) {
  switch (action.type) {

    case SAVE_USER_DATA:
      return {
        ...state, data: [...state.data, action.payload]
      };
    case REMOVE_USER_DATA:
      return {
        ...state, data: state.data.filter(item => item.id !== action.payload.id)
      };
    default:
      return state;
  }
}

export default userDataReducer;
