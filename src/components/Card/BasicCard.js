import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Text from '../Text/Text';
import './BasicCard.scss';

export default function BasicCard({label, checkBox}) {
  const inputStyle = {width: 50, height: 25};
  return (
    <Card className="card">
      <CardContent className="cardContent" style={{flex: 1, padding: 0, display: 'flex', flexDirection: 'column'}}>
        <Text tAlign={'t'} width={'auto'} height={'auto'} label={label} />
        <div className="cc">
          <div id="a" class="form-check form-switch">
            <input style={inputStyle} class="form-check-input" type="checkbox" checked={checkBox} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
