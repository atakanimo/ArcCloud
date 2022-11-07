import {BusinessBase} from './BusinessBase';
import {apiPorts} from './BusinessBase';

class PermissionService extends BusinessBase {
  async GetPermissions(isPaging, ItemCount, PageNumber) {
    var url;
    if (isPaging == true) {
      url = `${apiPorts.permission}/Permission?IsPaging=${isPaging}&PageNumber=${PageNumber}&PageCount=${ItemCount}`;
    } else url = `${apiPorts.permission}/Permission`;

    try {
      var {data, error} = await super.makeGetRequest(url);
    } catch (err) {
      console.log('GetPermissions', err);
    }
    return {data};
  }
  async GetPermissionsByFormName(formName, isPaging, ItemCount, PageNumber) {
    var url;
    if (isPaging == true) {
      url = `${apiPorts.permission}/Permission?FormName=${formName}&IsPaging=${isPaging}&PageNumber=${PageNumber}&PageCount=${ItemCount}`;
    } 
    // else url = type;

    try {
      var {data, error} = await super.makeGetRequest(url);
    } catch (err) {
      console.log('GetPermissions', err);
    }
    return {data};
  }
}

export default new PermissionService();
