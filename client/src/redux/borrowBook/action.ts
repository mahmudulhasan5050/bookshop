import { Dispatch } from 'redux';

import * as api from '../../api-axios';
import { User,BooksDocument,BorrowInfoType } from '../../type/types';

export const INFO_SUCCESS = 'INFO_SUCCESS';
export const BORROW_BOOK_SUCCESS = 'BORROW_BOOK_SUCCESS'
export const BORROW_BOOK_ERROR = 'BORROW_BOOK_ERROR'

export type BookAndUser = {
    book: BooksDocument | null
    user: User | null
}
export const borrowBookInfoForComponent = (
    book:BooksDocument, user:User
): GenericAction<typeof INFO_SUCCESS, BookAndUser> => {
   const response = {book, user}
  return { type: INFO_SUCCESS, payload: response };
};

export const borrowBookRedux = (borrowObj:BorrowInfoType) =>{
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.borrowBookAxios(borrowObj).then((res) => {
        return res.data;
      });
      dispatch(bookBorrow(response));
    } catch (error) {
      dispatch(bookBorrowError(error as Error));
    }
  };
}

const bookBorrow = (
  response: BorrowInfoType
): GenericAction<typeof BORROW_BOOK_SUCCESS, BorrowInfoType> => {
  return { type: BORROW_BOOK_SUCCESS, payload: response };
};

const bookBorrowError = (
  error: Error
): GenericAction<typeof BORROW_BOOK_ERROR, Error> => {
  return { type: BORROW_BOOK_ERROR, payload: error };
};

type GenericAction<T, K> = {
  type: T;
  payload: K;
};

export type Actions =
  | ReturnType<typeof borrowBookInfoForComponent>
  | ReturnType<typeof bookBorrow>
  | ReturnType<typeof bookBorrowError>
