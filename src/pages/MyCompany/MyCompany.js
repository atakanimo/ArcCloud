import React, {useState} from 'react';
import Col from 'react-bootstrap/Col';
import {Box} from '@mui/material';
import styled from '@emotion/styled';
import {commonStyles} from '../../Styles/Styles';
import Spinner from '../../components/Spinner';

import './MyCompany.scss';
import keys from './CompanyKeys';

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

  const [loading, setLoading] = React.useState(false);
  return (
    <Box sx={commonStyles.boxStyle}>
      {keys.map((item, index) => {
        return (
          <Col key={index} lg={12} style={styles.col}>
            <div className="container_myCompany">
              <Accordion expanded={expanded === item.id} onChange={handleChange(item.id)}>
                <AccordionSummary style={styles.accordion} expandIcon={<ExpandMoreIcon />}>
                  <Typography style={styles.typography}>{item.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <item.details expanded={expanded} />
                </AccordionDetails>
              </Accordion>
            </div>
          </Col>
        );
      })}
    </Box>
  );
}

const InlineTitle = styled.h3`
  color: #495057;
`;
