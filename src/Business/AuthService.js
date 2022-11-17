import {BusinessBase} from './BusinessBase';

class AuthService extends BusinessBase {
  GetConfiguration = object => {
    this.endpoint = `${this.apiPorts.auth}/Auth/login`;

    return this.makePostRequest(object);
  };
}

export default new AuthService();
