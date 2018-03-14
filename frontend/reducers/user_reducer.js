import { RECEIVE_USER, UPDATE_USER, RECEIVE_USERS } from '../actions/user_actions';
import { DESTROY_IMAGE, RECEIVE_IMAGE } from '../actions/image_actions';
import { merge } from 'lodash';

const userReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_USERS:
      return merge({}, state, action.users);
    case UPDATE_USER:
      return merge({}, state, {[action.user.user.id]: action.user});
    case DESTROY_IMAGE:
      let newState = merge({}, state);
        let idx = newState[Object.keys(newState)[0]].user.image_ids.indexOf(action.id);
        newState[Object.keys(newState)[0]].user.image_ids.splice(idx, 1);
      return newState;
    case RECEIVE_USER:
      return merge({}, state, {[action.user.user.id]: action.user.user});
    case RECEIVE_IMAGE:
      let imgUser = state[action.image.author_id];
      let newArr = imgUser.user.image_ids.slice();
      if (!newArr.includes(action.image.id)) {
        newArr.push(action.image.id);
      }
      return merge({}, state, {[imgUser.user.id]: {user: {image_ids: newArr}}});
    default:
      return state;
  }
};

export default userReducer;
