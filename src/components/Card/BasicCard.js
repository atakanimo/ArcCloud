import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './BasicCard.scss';

export default function BasicCard({label}) {
  return (
    <Card className="card">
      <CardContent className="cardContent" style={{flex: 1, padding: 0, display: 'flex', flexDirection: 'column'}}>
        <Typography style={{fontSize: 16, textAlign: 'center'}}>{label}</Typography>
        <div className="cc">
          <div id="a" class="form-check form-switch">
            <input style={{width: 40, height: 20}} class="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
