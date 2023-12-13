import axios from "axios";

const deleteCategory = (iddelete) => {
    const config = {
        method: "DELETE",
        url: "https://api.hexarz.com/v1/api/manage/blogadmin/blog/catagories",
        headers: { api_key: window.localStorage.getItem('token') },
        params: {
          cata_id: iddelete,
  
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

  export default deleteCategory;