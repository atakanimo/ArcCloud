import React, {useEffect, useState, useRef} from 'react';
import GetDynamicDimensions from '../../helper/GetDynamicDimensions';
import PermissionStyle from './styles';

// API
import PermissionService from '../../Business/PermissionService';

// COMPONENTS
import {TbEdit} from 'react-icons/tb';
import CheckBox from '../../components/Checkbox-Switch/Checkbox';
import PaginationContainer, { getPaginationOptions } from '../../components/PaginationContainer';
import SettingsModal from './SettingsModal';
import Spinner from '../../components/Spinner';
import TextInput from '../../components/TextInput';
import Alertify from '../../components/Alertify';

// ICONS
import CancelIcon from '../../assets/cancel.png';
import SearchIcon from '../../assets/search.png';

const {Styles, decideColumnStyles} = PermissionStyle;

const titles = ['Edit', 'ID', 'Control ID', 'Description', 'Form Name'];
const roles = ['va', 'ea', 'vm', 'em', 'vo', 'eo', 'vu', 'eu', 'vq', 'eq', 'v1', 'e1', 'e2', 'v3', 'e3', 'v4', 'e4', 'v5', 'e5'];
const allColumns = [...titles, ...roles];

const ADD_COLUMN_TEXT = 'Add New Entry';
const SAVE_TEXT = 'Save Changes';
const UNDO_TEXT = 'Undo All Changes';
const TOOLTIP_TIMEOUT_DURATION = 500;
const START_ELLIPSIS_AFTER = 30;
const MAX_TEXT_LENGTH = 32;
let TOOLTIP_TIMEOUT_ID = null;

const Permissions = () => {
  const gridElement = document.querySelector('#gridElement');
  const options = getPaginationOptions(true);
  const [screenSize] = GetDynamicDimensions();
  const {dynamicHeight, dynamicWidth} = screenSize;
  const {
    container,
    header,
    addText,
    saveText,
    undoText,
    editIcon,
    searchIcon,
    searchBtnContainer,
    editIconContainer,
    gridContainer,
    btnsContainer,
    inputsContainer,
    inputStyle,
    inputContainer,
    tooltipStyle
  } = Styles(dynamicWidth, dynamicHeight);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearched, setSearched] = useState(false);

  const [modal, setModal] = useState({trigger: false, isNew: false});
  const [tooltip, setTooltip] = useState({trigger: false, msg: null, position: { x: 0, y: 0 }});

  const [isModified, setIsModified] = useState(false);
  const [selectedRowIdx, setSelectedRowIdx] = useState(null);

  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(options[0]);
  const [itemCount, setItemCount] = useState(options[1]);

  const fetch = async () => {
    setLoading(true);
    const {success, count, list} = await PermissionService.GetPermissions(true, pageCount, page);
    if (!success) {
      Alertify.ErrorNotifications('Could not load!');
      return;
    }

    setData(list);
    setItemCount(count);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
    if(isSearched) setSearched(false);
  }, [page, pageCount]);

  const onCheckboxChange = (columnTitle, rowIndex) => {
    const checkboxValue = data[rowIndex][columnTitle];
    data[rowIndex][columnTitle] = checkboxValue === 0 ? 1 : 0;

    setData(data);
    setIsModified(true);
    return;
  };

  const undoChanges = () => {
    fetch();
    setIsModified(false);
  };

  const saveChanges = () => {
    PermissionService.SaveAllChanges(data);
    setIsModified(false);
    Alertify.SuccessNotifications('Changes saved!');
  };

  const Row = props => {
    const {item, index, row, column} = props;

    const controlIdRef = useRef();
    const descriptionRef = useRef();
    const formNameRef = useRef();

    const decideStyle = (element, idx = 1) => {
      const decideColor = rowIdx => ({backgroundColor: rowIdx % 2 === 0 ? '#FFFFFF' : '#C8C8C8'});
      return {...decideColumnStyles(element, dynamicWidth, dynamicHeight), ...decideColor(idx)};
    };

    const ellipsisText = text => text && text.length > MAX_TEXT_LENGTH ? `${text.slice(0, START_ELLIPSIS_AFTER) + '...'}` : text;

    const showTooltip = (tipMsg, elemRef) => {
      if(TOOLTIP_TIMEOUT_ID) return;
      if(tipMsg && tipMsg.length < MAX_TEXT_LENGTH) return;
      const { offsetLeft, offsetTop } = elemRef.current;
      TOOLTIP_TIMEOUT_ID = setTimeout(() => setTooltip(({ trigger: true, msg: tipMsg, position: { x: offsetLeft + 5, y: (offsetTop - gridElement.scrollTop) - 20 } })), TOOLTIP_TIMEOUT_DURATION);
      return;
    };

    const clearTooltipTimer = () => {
      if(!TOOLTIP_TIMEOUT_ID) return;
      clearTimeout(TOOLTIP_TIMEOUT_ID);
      TOOLTIP_TIMEOUT_ID = null;
      if(tooltip.trigger) setTooltip(({ trigger: false, msg: null, position: { x: 0, y: 0 }}))
      return;
    };

    const onEdit = () => {
      setSelectedRowIdx(index);
      setModal({trigger: true, isNew: false});
    };

    if (column) {
      return (
        <span key={index} style={decideStyle(item)}>
          {item.toUpperCase()}
        </span>
      );
    }

    if (row) {
      return (
        <div key={item.id} style={{display: 'flex', flexDirection: 'row'}}>
          <div style={{...decideStyle('edit', index), editIconContainer}}>
            <TbEdit onClick={onEdit} style={editIcon} />
          </div>
          <span style={decideStyle('id', index)}>{item.id}</span>
          <span ref={controlIdRef} onMouseOver={() => showTooltip(item.controlId, controlIdRef)} onMouseLeave={clearTooltipTimer} style={decideStyle('control id', index)}>{ellipsisText(item.controlId)}</span>
          <span ref={descriptionRef} onMouseOver={() => showTooltip(item.description, descriptionRef)} onMouseLeave={clearTooltipTimer} style={decideStyle('description', index)}>{ellipsisText(item.description)}</span>
          <span ref={formNameRef} onMouseOver={() => showTooltip(item.formName, formNameRef)} onMouseLeave={clearTooltipTimer} style={decideStyle('form name', index)}>{ellipsisText(item.formName)}</span>
          {roles.length > 0 &&
            roles.map(role => (
              <CheckBox
                key={role}
                checked={data[index][role] === 1 || data[index][role] === 9}
                disabled={data[index][role] === 9}
                style={decideStyle('checkbox', index)}
                onChange={() => onCheckboxChange(role, index)}
              />
            ))}
        </div>
      );
    }
  };

  const Header = () => {
    const [searchFields, setSearchFields] = useState({});
    const onTextChange = (event, field) => setSearchFields(p => ({...p, [field]: event.target.value}));

    const handleSearch = async () => {
      if (isSearched) {
        setSearchFields({});
        setSearched(false);
        setPage(1);
        return fetch();
      }

      if (!searchFields.id && !searchFields.controlId && !searchFields.formName && !searchFields.description) return null;
      const {data: result, success} = await PermissionService.Search(searchFields);

      if (!success) {
        Alertify.ErrorNotifications('No result!');
        return;
      }

      setData(result.list);
      setItemCount(result.count);
      setSearched(true);
      return;
    };

    return (
      <div style={header}>
        <div style={btnsContainer}>
          <button onClick={() => setModal({trigger: true, isNew: true})} style={addText}>
            {ADD_COLUMN_TEXT}
          </button>
          <button disabled={!isModified} onClick={() => undoChanges()} style={undoText(isModified)}>
            {UNDO_TEXT}
          </button>
          <button disabled={!isModified} onClick={() => saveChanges()} style={saveText(isModified)}>
            {SAVE_TEXT}
          </button>
        </div>
        <div style={inputsContainer}>
          <TextInput
            onChange={e => onTextChange(e, 'id')}
            containerStyle={{...inputContainer, width: dynamicWidth * 0.1}}
            inputStyle={{...inputStyle, width: dynamicWidth * 0.1}}
            label={'ID'}
          />
          <TextInput onChange={e => onTextChange(e, 'controlId')} containerStyle={inputContainer} inputStyle={inputStyle} label={'Control ID'} />
          <TextInput
            onChange={e => onTextChange(e, 'description')}
            containerStyle={inputContainer}
            inputStyle={inputStyle}
            label={'Description'}
          />
          <TextInput onChange={e => onTextChange(e, 'formName')} containerStyle={inputContainer} inputStyle={inputStyle} label={'Form Name'} />
          <button style={searchBtnContainer} onClick={handleSearch}>
            <img src={isSearched ? CancelIcon : SearchIcon} style={searchIcon} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div style={container}>
      { tooltip.trigger && <span style={tooltipStyle(tooltip.position)}>{tooltip.msg}</span>}
      <Header />
      {modal.trigger && (
        <SettingsModal
          itemToEdit={{item: data[selectedRowIdx] || null, itemIdx: selectedRowIdx || null}}
          modalInfo={{...modal, setModal}}
          setData={setData}
          setIsModified={setIsModified}
          roles={roles}
        />
      )}
      <div id='gridElement' style={gridContainer}>
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div style={{display: 'flex'}}>{allColumns.length > 0 && allColumns.map((title, i) => <Row index={i} item={title} column />)}</div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              {data.length > 0 && data.map((row, i) => <Row index={i} item={row} row />)}
            </div>
          </>
        )}
      </div>
      <PaginationContainer
        isPermissionPage
        itemCount={itemCount}
        paginationCount={pageCount}
        setPaginationCount={setPageCount}
        page={page}
        setPage={setPage}
        isModified={isModified}
      />
    </div>
  );
};

export default Permissions;
