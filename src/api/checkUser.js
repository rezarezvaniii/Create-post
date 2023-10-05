import axios from "axios";
export const checkUser =(username, password)=> {
    const config = {
        method: "post",
        url: 'https://api.hexarz.com/v1/api/manage/blogadmin/login',
        data: {
            username: username,
            password: password
        }
    };
    return new Promise((resolve, reject) => {
        axios(config)
            .then((res) => {
                localStorage.setItem("access_token", res.data.data.token);
                
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    });
}