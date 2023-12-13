import axios from "axios";
const GetCategory = (active) => {
  const config = {
    method: "get",
    url: "https://api.hexarz.com/v1/api/manage/blogadmin/blog/catagories",

    headers: { api_key: window.localStorage.getItem("token") },
    params: {
      page: active,
      limit: 10,
    },
  };
  return new Promise((resolve, reject) => {
    axios(config)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default GetCategory;