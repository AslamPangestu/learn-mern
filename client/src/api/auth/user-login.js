type Params = {
  email: string,
  password: string
};

// eslint-disable-next-line
type Item = {
  email: string,
  password: string
};

type Response = {
  message: string,
  token: string
};

// eslint-disable-next-line
type Result = {
  message: string,
  token: string
};

export default api => async (params: Params): Promise<Result> => {
  const res = await api.post("auth", params.body, params.config);

  const data: Response = res.data;

  if (res.data !== undefined) {
    return {
      message: res.data.message,
      token: data.token,
      user: data.user
    };
  } else {
    return {
      success: res.data.success,
      status: res.status,
      message: res.data.message || res.problem
    };
  }
};
