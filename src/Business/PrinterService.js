import {BusinessBase} from './BusinessBase';

class PrinterService extends BusinessBase {
  querryHeader = '/Printer';
  querry = {save: '/save'};

  GetPrinter = async () => {
    this.requestParams = `${this.apiPorts.admin}${this.querryHeader}`;

    const {success, data, error} = await this.makeGetRequest();
    const {list, count} = data;
    return {success, count, list, error};
  };

  UpdatePrinter = async object => {
    this.requestParams = `${this.apiPorts.admin}${this.querryHeader}${this.querry.save}`;

    const {success, data, error} = await this.makePostRequest(object);

    return {success, data, error};
  };
}

export default new PrinterService();
