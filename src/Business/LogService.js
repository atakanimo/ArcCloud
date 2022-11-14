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
    const {success, data, error} = await this.makeGetRequest();
    const {list, count} = data;
    return {success, list, count, error};
  };

  GetDataByFilter = async (type, id, querry, isPaging) => {
    if (isPaging) {
      if (id) {
        this.requestParams = `${type}?id=${id}`;
        const {success, data, error} = await this.makeGetRequest();
        const {list, count} = data;

        return {success, list, count, error};
      }
      this.requestParams = querry;
    } else this.requestParams = type;

    const {success, data, error} = await this.makeGetRequest();
    const {list, count} = data;
    return {success, list, count, error};
  };
}

export default new LogService();
