import {BusinessBase} from './BusinessBase';

class DeviceService extends BusinessBase {
  querryHeader = '/Device';
  querry = {save: '/save'};

  GetDeviceConf = () => {
    this.requestParams = `${this.apiPorts.admin}${this.querryHeader}`;
    return this.makeGetRequest();
  };

  UpdateDeviceConfiguration = object => {
    this.requestParams = `${this.apiPorts.admin}${this.querryHeader}${this.querry.save}`;

    return this.makePostRequest(object);
  };
}

export default new DeviceService();
