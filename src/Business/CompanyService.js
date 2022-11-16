import {BusinessBase} from './BusinessBase';

class CompanyService extends BusinessBase {
  GetCompany = key => {
    this.requestParams = `${this.apiPorts.admin}/Company?Key=${key}`;
    return this.makeGetRequest();
  };

  UpdateAI = object => {
    this.requestParams = `${this.apiPorts.admin}/Company/save`;

    return this.makePostRequest(object);
  };

  DeleteAI = id => {
    this.requestParams = `${this.apiPorts.admin}/Company/delete?id=${id}`;

    return this.makePostRequest(id);
  };
}

export default new CompanyService();
