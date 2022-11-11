const decideColumnStyles = (columnName, width, height) => {
  const defaultStyle = {
    minWidth: width * 0.03,
    borderWidth: 1,
    borderStyle: 'solid',
    height: 30,
    fontSize: 13,
    fontWeight: '500',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  };

  switch(columnName.toLowerCase()) {
    case "edit":
      return { ...defaultStyle, minWidth: (width * 0.1) * 0.5, borderLeftWidth: 0};
    case "id":
      return { ...defaultStyle, minWidth: (width * 0.1) * 0.5};
    case "control id":
      return { ...defaultStyle, minWidth: (width * 0.1) * 1.5};
    case "form name":
      return { ...defaultStyle, minWidth: (width * 0.1) * 2};
    case "description":
      return { ...defaultStyle, minWidth: (width * 0.1) * 2};
    default:
      return defaultStyle;
  }
}

const Styles = (width, height) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height
  },
  gridContainer: {
    height,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'scroll',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    height: height * 0.15,
    // marginBottom: 10
  },
  btnsContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: height * 0.15,
    alignItems: 'center',
  },
  inputsContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: height * 0.15
  },
  inputContainer: {
    width: width * 0.215,
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5
  },
  inputStyle: {
    width: width * 0.215
  },
  addText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.1,
    height: 40,
    fontSize: 14,
    fontWeight: '600',
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: 'green',
    color: 'white',
    margin: 5
  },
  saveText: hasChanged => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.1,
    height: 40,
    fontSize: 14,
    fontWeight: '600',
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: 'green',
    color: 'white',
    marginLeft: 10,
    opacity: hasChanged ? 1 : 0.5
  }),
  undoText: hasChanged => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.1,
    height: 40,
    fontSize: 14,
    fontWeight: '600',
    borderWidth: 0,
    borderRadius: 5,
    backgroundColor: 'green',
    color: 'white',
    marginLeft: width * 0.514,
    opacity: hasChanged ? 1 : 0.5
  }),
  editIcon: {
    width: 25,
    height: 25,
    color: 'black',
  },
  searchInput: {
    width: width * 0.3,
    height: 40,
    backgroundColor: 'white',
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#C8C8C8',
  },
  searchIcon: {
    width: 30,
    height: 30,
  },
  searchBtnContainer: {
    width: width * 0.05,
    height: 40,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#C8C8C8',
  }
});

export default { Styles, decideColumnStyles }
