import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { BooksDocument } from '../../../type/types';
import RowTable from './RowTable';

type allBooksType = {
  allBooks: BooksDocument[];
  setBookId: (bookData: string) => void;
};

const TableForBooks = ({ allBooks, setBookId }: allBooksType) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Book Name</TableCell>
            <TableCell align='right'>Author Name</TableCell>
            <TableCell align='right'>Publish Year</TableCell>
            <TableCell align='right'>Quantity</TableCell>
            <TableCell align='right'>E/D</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allBooks && allBooks.map((row) => (
            <RowTable key={row._id} row={row} setBookId={setBookId} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableForBooks;
