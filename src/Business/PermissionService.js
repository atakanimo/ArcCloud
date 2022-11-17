import {BusinessBase} from './BusinessBase';

const emptyEntryObject = {
  plantId: '',
  formName: '',
  controlId: '',
  description: '',
  va: 0,
  ea: 0,
  vm: 0,
  em: 0,
  vo: 0,
  eo: 0,
  vu: 0,
  eu: 0,
  vq: 0,
  eq: 0,
  v1: 0,
  e1: 0,
  v2: 0,
  e2: 0,
  v3: 0,
  e3: 0,
  v4: 0,
  e4: 0,
  v5: 0,
  e5: 0,
  header: 0,
  dasboard: null,
  isDisplayOnList: 0,
  caption: '',
  iconCode: '',
  styleCode: '',
};

class PermissionService extends BusinessBase {
  GetPermissions = async (isPaging, ItemCount, PageNumber) => {
    if (isPaging) {
      this.endpoint = `${this.apiPorts.permission}/Permission?IsPaging=${isPaging}&PageNumber=${PageNumber}&PageCount=${ItemCount}`;
    } else this.endpoint = `${this.apiPorts.permission}/Permission`;

    const {success, data, error} = await this.makeGetRequest();
    const {list, count} = data;
    return {success, list, count, error};
  };

  ConstructEntryObject = (formName, controlId, description, editItem = null, checkBoxValues = null, isNewEntry = false) => {
    let entryObject = emptyEntryObject;
    if (isNewEntry) {
      for (const key in entryObject) {
        if (checkBoxValues[key]) {
          entryObject[key] = checkBoxValues[key];
        }
      }
      entryObject.formName = formName;
      entryObject.controlId = controlId;
      entryObject.description = description;
      entryObject.updateData = '';
      entryObject.updaterApp = '';
      entryObject.updaterUser = '';
      entryObject.updaterAppVersion = '';
    } else {
      entryObject = editItem;
      entryObject.formName = formName;
      entryObject.controlId = controlId;
      entryObject.description = description;
      entryObject.createData = '';
      entryObject.creatorApp = null;
      entryObject.creatorUser = '';
      entryObject.creatorAppVersion = null;
    }

    return entryObject;
  };

  CreateEntry = (formName, controlId, description, checkBoxValues) => {
    this.endpoint = `${this.apiPorts.permission}/Permission/add`;
    const newEntity = this.ConstructEntryObject(formName, controlId, description, null, checkBoxValues, true);

    return this.makePostRequest(newEntity);
  };

  SaveAllChanges = data => {
    this.endpoint = `${this.apiPorts.permission}/Permission/updateAll`;

    return this.makePostRequest(data);
  };

  Search = params => {
    this.endpoint = `${this.apiPorts.permission}/Permission`;

    if (params.id) return this.makeGetRequest({id: params.id});

    const validParams = {};
    for (const [key, value] of Object.entries(params)) {
      if (value) validParams[key] = value;
    }

    return this.makeGetRequest(validParams);
  };
  Delete = id => {
    this.endpoint = `${this.apiPorts.permission}/Permission/delete?id=${id}`;

    return this.makePostRequest(id);
  };
}

export default new PermissionService();
