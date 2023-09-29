const _apiUrl = "/api/workorder";

export const getIncompleteWorkOrders = () => {
  return fetch(_apiUrl + "/incomplete").then((res) => res.json());
};

// the same:
// fetch(_apiUrl + "/incomplete")
// fetch(`${_apiUrl}/incomplete`)