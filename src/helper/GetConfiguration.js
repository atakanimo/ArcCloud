import store from '../Redux/store';

export const GetAIs = () => {
  var storeData = store.getState();
  const AIs = storeData.ConfigurationReducer.Configuration.adminManagement.gsAIs;
  return AIs;
};

export const GetDeviceConfiguration = () => {
  var storeData = store.getState();
  const deviceConf = storeData.ConfigurationReducer.Configuration.deviceList[0];
  const {screenConfigs, isTestDevice, isSAP, isAdmin, deviceMaxLogCount} = deviceConf;
  return {screenConfigs, isTestDevice, isSAP, isAdmin, deviceMaxLogCount};
};

export const GetAdminConfiguration = () => {
  var storeData = store.getState();
  const adminConf = storeData.ConfigurationReducer.Configuration.adminManagement;
  const {serviceList, tracelinkLoginInfo, directoryAndFilePaths} = adminConf;
  return {serviceList, tracelinkLoginInfo, directoryAndFilePaths};
};
