import React from 'react';
import {Card} from '@mui/material';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import './Slider.scss';

export default function SliderBar({setSliderValue, sliderValue}) {
  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  return (
    <Card className="area_slider">
      <Typography id="input-slider" gutterBottom>
        Device Max Log Count
      </Typography>
      <Slider
        value={sliderValue}
        className="slider"
        aria-label="Always visible"
        onChange={handleSliderChange}
        step={5}
        valueLabelDisplay="auto"
      />
      <Typography sx={{textAlign: 'center'}} id="input-slider" gutterBottom>
        {sliderValue}
      </Typography>
    </Card>
  );
}
