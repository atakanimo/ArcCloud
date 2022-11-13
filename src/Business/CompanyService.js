import {BusinessBase} from './BusinessBase';

class CompanyService extends BusinessBase {
  GetAI = () => {
    this.requestParams = `${this.apiPorts.admin}/Company?Key=GS1-AI`;
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
