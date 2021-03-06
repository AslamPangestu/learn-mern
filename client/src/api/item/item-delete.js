type Params = {
  id: number
};

// eslint-disable-next-line
type Item = {
  name: string,
  count: number
};

// eslint-disable-next-line
type Result = {
  status: integer,
  message: string,
  data: any
};

export default api => async (params: Params): Promise<Result> => {
  console.log("config", params.config);
  const res = await api.delete(`items/${params.id}`, null, params.config);
  console.log("Delete", res);

  if (res.data !== undefined) {
    return {
      success: res.data.success,
      status: res.data.status,
      message: res.data.message
    };
  } else {
    return {
      success: res.data.success,
      status: res.status,
      message: res.data.message || res.problem
    };
  }
};
