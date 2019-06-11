const token = store => store.auth.token;
const isAuthenticated = store => store.auth.isAuthenticated;
const isLoading = store => store.auth.isLoading;
const user = store => store.auth.user;

export default {
  token,
  isAuthenticated,
  isLoading,
  user
};
