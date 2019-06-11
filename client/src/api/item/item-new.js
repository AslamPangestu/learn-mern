type Params = {
  name: string,
  count: number
};

// eslint-disable-next-line
type Item = {
  name: string,
  count: number
};

type Response = {
  message: string,
  status: string,
  data: any
};

// eslint-disable-next-line
type Result = {
  status: integer,
  message: string,
  data: any
};

export default api => async (params: Params): Promise<Result> => {
  let payload = { name: params.data.name, count: params.data.count };
  const res = await api.post("items", payload, params.config);

  const data: Response = res.data;

  if (res.data !== undefined) {
    return {
      success: res.data.success,
      status: res.data.status,
      message: res.data.message,
      data: data
    };
  } else {
    return {
      success: res.data.success,
      status: res.status,
      message: res.data.message || res.problem
    };
  }
};
