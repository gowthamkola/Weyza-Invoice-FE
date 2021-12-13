
export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
}

export const saveState = (state) => {
    localStorage.setItem('userLogged', state.success);
    localStorage.setItem('token', state.token);
    localStorage.setItem('userName', state.user.username);
    localStorage.setItem('name', state.user.name);
};