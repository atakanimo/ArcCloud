import React, {useState} from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextInput from '../../components/TextInput';

function GS1AppIdenList() {
  const [inputList, setInputList] = useState([]);

  const onAddButtonClick = event => {
    setInputList(inputList.concat(<GS1AppIdenList key={inputList.length} />));
  };
  return (
    <div className="cardArea_admin" style={{display: 'flex', flexDirection: 'column'}}>
      <Card className="checkboxCard_admin" style={{flexDirection: 'row', display: 'flex'}}>
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <TextInput label={'AI'} width={9} />
          <TextInput label={'Description'} width={7} />
          <TextInput label={'Length'} width={9} />
          <TextInput label={'Format'} width={9} />
        </div>
        <div className="createButtonAdmin">
          <Button
            onClick={() => {
              onAddButtonClick();
            }}
            variant="contained">
            Save
          </Button>
        </div>
      </Card>
      <div style={{display: 'flex', flexDirection: 'column'}}>{inputList}</div>
    </div>
  );
}
export default GS1AppIdenList;
