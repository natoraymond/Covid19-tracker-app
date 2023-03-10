import React from 'react';
import './InfoBox.css';
import { Card, CardContent, Typography } from '@material-ui/core';


function InfoBox({title, cases, isRed, active, total, ...props}) {
  
  return (
    <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}>
        <CardContent>
            {/* Title i.e Coronavirus cases */}
            <Typography className='infoBox__title' color='textSecondary' gutterBottom>{title}</Typography>

            
            {/* +120K Number of cases */}
            <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>{cases}</h2>
            
            {/* 1.2M total */}
            <Typography className='infoBox__total' color='textSecondary'>
                {total} Total
            </Typography>
        </CardContent>
      
    </Card>
  );
}

export default InfoBox;
