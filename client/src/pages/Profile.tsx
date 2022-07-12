import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import { Button, CardActions } from '@mui/material';

import { fetchUserFromRedux, returnBookRedux } from '../redux/user/action';
import { BorrowedByUserType } from '../type/types';
import { AppState } from '../redux/store';
import BookInfoInProfileCard from '../components/BookInfoInProfileCard';

const Profile = () => {
  const dispatch = useDispatch();
  const { userId } = useParams() as any;

  const stateObj = useSelector((state: AppState) => {
    return state.user.user;
  });

  const returnBookHandle = (borrowId: string | undefined) => {
    if (borrowId) {
      dispatch(returnBookRedux(userId, borrowId));
    }
  };

  useEffect(() => {
    dispatch(fetchUserFromRedux(userId));
  }, [dispatch, userId]);

  console.log('bookObj profile  ', stateObj);
  // create a function called dami

  return (
    <Grid container direction='column' alignItems='center' spacing={1}>
      <Grid item sx={{ marginTop: '5em', marginBottom: '5em' }}>
        <h1>{stateObj?.name}</h1>
        <p>Your Borrowed Book List</p>
      </Grid>
      <Grid
        item
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {stateObj && stateObj.borrowedByUser.length > 0 ? (
          stateObj.borrowedByUser.map((item: BorrowedByUserType) => {
            return (
              <Grid item xs={3} sm={4} md={4} key={item.book?.name}>
                <Card sx={{ maxWidth: 250 }}>
                  <BookInfoInProfileCard item={item} />
                  <CardActions>
                    <Button
                      size='small'
                      variant='contained'
                      color='primary'
                      onClick={() => returnBookHandle(item._id)}
                    >
                      Return
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        ) : (
          <div>You have no borrowed book...</div>
        )}
      </Grid>
    </Grid>
  );
};

export default Profile;
