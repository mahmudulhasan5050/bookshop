import { User } from '../../type/types';
import {Actions} from './actions';


export type InitialStateAuth = {
    isAuthenticate: boolean
    user: User | null
}
const initialState:InitialStateAuth = {
  isAuthenticate: false,
  user: null,
};

const authReducer = (state = initialState, action: Actions):InitialStateAuth => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
          ...state,
          isAuthenticate: true,
          user: action.payload
      };
    case 'LOGOUT':
      return {
          ...state,
          isAuthenticate: false,
          user: null
      };
    default:
      return state;
  }
};

export default authReducer;
