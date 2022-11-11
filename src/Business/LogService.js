import {BusinessBase} from './BusinessBase';

class LogService extends BusinessBase {
  types = {
    ApiRequest: `${this.apiPorts.logs}/ApiRequestLog`,
    UserAuth: `${this.apiPorts.logs}/UserAuthenticationLog`,
    Network: `${this.apiPorts.logs}/NetworkLog`,
    Nav: `${this.apiPorts.logs}/NavigationLog`,
    Interaction: `${this.apiPorts.logs}/InteractionLog`,
  };

  GetLog = async (type, isPaging, ItemCount, PageNumber) => {
    if (isPaging) {
      this.requestParams = `${type}?IsPaging=${isPaging}&PageNumber=${PageNumber}&PageCount=${ItemCount}`;
    } else this.requestParams = type;

    return this.makeGetRequest();
  };

  GetDataByFilter = async (type, id, querry, isPaging) => {
    if (isPaging) {
      if (id) {
        this.requestParams = `${type}?id=${id}`;
        return this.makeGetRequest();
      }
      this.requestParams = querry;
    } else this.requestParams = type;

    return this.makeGetRequest();
  };
}

export default new LogService();
