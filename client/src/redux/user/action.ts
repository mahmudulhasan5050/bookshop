import { Dispatch } from 'redux';

import * as api from '../../api-axios';
import { User } from '../../type/types';

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';
export const RETURN_BOOK_SUCCESS = 'RETURN_BOOK_SUCCESS'
export const RETURN_BOOK_ERROR = 'RETURN_BOOK_ERROR'

export const fetchUserFromRedux = (userId:any) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.getUserAxios(userId).then((res) => {
        return res.data;
      });
      dispatch(fetchUser(response));
    } catch (error) {
      dispatch(fetchUserError(error as Error));
    }
  };
};

const fetchUser = (
  response: User
): GenericAction<typeof FETCH_USER_SUCCESS, User> => {
  return { type: FETCH_USER_SUCCESS, payload: response };
};

const fetchUserError = (
  error: Error
): GenericAction<typeof FETCH_USER_ERROR, Error> => {
  return { type: FETCH_USER_ERROR, payload: error };
};


export const returnBookRedux = (userId: string ,borrowId: string) =>{
  return async (dispatch: Dispatch) => {
    try {
     await api.returnBookAxios(userId, borrowId).then((res) => {
        console.log("res.data action redux    ", res.data)
        return res.data;
      });
      dispatch(returnBook(borrowId));
    } catch (error) {
      dispatch(returnBookError(error as Error));
    }
  };
}


const returnBook = (borrowId: string): GenericAction<typeof RETURN_BOOK_SUCCESS, string>  =>{
  console.log("response action redux")
  return { type: RETURN_BOOK_SUCCESS, payload: borrowId };
}
const returnBookError = (error: Error): GenericAction<typeof RETURN_BOOK_ERROR, Error> =>{
  return { type: RETURN_BOOK_ERROR, payload: error };
}
type GenericAction<T, K> = {
  type: T;
  payload: K;
};

export type Actions =
  | ReturnType<typeof fetchUser>
  | ReturnType<typeof fetchUserError>
 | ReturnType<typeof returnBook>
 | ReturnType<typeof returnBookError>;