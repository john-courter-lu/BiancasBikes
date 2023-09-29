const apiUrl = "/api/bike";

export const getBikes = () => {
  return fetch(apiUrl).then((res) => res.json());
};

export const getBikeById = (id) => {
  return fetch(`${apiUrl}/${id}`).then((res) => res.json());
};

export const getBikesInShopCount = () => {
  return fetch(`${apiUrl}/inventory`).then((res) => res.json());
};
