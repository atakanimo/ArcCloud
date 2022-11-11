import axios from 'axios';

const post = async (url, dataToSend, ForceTimeoutSeconds) => {
  const cancelToken = axios.CancelToken;
  const controller = cancelToken.source();
  let result = {success: false, data: null, error: null};

  try {
    const config = {cancelToken: controller.token, timeout: ForceTimeoutSeconds};
    const response = await axios.post(url, dataToSend, config);

    result.success = true;
    result.data = response.data;
    return result;
  } catch (err) {
    result.success = false;
    result.error = err;
  }

  setTimeout(() => controller.cancel(), ForceTimeoutSeconds);
  return result;
};

const fetch = async (url, ForceTimeoutSeconds, params) => {
  const cancelToken = axios.CancelToken;
  const controller = cancelToken.source();
  let result = {success: false, data: null, error: null};

  try {
    const config = {cancelToken: controller.token, timeout: ForceTimeoutSeconds, params};
    const response = await axios.get(url, config);
    result.success = true;
    result.data = response.data;
    return result;
  } catch (err) {
    result.success = false;
    result.error = err;
  }
  setTimeout(() => controller.cancel(), ForceTimeoutSeconds);
  return result;
};

export default { fetch, post };