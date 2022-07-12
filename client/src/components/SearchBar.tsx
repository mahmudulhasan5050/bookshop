import { Box, TextField } from '@mui/material';

interface InputType {
  setSearchText: (text: string) => void;
}

const SearchBar = ({ setSearchText }: InputType) => {
  const searchHandle = (e: any) => {
    setSearchText(e.target.value);
  };

  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete='off'
    >
      <TextField
        id='outlined-basic'
        label='Search'
        variant='outlined'
        onChange={searchHandle}
      />
    </Box>
  );
};

export default SearchBar;
