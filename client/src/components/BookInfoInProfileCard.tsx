import React from 'react'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, Typography } from '@mui/material';

const ProfileCard = ({item}:any) => {
const returnDate = new Date(item.returnedDate);
const today = new Date();
const diff = returnDate.getTime() - today.getTime();
const days = Math.floor(diff / (1000 * 60 * 60 * 24));
const hours = Math.floor(diff / (1000 * 60 * 60) % 24);
//const isOverdue = days < 0;

  return (
    <CardActionArea>
    <CardMedia
      component='img'
      height='auto'
      image={item.book.selectedFile}
      alt='green iguana'
    />
    <CardContent>
      <Typography gutterBottom variant='h5' component='div'>
        {item.book.name}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        Borrow Date:{' '}
        {new Date(item.receivedDate).toLocaleDateString(
          'en-US'
        )}
      </Typography>
      <Typography variant='body2' color='text.secondary'>
        Return Date:{' '}
        {new Date(item.returnedDate).toLocaleDateString(
          'en-US'
        )}
      </Typography>
      { (days < 0 || hours < 0) ? <Typography variant='h6' color='error.dark'>
        Overdue by {Math.abs(days)} days
        </Typography> : <Typography variant='h6' color='success.dark'>
        {days} days {hours} hours to return
        </Typography>}
     
    </CardContent>
  </CardActionArea>
  )
}

export default ProfileCard