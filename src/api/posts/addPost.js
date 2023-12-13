import axios from "axios";

const addPosts = ( selectcate , postname ) => {
  const config = {
    method: "POST",
    url: "https://api.hexarz.com/v1/api/manage/blogadmin/blog/posts",
    headers: { api_key: window.localStorage.getItem('token') },
    data: {
      cata_id: selectcate,
      title: postname,
      text: "",
      description: "test",
      banner: "https://www.koalablockchain.com/wp-content/uploads/2020/03/image1-home5.png"
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

  export default addPosts;