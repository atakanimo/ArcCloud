import {BusinessBase} from './BusinessBase';

class AdminService extends BusinessBase {
  querryHeader = '/Admin';
  querry = {save: '/save', createDir: '/createDirectories', testTL: '/testTracelinkAPI', testLog: '/testLogAPI', testPrint: '/testPrintAPI'};

  GetAdminConf = () => {
    this.requestParams = `${this.apiPorts.admin}${this.querryHeader}`;
    return this.makeGetRequest();
  };

  SaveAdminConfiguration = object => {
    this.requestParams = `${this.apiPorts.admin}${this.querryHeader}${this.querry.save}`;

    return this.makePostRequest(object);
  };

  CreateDirectories = id => {
    this.requestParams = `${this.apiPorts.admin}${this.querryHeader}${this.querry.createDir}`;

    return this.makePostRequest(id);
  };
  TestTracelinkApi = tlUser => {
    this.requestParams = `${this.apiPorts.admin}${this.querryHeader}${this.querry.testTL}`;

    return this.makePostRequest(tlUser);
  };
  TestLogApi = id => {
    this.requestParams = `${this.apiPorts.admin}${this.querryHeader}${this.querry.testLog}`;

    return this.makePostRequest(id);
  };
  TestPrintApi = id => {
    this.requestParams = `${this.apiPorts.admin}${this.querryHeader}${this.querry.testPrint}`;

    return this.makePostRequest(id);
  };
}

export default new AdminService();
