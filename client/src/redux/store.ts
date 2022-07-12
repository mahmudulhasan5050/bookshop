import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import authReducer from './auth/reducer';
import bookReducer from './book/reducer';
import userReducer from './user/reducer';
import authorReducer from './author/reducer';
import borrowReducer from './borrowBook/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer,
  user: userReducer,
  author: authorReducer,
  borrow: borrowReducer,
});
export type AppState = ReturnType<typeof rootReducer>;

const initialState: AppState = {
  auth: {
    isAuthenticate: false,
    user: null,
  },
  book: {
    books: [],
    error: null,
    createBookError: null,
  },
  user: {
    user: null,
    error: null,
  },
  author: {
    authors: [],
    error: null,
    createAuthor: null,
    createAuthorError: null,
  },
  borrow: {
    bookAndUser: null,
    borrowedByUser: null,
    borrowedError: null,
  },
};

const storeFactory = () => {
  const hasAccessToken = JSON.parse(
    localStorage.getItem('access_token') || '{}'
  );
  if (hasAccessToken.token) {
    initialState.auth.isAuthenticate = true;
    initialState.auth.user = hasAccessToken.user;
  }
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};

const store = storeFactory();
export default store;
