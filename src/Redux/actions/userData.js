export const SAVE_USER_DATA = 'SAVE_USER_DATA';
export const REMOVE_USER_DATA = 'REMOVE_USER_DATA';


export const saveUserData = data => dispatch => {
  dispatch({
    type: SAVE_USER_DATA,
    payload: data
  });
};

export const removeUserData = data => dispatch => {
  dispatch({
    type: REMOVE_USER_DATA,
    payload: data
  });
};
