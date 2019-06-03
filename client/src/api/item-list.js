// eslint-disable-next-line
type Params = {};

// eslint-disable-next-line
type Payload = {};

type ResponseData = {
  id: string,
  name: string,
  count: string,
  date: string
};

// eslint-disable-next-line
type Response = {
  status: integer,
  message: string,
  data: ResponseData
};

type ResultData = {
  id: string,
  name: string,
  count: string,
  date: string
};

// eslint-disable-next-line
type Result = {
  status: integer,
  message: string,
  data: ResultData
};

export default api => async (params: Params): Promise<Result> => {
  const res = await api.get("items");

  const data: Response = res.data.data;

  if (res.data !== undefined) {
    return {
      status: res.data.status,
      message: res.data.message,
      data: data
    };
  } else {
    return {
      status: res.status,
      message: res.data.message || res.problem
    };
  }
};
