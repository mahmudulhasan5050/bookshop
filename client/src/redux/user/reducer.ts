import { User, BorrowedByUserType } from '../../type/types';
import {
  Actions,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  RETURN_BOOK_SUCCESS,
  RETURN_BOOK_ERROR,
} from './action';

export type InitialStateUser = {
  user: User | null;
  error: Error | any;
};

const initialState: InitialStateUser = {
  user: null,
  error: null,
};

const reducer = (state = initialState, action: Actions): InitialStateUser => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case RETURN_BOOK_SUCCESS:
      const newUser = state.user?.borrowedByUser.filter(
        (item) => item._id !== action.payload
      ) as BorrowedByUserType[];
      console.log('new User from reducer', newUser);
      return {
        ...state,
        user: { ...state.user, borrowedByUser: newUser },
      };
    case RETURN_BOOK_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
