//get local data
export const getLocalData = async (name) => {
  const data = localStorage.getItem(name);
  return await JSON.parse(data);
};

//set local data
export const setLocalData = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};

//remove local data
export const removeLocalData = (name) => {
  localStorage.removeItem(name);
};
