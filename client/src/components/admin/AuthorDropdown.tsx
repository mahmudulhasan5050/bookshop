import * as React from 'react';
import { useSelector } from 'react-redux';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import {AppState} from '../../redux/store';


type SelectedAuthorType = { 
    selectedAuthor: string[];
    setSelectedAuthor: (value: string[]) => void;
  }

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AuthorDropdown({selectedAuthor, setSelectedAuthor}:SelectedAuthorType) {
  const theme = useTheme();
  const authorNames = useSelector((state: AppState) => state.author.authors);

  const handleChange = (event: SelectChangeEvent<typeof selectedAuthor>) => {
    const {
      target: { value },
    } = event;
    setSelectedAuthor(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 400 }}>
        <InputLabel id="demo-multiple-name-label">Author</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedAuthor}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {authorNames.map((authorName) => (
            <MenuItem
              key={authorName._id}
              value={authorName._id}
              style={getStyles(authorName.name, selectedAuthor, theme)}
            >
              {authorName.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}