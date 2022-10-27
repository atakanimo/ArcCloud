import React, {useState} from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextInput from '../../components/TextInput';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';

function GS1AppIdenList() {
  const [screenSize, getDimension] = GetDynamicDimensions();
  const {dynamicWidth, dynamicHeight} = screenSize;

  const styles = {
    inputDiv: {display: 'flex', flexDirection: 'row'},
    cardArea: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      paddingTop: 0,
      marginBottom: 10,
    },
    checkboxCard: {
      justifyContent: 'center',
      display: 'flex',
      flexDirection: 'row',
      padding: 16,
      borderRadius: 5,
      width: 'auto',
      minWidth: dynamicWidth / 10,
      marginTop: 16,
      height: 'auto',
      // max-height: 40vh;
    },
    createButton: {
      display: 'flex',
      flex: 1,
      alignItems: 'flex-end',
    },
  };

  const [inputList, setInputList] = useState([]);

  const onAddButtonClick = event => {
    setInputList(inputList.concat(<GS1AppIdenList key={inputList.length} />));
  };
  return (
    <div style={styles.cardArea}>
      <Card style={styles.checkboxCard}>
        <div style={styles.inputDiv}>
          <TextInput label={'AI'} width={9} />
          <TextInput label={'Description'} width={7} />
          <TextInput label={'Length'} width={9} />
          <TextInput label={'Format'} width={9} />
        </div>
        <div style={styles.createButton}>
          <Button onClick={() => onAddButtonClick()} variant="contained">
            Save
          </Button>
        </div>
      </Card>
      <div style={{display: 'flex', flexDirection: 'column'}}>{inputList}</div>
    </div>
  );
}
export default GS1AppIdenList;
