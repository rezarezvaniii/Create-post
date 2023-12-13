import axios from "axios";

const editeCategory = (editnamepost , editlogopost , idedit) => {
    const config = {
        method: "PATCH",
        url: "https://api.hexarz.com/v1/api/manage/blogadmin/blog/catagories",
        headers: { api_key: window.localStorage.getItem('token') },
        data: {
          name: editnamepost,
          logo: editlogopost,
          cata_id: idedit,
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

  export default editeCategory;