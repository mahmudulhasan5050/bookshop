import { AuthorsDocument } from '../../type/types';
import {
  Actions,
  FETCH_AUTHOR_SUCCESS,
  FETCH_AUTHOR_ERROR,
  CREATE_AUTHOR_SUCCESS,
  CREATE_AUTHOR_ERROR,
} from './action';

export type InitialStateAuthor = {
  authors: AuthorsDocument[];
  error: Error | any;
  createAuthor: AuthorsDocument | null;
  createAuthorError: Error | any;
};

const initialState: InitialStateAuthor = {
  authors: [],
  error: null,
  createAuthor: null,
  createAuthorError: null,
};

const reducer = (state = initialState, action: Actions): InitialStateAuthor => {
  switch (action.type) {
    case FETCH_AUTHOR_SUCCESS:
      return {
        ...state,
        authors: action.payload,
      };
    case FETCH_AUTHOR_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CREATE_AUTHOR_SUCCESS:
      return {
        ...state,
        createAuthor: action.payload,
      };
    case CREATE_AUTHOR_ERROR:
      return {
        ...state,
        createAuthorError: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
