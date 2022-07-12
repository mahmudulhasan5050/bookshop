import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { BookAndUser } from '../redux/borrowBook/action';
import {borrowBookRedux} from '../redux/borrowBook/action'
import { AppState } from '../redux/store';
import {BorrowInfoType} from '../type/types';

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

const BorrowBookForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [returnDateState, setReturnDateState] = useState(new Date());
  const today = new Date();
  const bookUser: BookAndUser | null = useSelector((state: AppState) => {
    return state.borrow.bookAndUser;
  });

  const borrowData: BorrowInfoType = {
    bookId: bookUser?.book?._id,
    userId: bookUser?.user?._id,
    borrowDate: today,
    returnDate: returnDateState,
  };

  //const dispatch = useDispatch();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(borrowBookRedux(borrowData))
    navigate('/')
  };

  return (
    <Paper sx={{ width: '70%' }}>
      <form autoComplete='off' noValidate onSubmit={handleSubmit}>
        <Typography sx={{ m: 2 }} variant='h6'>
          User Registration
        </Typography>
        <TextField
          sx={{ m: 2, width: '70%' }}
          name='name'
          variant='outlined'
          label='Borrowed By'
          fullWidth
          value={bookUser?.user?.name}
        />
        <TextField
          sx={{ m: 2, width: '70%' }}
          name='name'
          variant='outlined'
          label='Book Name'
          type='text'
          fullWidth
          value={bookUser?.book?.name}
        />
        <Typography>Return Date</Typography>
        <Calendar onChange={setReturnDateState} value={returnDateState} />

        <Button
          sx={{ m: 2, width: '70%' }}
          className={classes.buttonSubmit}
          variant='contained'
          color='primary'
          size='large'
          type='submit'
          fullWidth
        >
          Submit
        </Button>
        <Button
          sx={{ m: 2, width: '70%' }}
          variant='contained'
          color='secondary'
          size='small'
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default BorrowBookForm;
