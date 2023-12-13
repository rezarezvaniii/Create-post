import axios from "axios";

const getDashboard = (active) => {
    const config = {
        method: "get",
        url: 'https://api.hexarz.com/v1/api/manage/blogadmin/blog/dashboard',
        headers: { api_key: window.localStorage.getItem('token') },
        data: {}
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

export default getDashboard;