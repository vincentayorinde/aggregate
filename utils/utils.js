import * as dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const serverResponse = (res, code, success, data) => {
  return res.status(code).json({ success, data });
};

const serverRequest = async (method, url, data = {}) => {
  const res = await axios({
    method,
    url,
    data,
  });
  return res;
};

const getURL = () =>
  process.env.DATABASE_URL ? process.env.PROD_URL : process.env.DEV_URL;

export default {
  serverResponse,
  serverRequest,
  getURL,
};
