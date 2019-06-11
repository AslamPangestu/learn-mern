const message = store => store.error.message;
const status = store => store.error.status;
const id = store => store.error.id;
const error = store => store.error;

export default {
  message,
  status,
  id,
  error
};
