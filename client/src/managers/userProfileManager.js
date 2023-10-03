const _apiUrl = "/api/userprofile";

export const getUserProfiles = () => {
  return fetch(_apiUrl).then((res) => res.json());
};

//get roles
export const getUserProfilesWithRoles = () => {
    return fetch(_apiUrl + "/withroles").then((res) => res.json());
  };

//promoting and demoting
export const promoteUser = (userId) => {
    return fetch(`${_apiUrl}/promote/${userId}`, {
      method: "POST",
    });
  };
  
  export const demoteUser = (userId) => {
    return fetch(`${_apiUrl}/demote/${userId}`, {
      method: "POST",
    });
  };