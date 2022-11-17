import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Text from '../Text/Text';
import './BasicCard.scss';

export default function BasicCard({onChange, label, checkBox}) {
  const inputStyle = {width: 50, height: 25};
  return (
    <Card className="card">
      <CardContent className="cardContent" style={{flex: 1, padding: 0, display: 'flex', flexDirection: 'column'}}>
        <Text tAlign={'t'} width={'auto'} height={'auto'} label={label} mT={'0'} />
        <div className="cc">
          <div id="a" className="form-check form-switch">
            <input style={inputStyle} className="form-check-input" type="checkbox" checked={checkBox} onChange={onChange} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
