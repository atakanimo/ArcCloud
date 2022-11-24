import React, {useState} from 'react';
import Col from 'react-bootstrap/Col';
import {Box} from '@mui/material';
import {commonStyles} from '../../Styles/Styles';

import accordionsItems from './CompanyPages';

//for accordion
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';

import GetDynamicDimensions from '../../helper/GetDynamicDimensions';

export default function MyCompany() {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;

  const [expanded, setExpanded] = useState(false);

  const styles = {
    accordion: {
      height: dynamicHeight * 0.07,
      width: dynamicWidth * 0.8,
    },
    typography: {
      fontWeigth: 'bold',
      fontSize: 20,
    },
    col: {
      marginTop: 20,
    },
  };

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={commonStyles.boxStyle}>
      {accordionsItems.map((page, index) => {
        return (
          <div key={index} style={commonStyles.containerStyles}>
            <Col lg={12} style={styles.col}>
              <Accordion style={{...commonStyles.cardArea, padding: '0.3rem'}} expanded={expanded === page.id} onChange={handleChange(page.id)}>
                <AccordionSummary style={styles.accordion} expandIcon={<ExpandMoreIcon />}>
                  <Typography style={styles.typography}>{page.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>{expanded === page.id ? <page.details expanded={expanded} /> : null}</AccordionDetails>
              </Accordion>
            </Col>
          </div>
        );
      })}
    </Box>
  );
}
