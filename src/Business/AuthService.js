import {BusinessBase} from './BusinessBase';

class AuthService extends BusinessBase {
  GetConfiguration = object => {
    this.requestParams = `${this.apiPorts.auth}/Auth/login`;

    return this.makePostRequest(object);
  };
}

export default new AuthService();
