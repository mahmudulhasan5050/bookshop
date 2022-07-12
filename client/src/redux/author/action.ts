import { Dispatch } from 'redux';

import * as api from '../../api-axios';
import { AuthorsDocument } from '../../type/types';

export const FETCH_AUTHOR_SUCCESS = 'FETCH_AUTHOR_SUCCESS';
export const FETCH_AUTHOR_ERROR = 'FETCH_AUTHOR_ERROR';
export const CREATE_AUTHOR_SUCCESS = 'CREATE_AUTHOR_SUCCESS';
export const CREATE_AUTHOR_ERROR = 'CREATE_AUTHOR_ERROR';

export const fetchAuthorFromRedux = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.getAuthorsAxios().then((res) => {
        return res.data;
      });
      dispatch(fetchAuthors(response));
    } catch (error) {
      dispatch(fetchAuthorsError(error as Error));
    }
  };
};

const fetchAuthors = (
  response: AuthorsDocument[]
): GenericAction<typeof FETCH_AUTHOR_SUCCESS, AuthorsDocument[]> => {
  return { type: FETCH_AUTHOR_SUCCESS, payload: response };
};

const fetchAuthorsError = (
  error: Error
): GenericAction<typeof FETCH_AUTHOR_ERROR, Error> => {
  return { type: FETCH_AUTHOR_ERROR, payload: error };
};

//create book
export const createAuthor = (authorObj:AuthorsDocument) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await api.createAuthorAxios(authorObj).then((res) => {
        return res.data;
      });
      dispatch(AuthorCreation(response));
    } catch (error) {
      dispatch(AuthorCreationError(error as Error));
    }
  };
};

const AuthorCreation = (
  response: AuthorsDocument
): GenericAction<typeof CREATE_AUTHOR_SUCCESS, AuthorsDocument> => {
  return { type: CREATE_AUTHOR_SUCCESS, payload: response };
};

const AuthorCreationError = (
  error: Error
): GenericAction<typeof CREATE_AUTHOR_ERROR, Error> => {
  return { type: CREATE_AUTHOR_ERROR, payload: error };
};



type GenericAction<T, K> = {
  type: T;
  payload: K;
};

export type Actions =
  | ReturnType<typeof fetchAuthors>
  | ReturnType<typeof fetchAuthorsError>
  | ReturnType<typeof AuthorCreation>
  | ReturnType<typeof AuthorCreationError>

