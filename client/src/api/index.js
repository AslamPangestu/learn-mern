import apisauce from "apisauce";
import Config from "../config";

const create = (baseURL = Config.baseUrl) => {
  const api = apisauce.create({ baseURL });

  //Item
  const getItems = require("./item/item-list").default(api);
  const postItems = require("./item/item-new").default(api);
  const deleteItems = require("./item/item-delete").default(api);
  //Auth
  const getUser = require("./auth/user-get").default(api);
  const registerUser = require("./auth/user-register").default(api);
  const loginUser = require("./auth/user-login").default(api);

  return {
    getItems,
    postItems,
    deleteItems,
    getUser,
    registerUser,
    loginUser
  };
};

export default {
  create
};
