export const loadState = () => {
  try {
    const serializedAuthState = localStorage.getItem('state');
    if (serializedAuthState === null) {
      return undefined;
    }
    const auth = JSON.parse(serializedAuthState);
    return ({
      auth
    })
  } catch (err) {
    return undefined;
  }
};

export const saveState = (authState) => {
  try {
    const serializedAuthState = JSON.stringify(authState);
    localStorage.setItem('state', serializedAuthState);
  } catch (err) {
    console.warn(err);
  }
};
