import React, {useState} from 'react';
import Card from '@mui/material/Card';
import TextInput from '../../components/TextInput';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import ButtonComponent from '../../components/Button';

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
    },
    createButton: {
      flex: 1,
    },
  };

  const [gridNumber, setGridNumber] = useState(0);
  const [info, setInfo] = useState([]);

  const onInputChange = (field, event, index) => {
    const {value} = event.target;

    setInfo({...info, [index]: {...info[index], [field]: value}});
  };

  const createCard = () => {
    var elements = [];
    for (var i = 0; i <= gridNumber; i++) {
      elements.push(
        <Card style={styles.checkboxCard}>
          <div style={styles.inputDiv}>
            <TextInput value={info.AI} onChange={text => onInputChange('AI', text, i)} label={'AI'} width={9} />
            <TextInput value={info.Description} onChange={text => onInputChange('Description', text, i)} label={'Description'} width={7} />
            <TextInput value={info.Length} onChange={text => onInputChange('Length', text, i)} label={'Length'} width={9} />
            <TextInput value={info.Format} onChange={text => onInputChange('Format', text, i)} label={'Format'} width={9} />
          </div>
          <div style={styles.createButton}>
            {i < 1 ? (
              <>
                <ButtonComponent mR={10} onClick={() => setGridNumber(gridNumber + 1)} label={'Add'} width={13} />
                <ButtonComponent onClick={() => setGridNumber(gridNumber - 1)} label={'Delete'} width={13} />
              </>
            ) : null}
          </div>
        </Card>,
      );
    }
    return elements;
  };
  return <div style={styles.cardArea}>{gridNumber >= 0 ? createCard() : null}</div>;
}
export default GS1AppIdenList;
