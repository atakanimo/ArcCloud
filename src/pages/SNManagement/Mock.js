const createValue = () => {
  const objectValue = '00300780691';
  const number = Math.floor(Math.random() * 1000) + 10;

  const value = `${objectValue}${number}`;
  return value;
};
const epc = () => {
  const type = ['GTIN-96', 'SSCC'];
  const number = Math.floor(Math.random() * 2);

  return type[number];
};
const request = () => {
  const type = ['Request Sent', 'Request Rejected'];
  const number = Math.floor(Math.random() * 2);

  return type[number];
};

const status = () => {
  const type = ['Active', 'Block', 'InActive'];
  const number = Math.floor(Math.random() * 3);

  return type[number];
};

const slot = () => {
  const number = Math.floor(Math.random() * 32);

  return number;
};

export const createData = size => {
  const item = [];

  for (let index = 0; index < size; index++) {
    item.push({
      origin: 'List',
      objectValue: createValue(),
      material: 'CCTest',
      ID: index,
      epcType: epc(),
      slot: slot(),
      filterValue: '*',
      snFrom: '0',
      snTo: '0',
      currentSNSlot: '0',
      random: '0',
      randomEU: '',
      status: status(),
      requestStatus: request(),
      interval: '5000',
      thre: '80',
      serialNumber: 'SystechSN',
      updateDate: '04-02-2020 12:33',
      creationDate: '04-02-2020 12:25',
    });
  }
  return {item};
};
