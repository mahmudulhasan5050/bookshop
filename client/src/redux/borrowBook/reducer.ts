
import {BookAndUser} from './action'
import {BorrowInfoType} from '../../type/types'
import {
  Actions,
  INFO_SUCCESS,
  BORROW_BOOK_SUCCESS,
  BORROW_BOOK_ERROR
} from './action';

export type InitialStateBorrow = {
bookAndUser: BookAndUser | null
borrowedByUser: BorrowInfoType | null
borrowedError: Error | null
};

const initialState: InitialStateBorrow = {
    bookAndUser: null,
    borrowedByUser: null,
    borrowedError: null
};

const reducer = (state = initialState, action: Actions): InitialStateBorrow => {
  switch (action.type) {
    case INFO_SUCCESS:
      return {
        ...state,
        bookAndUser: action.payload
      };
case BORROW_BOOK_SUCCESS:
  return {
    ...state,
    borrowedByUser: action.payload
  }
  case BORROW_BOOK_ERROR:
    return {
      ...state,
      borrowedError: action.payload
    }
    default:
      return state;
  }
};

export default reducer;
