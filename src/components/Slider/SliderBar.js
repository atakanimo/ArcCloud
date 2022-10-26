import React from 'react';
import {Card} from '@mui/material';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import './Slider.scss';

export default function SliderBar() {
  const [value, setValue] = React.useState(30);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card className="area">
      <Typography id="input-slider" gutterBottom>
        Device Max Log Count
      </Typography>
      <Slider className="slider" aria-label="Always visible" onChange={handleSliderChange} step={5} valueLabelDisplay="auto" />
      <Typography sx={{textAlign: 'center'}} id="input-slider" gutterBottom>
        {value}
      </Typography>
    </Card>
  );
}
