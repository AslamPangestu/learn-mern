import apisauce from "apisauce";
import Config from "../config";

const create = (baseURL = Config.baseUrl) => {
  const api = apisauce.create({ baseURL });

  //method get
  const getItems = require("./item-list").default(api);

  return {
    getItems
  };
};

export default {
  create
};
