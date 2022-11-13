import Request from '../helper/Request';

const REQUEST_TIMEOUT = 15000;

export class BusinessBase {
  apiPorts = {logs: '9968', permission: '9970', auth: '9971', admin: '9972'};
  baseUrl = 'https://localhost:';
  requestParams = '';

  resetParams = () => {
    this.requestParams = '';
    return;
  };

  makeGetRequest = (queryParams = null) => {
    const url = `${this.baseUrl + this.requestParams}`;
    console.log(url, 'url');
    return Request.fetch(url, REQUEST_TIMEOUT, queryParams);
  };

  makePostRequest = data => {
    const url = `${this.baseUrl + this.requestParams}`;
    return Request.post(url, data, REQUEST_TIMEOUT);
  };
}
