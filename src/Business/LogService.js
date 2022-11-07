import {BusinessBase} from './BusinessBase';
import {apiPorts} from './BusinessBase';

class LogService extends BusinessBase {
  types = {
    ApiRequest: `${apiPorts.logs}/ApiRequestLog`,
    UserAuth: `${apiPorts.logs}/UserAuthenticationLog`,
    Network: `${apiPorts.logs}/NetworkLog`,
    Nav: `${apiPorts.logs}/NavigationLog`,
    Interaction: `${apiPorts.logs}/InteractionLog`,
  };

  async GetLog(type, isPaging, ItemCount, PageNumber) {
    var url;
    if (isPaging == true) {
      url = `${type}?IsPaging=${isPaging}&PageNumber=${PageNumber}&PageCount=${ItemCount}`;
    } else url = type;

    try {
      var {success, data, error} = await super.makeGetRequest(url);
    } catch (err) {
      console.log('GetLogError', err);
    }
    return {success, data};
  }

  async GetDataByClientMessage(type, clientMessage, isPaging, ItemCount, PageNumber) {
    var url;
    if (isPaging == true) {
      url = `${type}?ClientMessage=${clientMessage}&IsPaging=${isPaging}&PageNumber=${PageNumber}&PageCount=${ItemCount}`;
    } else url = type;

    try {
      var {data, success, error} = await super.makeGetRequest(url);
    } catch (err) {
      console.log('GetLogError', err);
    }
    return {success, data};
  }
}

export default new LogService();
