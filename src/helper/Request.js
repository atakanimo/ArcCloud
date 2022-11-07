import axios from 'axios';

export const PostRequest = async (url, userObject, ForceTimeoutSeconds) => {
  const cancelToken = axios.CancelToken;
  const controller = cancelToken.source();
  let response = {success: false, data: null, error: null};

  try {
    const config = {cancelToken: controller.token, timeout: ForceTimeoutSeconds};
    const data = await axios.post(url, userObject, config);

    response.success = true;
    response.data = data;
    return response;
  } catch (err) {
    response.success = false;
    response.error = err;
  }

  setTimeout(() => controller.cancel(), ForceTimeoutSeconds);
  return response;
};

export const GetRequest = async (url, ForceTimeoutSeconds) => {
  const cancelToken = axios.CancelToken;
  const controller = cancelToken.source();
  let response = {success: false, data: null, error: null};

  try {
    const config = {cancelToken: controller.token, timeout: ForceTimeoutSeconds};
    const {data} = await axios.get(url, config);
    response.success = true;
    response.data = data;
    return response;
  } catch (err) {
    response.success = false;
    response.error = err;
  }
  setTimeout(() => controller.cancel(), ForceTimeoutSeconds);
  return response;
};
