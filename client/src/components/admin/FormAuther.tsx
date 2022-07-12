import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';

import {AuthorsDocument} from '../../type/types'
import {createAuthor} from '../../redux/author/action'

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

const FormAuthor = () => {
  const classes = useStyles();
  const [authorData, setAuthorData] = useState<AuthorsDocument>({
    name: '',
    email: ''
  });

  const dispatch = useDispatch();

  const handleSubmit = (e:any) => {
      e.preventDefault();
      dispatch(createAuthor(authorData))
      clear();
  };

  const clear = () => {
    setAuthorData({
      name: '', 
      email: ''
      })
  }
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
          label='Author Name'
          fullWidth
          value={authorData.name}
          onChange={(e) => setAuthorData({ ...authorData, name: e.target.value })}
        />
        <TextField
          sx={{ m: 2, width: '70%' }}
          name='email'
          variant='outlined'
          label='email'
          type="email"
          fullWidth
          value={authorData.email}
          onChange={(e:any) =>
            setAuthorData({ ...authorData, email: e.target.value })
          }
        />
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

export default FormAuthor;
