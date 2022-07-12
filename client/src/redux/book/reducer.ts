import { BooksDocument } from '../../type/types';
import {
  Actions,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_ERROR,
  CREATE_BOOK_SUCCESS,
  CREATE_BOOK_ERROR,
  DELETE_BOOK_SUCCESS,
} from './action';

export type InitialStateBook = {
  books: BooksDocument[];
  error: Error | any;
  createBookError: Error | any;
};

const initialState: InitialStateBook = {
  books: [],
  error: null,
  createBookError: null,
};

const reducer = (state = initialState, action: Actions): InitialStateBook => {
  switch (action.type) {
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload,
      };
    case FETCH_BOOKS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CREATE_BOOK_SUCCESS:
      return {
        ...state,
        books: [...state.books, action.payload],
      };
    case CREATE_BOOK_ERROR:
      return {
        ...state,
        createBookError: action.payload,
      };
    case DELETE_BOOK_SUCCESS:
      const filteredBooks = state.books.filter(
        (book) => book._id !== action.payload
      );
      return { ...state, books: filteredBooks };

    default:
      return state;
  }
};

export default reducer;
