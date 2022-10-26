import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectLabels() {
  const [language, setLanguage] = React.useState('EN');

  const handleChange = event => {
    setLanguage(event.target.value);
  };

  return (
    <div style={{flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
      <FormControl sx={{m: 1, minWidth: 100}}>
        <InputLabel id="demo-simple-select-helper-label">Language</InputLabel>
        <Select value={language} label="Language" onChange={handleChange} required>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'EN'}>EN</MenuItem>
          <MenuItem value={'TR'}>TR</MenuItem>
        </Select>
        <FormHelperText>System Language</FormHelperText>
      </FormControl>
    </div>
  );
}
