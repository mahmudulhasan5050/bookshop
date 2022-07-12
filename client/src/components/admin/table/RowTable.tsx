import React from 'react'
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';


import {BooksDocument} from '../../../type/types'
import {deleteBookRedux} from '../../../redux/book/action'


type RowType ={
  row: BooksDocument
  setBookId: (bookData: string) => void
}

const RowTable = ({row,setBookId}:RowType) => {
const dispatch = useDispatch();

const editHandle = (bookId: string|undefined) =>{
  if(bookId){setBookId(bookId)} 
}
  const deleteBookHandle = (bookId:string | undefined) => {
    if (bookId) {
   dispatch(deleteBookRedux(bookId));
    }
  }
  return (
    <TableRow
    key={row.name}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
  >
    <TableCell component="th" scope="row">
      {row.name}
    </TableCell>
    <TableCell align="right">
        {row && row.authorName?.map((item, index) => 
          <p key={index*100+1}>{item.name}</p>
          )}
    </TableCell>
    <TableCell align="right">{row.publishedYear}</TableCell>
    <TableCell align="right">{row.quantity}</TableCell>
    <TableCell align="right">
      <Button onClick={() => editHandle(row._id)}>
        EDIT
      </Button>
      <Button onClick={() => deleteBookHandle(row._id)}>
        <DeleteIcon/>
      </Button>
    </TableCell>
  </TableRow>
  )
}

export default RowTable