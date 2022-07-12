import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, Button } from '@mui/material';
import CardActions from '@mui/material/CardActions';

import HomeCard from '../components/HomeCard';
import SearchBar from '../components/SearchBar';
import { fetchBooksFromRedux } from '../redux/book/action';
import { borrowBookInfoForComponent } from '../redux/borrowBook/action';
import { AppState } from '../redux/store';
import { InitialStateBook } from '../redux/book/reducer';
import { InitialStateAuth } from '../redux/auth/reducer';
import { User, BooksDocument } from '../type/types';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const bookFromStore: InitialStateBook = useSelector((state: AppState) => {
    return state.book;
  });
  const userFromStore: InitialStateAuth = useSelector((state: AppState) => {
    return state.auth;
  });


 const bookFromStoreNew = bookFromStore.books.filter((book: BooksDocument) => {
    return book.name.toLowerCase().includes(searchText.toLowerCase());
  })

  const borrowHandle = (book: BooksDocument | null, user: User | null) => {
    if (userFromStore.isAuthenticate && book && user) {
      dispatch(borrowBookInfoForComponent(book, user));
      navigate('/borrow');
    } else {
      navigate('/login');
    }
  };
  useEffect(() => {
    dispatch(fetchBooksFromRedux());
  }, [dispatch]);

  return (
    <Grid container direction='column' alignItems='center'>
      <Grid item>
        <h1>Home</h1>
      </Grid>
      <Grid item>
        <SearchBar setSearchText={setSearchText} />
      </Grid>
      <Grid
        item
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {!searchText ? bookFromStore?.books
        .map((book) => {
          return (
            <Grid item xs={2} sm={4} md={4} key={book.name}>
              <HomeCard book={book} />
              <CardActions>
              <Button
                size='small'
                variant='contained'
                onClick={() => borrowHandle(book, userFromStore.user)}
                >
              Borrow
                </Button>
              </CardActions>
            </Grid>
          );
        })
        : bookFromStoreNew.map((book) => {
          return (
            <Grid item xs={2} sm={4} md={4} key={book.name}>  
              <HomeCard book={book}/>
              <Button
             size='small'
              variant='contained'
               onClick={() => borrowHandle(book, userFromStore.user)}
      >
        Borrow
      </Button>
            </Grid>)
        })
        }
      </Grid>
    </Grid>
  );
};

export default Home;
