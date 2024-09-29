import axios from "axios";

export const sendRequestsInParallel = async (
  endpoint: string,
  payload: any
) => {
  const urls = payload.urls || [];
  const filters = payload.filters || {};
  const requests = urls.map((url: string) =>
    axios.post(endpoint, {
      url,
      ...filters,
    })
  );

  const results = await Promise.allSettled(requests);

  // Structure the result object
  const resultObject: {
    success: any[];
    error: any[];
  } = {
    success: [],
    error: [],
  };

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      resultObject.success.push({
        url: urls[index],
        data: result.value.data,
      });
    } else {
      resultObject.error.push({
        url: urls[index],
        error: result.reason.response.data,
      });
    }
  });

  return { data: resultObject };
};
