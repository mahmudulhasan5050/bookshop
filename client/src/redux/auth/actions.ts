import { User } from '../../type/types';

type LoginSuccessAction = {
  type: 'LOGIN_SUCCESS';
  payload: User;
};
type Logout = {
  type: 'LOGOUT';
};

export type Actions = LoginSuccessAction | Logout;



export const loginSuccess = (user: User): LoginSuccessAction => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: user,
  };
};

export const logout = (): Logout => {
  return {
    type: 'LOGOUT',
  };
};
