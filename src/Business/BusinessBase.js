import {GetRequest} from '../helper/Request';

var baseUrl = 'https://localhost:';
export var apiPorts = {
  logs: '9968',
  permission: '9970',
};

export class BusinessBase {
  makeGetRequest(port, timeout = 15000) {
    var url = `${baseUrl + port}`;
    return GetRequest(url, timeout);
  }
}
