import apisauce from "apisauce";
import Config from "../config";

const create = (baseURL = Config.baseUrl) => {
  const api = apisauce.create({ baseURL });

  //method get
  const getItems = require("./item-list").default(api);
  const postItems = require("./item-new").default(api);
  const deleteItems = require("./item-delete").default(api);

  return {
    getItems,
    postItems,
    deleteItems
  };
};

export default {
  create
};
