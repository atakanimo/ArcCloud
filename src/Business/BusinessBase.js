import Request from '../helper/Request';

const REQUEST_TIMEOUT = 15000;

export class BusinessBase {
  apiPorts = {logs: '9968', permission: '9970', auth: '9971'};
  baseUrl = 'https://localhost:';
  requestParams = '';

  resetParams = () => {
    this.requestParams = '';
    return;
  };

  makeGetRequest = () => {
    const url = `${this.baseUrl + this.requestParams}`;
    return Request.fetch(url, REQUEST_TIMEOUT);
  };

  makePostRequest = data => {
    const url = `${this.baseUrl + this.requestParams}`;
    return Request.post(url, data, REQUEST_TIMEOUT);
  };

}
