import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Typography, Paper } from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

import { BooksDocument } from '../../type/types';
import { createBook } from '../../redux/book/action';
import { fetchAuthorFromRedux } from '../../redux/author/action';
import AuthorDropdown from './AuthorDropdown';
import { AppState } from '../../redux/store';
import TableForBooks from './table/TableForBooks';

const useStyles = makeStyles({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
});

const FormBook = () => {
  const classes = useStyles();
  const [selectedAuthor, setSelectedAuthor] = useState<string[]>([]);
  const [bookId, setBookId] = useState('');
  const [bookData, setBookData] = useState<BooksDocument>({
    name: '',
    authorName: [],
    publishedYear: 0,
    quantity: 0,
    selectedFile: '',
  });

  const allBooks = useSelector((state: AppState) => {
    return state.book.books;
  });
  const bookInfoForEdit = useSelector((state: AppState) => {
    return bookId ? state.book.books.find((book) => book._id === bookId) : null;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAuthorFromRedux());
  }, [dispatch]);

  useEffect(() => {
    if (bookInfoForEdit) {
      setBookData(bookInfoForEdit);
    }
  }, [bookInfoForEdit]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const bookDataNew = { ...bookData, authorName: selectedAuthor };
//start from here. I will add if if bookId is true
    dispatch(createBook(bookDataNew));
    clear();
  };

  const clear = () => {
    setSelectedAuthor([]);
    setBookData({
      name: '',
      authorName: [],
      publishedYear: 0,
      quantity: 0,
      selectedFile: '',
    });
  };

  console.log('bookId', bookInfoForEdit);
  return (
    <Grid container direction='column'>
      <Grid item>
        <Paper sx={{ width: '70%' }}>
          <form autoComplete='off' noValidate onSubmit={handleSubmit}>
            <Typography sx={{ m: 2 }} variant='h6'>
              Create Book
            </Typography>
            <TextField
              sx={{ m: 2, width: '70%' }}
              name='name'
              variant='outlined'
              label='Book Name'
              fullWidth
              value={bookData.name}
              onChange={(e) =>
                setBookData({ ...bookData, name: e.target.value })
              }
            />
            <TextField
              sx={{ m: 2, width: '70%' }}
              name='publishedYear'
              variant='outlined'
              label='published Year'
              type='number'
              fullWidth
              value={bookData.publishedYear}
              onChange={(e: any) =>
                setBookData({ ...bookData, publishedYear: e.target.value })
              }
            />
            <TextField
              sx={{ m: 2, width: '70%' }}
              name='amount'
              variant='outlined'
              label='Amount'
              fullWidth
              type='number'
              value={bookData.quantity}
              onChange={(e: any) =>
                setBookData({ ...bookData, quantity: e.target.value })
              }
            />
            <AuthorDropdown
              selectedAuthor={selectedAuthor}
              setSelectedAuthor={setSelectedAuthor}
            />
            <div className={classes.fileInput}>
              <FileBase
                type='file'
                multiple={false}
                onDone={({ base64 }: any) =>
                  setBookData({ ...bookData, selectedFile: base64 })
                }
              />
            </div>
            <Button
              sx={{ m: 2, width: '70%' }}
              className={classes.buttonSubmit}
              variant='contained'
              color='primary'
              size='large'
              type='submit'
              fullWidth
            >
              Save
            </Button>
            <Button
              sx={{ m: 2, width: '70%' }}
              variant='contained'
              color='secondary'
              size='small'
              onClick={clear}
              fullWidth
            >
              Clear
            </Button>
          </form>
        </Paper>
      </Grid>
      <Grid item>
        <TableForBooks allBooks={allBooks} setBookId={setBookId} />
      </Grid>
    </Grid>
  );
};

export default FormBook;
