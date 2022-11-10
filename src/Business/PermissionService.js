import {BusinessBase} from './BusinessBase';

const additionalInfo = { 
  "creatorUser": "",
  "createDate": "",
  "creatorApp": null,
  "creatorAppVersion": null,
  "updaterUser": "",
  "updateDate": "",
  "updaterApp": "",
  "updaterAppVersion": ""
}

const emptyEntryObject = {
  "plantId": "",
  "formName": "",
  "controlId": "",
  "description": "",
  "va": 0,
  "ea": 0,
  "vm": 0,
  "em": 0,
  "vo": 0,
  "eo": 0,
  "vu": 0,
  "eu": 0,
  "vq": 0,
  "eq": 0,
  "v1": 0,
  "e1": 0,
  "v2": 0,
  "e2": 0,
  "v3": 0,
  "e3": 0,
  "v4": 0,
  "e4": 0,
  "v5": 0,
  "e5": 0,
  "header": 0,
  "dasboard": null,
  "isDisplayOnList": 0,
  "caption": "",
  "iconCode": "",
  "styleCode": ""
};

class PermissionService extends BusinessBase {
  GetPermissions = (isPaging, ItemCount, PageNumber) => {
    if (isPaging) {
      this.requestParams = `${this.apiPorts.permission}/Permission?IsPaging=${isPaging}&PageNumber=${PageNumber}&PageCount=${ItemCount}`;
    } else this.requestParams = `${this.apiPorts.permission}/Permission`;

    return this.makeGetRequest();
  }

  GetPermissionsByFormName = (formName, isPaging, ItemCount, PageNumber) => {
    if (isPaging) {
      this.requestParams = `${this.apiPorts.permission}/Permission?FormName=${formName}&IsPaging=${isPaging}&PageNumber=${PageNumber}&PageCount=${ItemCount}`;
    }

    return this.makeGetRequest();
  }

  ConstructEntryObject = (formName, controlId, description, editItem = null, isNewEntry = false) => {
    let entryObject = emptyEntryObject;

    if(isNewEntry) {
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
  }

  CreateEntry = (formName, controlId, description) => {
    this.requestParams = `${this.apiPorts.permission}/Permission`;
    const newEntity = this.ConstructEntryObject(formName, controlId, description, null, true);

    return this.makePostRequest(newEntity);
  }

  SaveAllChanges = data => {
    this.requestParams = `${this.apiPorts.permission}/Permission`;

    return this.makeUpdateRequest(data);
  }
}

export default new PermissionService();
