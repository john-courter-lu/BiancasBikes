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

//Complete a work order; 
//It's a POST with no body and no return, so no JSON.stringify and no .then((res) => res.json)
export const completeWorkOrder = (id) => {
  return fetch(`${_apiUrl}/${id}/complete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  });
};

//Delete an incomplete work order; 
//It's a POST with  no header, no bodyand no return, so no header, no JSON.stringify and no .then((res) => res.json)
export const deleteWorkOrder = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
    method: "DELETE"
  });
};