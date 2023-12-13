import axios from "axios";

const getPosts = (active) => {
    const config = {
        method: "GET",
        url: "https://api.hexarz.com/v1/api/manage/blogadmin/blog/posts",
        headers: { api_key: window.localStorage.getItem('token') },
        params: {
          page: active,
          limit: 10,
        }
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

export default getPosts;