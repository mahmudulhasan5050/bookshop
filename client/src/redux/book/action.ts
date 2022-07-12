import { Dispatch } from 'redux';

import * as api from '../../api-axios';
import { BooksDocument, BooksDocumentInputType } from '../../type/types';

export const FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS';
export const FETCH_BOOKS_ERROR = 'FETCH_BOOKS_ERROR';
export const CREATE_BOOK_SUCCESS = 'CREATE_BOOK_SUCCESS';
export const CREATE_BOOK_ERROR = 'CREATE_BOOK_ERROR';
export const DELETE_BOOK_SUCCESS = 'DELETE_BOOK_SUCCESS';

export const fetchBooksFromRedux = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.getBooksAxios().then((res) => {
        return res.data;
      });
      dispatch(fetchBooks(response));
    } catch (error) {
      dispatch(fetchBooksError(error as Error));
    }
  };
};

const fetchBooks = (
  response: BooksDocument[]
): GenericAction<typeof FETCH_BOOKS_SUCCESS, BooksDocument[]> => {
  return { type: FETCH_BOOKS_SUCCESS, payload: response };
};

const fetchBooksError = (
  error: Error
): GenericAction<typeof FETCH_BOOKS_ERROR, Error> => {
  return { type: FETCH_BOOKS_ERROR, payload: error };
};

//create book
export const createBook = (bookObj:BooksDocumentInputType) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.createBookAxios(bookObj).then((res) => {
        console.log("redux action response creaateBook", res.data)
        return res.data;
      });
      dispatch(bookCreation(response));
    } catch (error) {
      dispatch(bookCreationError(error as Error));
    }
  };
};

const bookCreation = (
  response: BooksDocument
): GenericAction<typeof CREATE_BOOK_SUCCESS, BooksDocument> => {
  return { type: CREATE_BOOK_SUCCESS, payload: response };
};

const bookCreationError = (
  error: Error
): GenericAction<typeof CREATE_BOOK_ERROR, Error> => {
  return { type: CREATE_BOOK_ERROR, payload: error };
};

//delete book
export const deleteBookRedux = (  bookId: string) => {
  return async (dispatch: Dispatch) => {
    try {
       await api.deleteBookAxios(bookId).then((res) => {
        // console.log("redux action response deleteBook", res.data)
        // return res.data;
        dispatch(bookDelete(bookId));
      });
    } catch (error) {
      console.log("redux action response deleteBook error", error)
     // dispatch(bookDeleteError(error as Error));
    }
  };
}
const bookDelete = (
  response: string
): GenericAction<typeof DELETE_BOOK_SUCCESS, string> => {
  return { type: DELETE_BOOK_SUCCESS, payload: response };
};


type GenericAction<T, K> = {
  type: T;
  payload: K;
};

export type Actions =
  | ReturnType<typeof fetchBooks>
  | ReturnType<typeof fetchBooksError>
  | ReturnType<typeof bookCreation>
  | ReturnType<typeof bookCreationError>
  | ReturnType<typeof bookDelete>
