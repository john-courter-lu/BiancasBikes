const _apiUrl = "/api/userprofile";

export const getUserProfiles = () => {
  return fetch(_apiUrl).then((res) => res.json());
};