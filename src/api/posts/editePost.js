import axios from "axios";

const editePost = ( idedit , selectcate , editnamepost ) => {
  const config = {
    method: "PATCH",
    url: "https://api.hexarz.com/v1/api/manage/blogadmin/blog/posts",
    headers: { api_key: window.localStorage.getItem('token') },
    data: {
      post_id: idedit,
      cata_id: selectcate,
      title: editnamepost,
      description: "",
      text: "",
      banner: "https://www.koalablockchain.com/wp-content/uploads/2020/03/image1-home5.png",
      external_link: ""
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

  export default editePost;