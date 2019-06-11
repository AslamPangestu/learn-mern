// eslint-disable-next-line
type Params = {};

// eslint-disable-next-line
type Response = {
  _id: String,
  name: String,
  email: String,
  date: String
};

export default api => async (params: Params): Promise<Result> => {
  const res = await api.get("auth/user", params);

  const data: Response = res.data;

  if (data !== undefined) {
    return data;
  } else {
    return {
      status: res.status,
      message: res.data.message || res.problem
    };
  }
};
