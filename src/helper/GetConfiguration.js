import store from '../Redux/store';

export const GetDeviceConfiguration = () => {
  var storeData = store.getState();
  const deviceConf = storeData.ConfigurationReducer.Configuration.deviceList[0];
  const {screenConfigs, isTestDevice, isSAP, isAdmin, deviceMaxLogCount} = deviceConf;
  return {screenConfigs, isTestDevice, isSAP, isAdmin, deviceMaxLogCount};
};

export const GetPrinters = () => {
  var storeData = store.getState();
  const printers = storeData.ConfigurationReducer.Configuration.printerList;
  return {printers};
};
