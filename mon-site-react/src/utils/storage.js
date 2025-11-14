export const loadData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const saveData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
