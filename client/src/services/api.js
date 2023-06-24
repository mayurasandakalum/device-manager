import axios from "axios";

import { BASE_API_URL } from "../constants/constants";

const getAllDevices = () => {
  axios
    .get(`${BASE_API_URL}/devices`)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export { getAllDevices };
