import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material';

import { BooksDocument } from '../type/types';

interface HomeCardType {
  book: BooksDocument;
}

const HomeCard = ({ book }: HomeCardType) => {
  //console.log("book from card",book);
  return (
    <Card sx={{ maxWidth: 345 }} key={book.name}>
      <CardMedia
        component='img'
        alt='book pic'
        height='140'
        image={book.selectedFile}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {book.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {book.publishedYear}
        </Typography>

        {book?.authorName?.map((author, index) => {
          return (
            <Typography
              style={{ display: 'inline-block' }}
              variant='body2'
              color='text.secondary'
              key={author._id}
            >
              {index > 0 ? '&' + author.name : author.name}
            </Typography>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default HomeCard;
