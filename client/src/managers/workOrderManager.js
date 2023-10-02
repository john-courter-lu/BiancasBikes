const _apiUrl = "/api/workorder";

//Get all incomplete orders
export const getIncompleteWorkOrders = () => {
  return fetch(_apiUrl + "/incomplete").then((res) => res.json());
};

// the same:
// fetch(_apiUrl + "/incomplete")
// fetch(`${_apiUrl}/incomplete`)

//Post a new work order
export const createWorkOrder = (workOrder) => {
    return fetch(_apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workOrder),
    }).then((res) => res.json);
  };

//Update a work order
export const updateWorkOrder = (workOrder) => {
  return fetch(`${_apiUrl}/${workOrder.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workOrder),
  });
};