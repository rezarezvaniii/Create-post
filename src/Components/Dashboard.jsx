import React from 'react';
import 'primeicons/primeicons.css';
import Sidebar from './sidebar';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Spinner } from "@material-tailwind/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";


function Dashboard() {

  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const config = {
      method: "get",
      url: 'https://api.hexarz.com/v1/api/manage/blogadmin/blog/dashboard',
      headers: { api_key: window.localStorage.getItem('token') },
      data: {}
    };
    try {
      const response = await axios(config);
      console.log(response)
      const dashboardObj = {
        users: response.data.data.users,
        catas: response.data.data.catas,
        posts: response.data.data.posts,
        news: response.data.data.news,

      };
      setLoading(false);
      setDashboard(dashboardObj);
    } catch (error) {
      // Handle error
    }
  };



  useEffect(() => {
    fetchData();
  }, []);





  const [sidebarbtn, setSidebarbtn] = useState(false)

  function handleSidebar() {
    setSidebarbtn(!sidebarbtn)
  }


  return (<>
    {/* <Header /> */}
    <div className="bg-white w-full border-gray-200 dark:bg-gray-900 h-16 flex justify-between pl-5 items-center">
      <div className='w-2/12 pr-5'>
        <button onClick={handleSidebar}><i className="pi pi-align-right" style={{ fontSize: '2rem' }}></i></button>
      </div>
      <div className='w-10/12 flex justify-between items-center'>
        <div>
          <p className='font-bold text-lg bg-gradient-to-r from-[#333333] to-blue-500 bg-clip-text text-transparent'>داشبورد</p>
        </div>
        <div>
          {/* <i className="pi pi-user  text-blue-500" style={{ fontSize: '2rem' }}></i> */}
        </div>

      </div>

    </div>

    <div className='flex items-center'>


      <Sidebar sidebarbtn={sidebarbtn} />

      <div className={`${sidebarbtn === true ? "w-full" : "w-10/12"} overflow-y-auto h-screen-scroll transition-all bg-[#EBEDEF] items-center flex flex-col gap-10`}>


        <div className='flex w-full justify-center gap-16 mt-20'>
          <Card className='w-[20%]'>
            <div className="flex ">
              <CardHeader
                variant="gradient"
                color='orange'
                className=" -mt-4 grid h-16 w-16 place-items-center"
              >
                {/* {icon} */}
                <i className="pi pi-google" style={{ color: 'white', fontSize: '2.5rem' }}></i>
              </CardHeader>

              <CardBody className="p-4 flex justify-center">
                <Typography variant="small" className="font-normal  font-yekan text-blue-gray-600">
                  کاربران
                </Typography>
                {/* <Typography variant="h4" color="blue-gray">
                                  {value}
                                </Typography> */}
              </CardBody>
            </div>

            {
              <CardFooter className="border-t text-center flex justify-center border-blue-gray-50 p-4">
                {loading ?
                  <Spinner className="h-4 w-4 " /> :

                  dashboard.users
                }
              </CardFooter>
            }
          </Card>

          <Card className='w-[20%]'>
            <div className="flex ">
              <CardHeader
                variant="gradient"
                color='blue'
                className=" -mt-4 grid h-16 w-16 place-items-center"
              >
                {/* {icon} */}
                <i className="pi pi-linkedin" style={{ color: 'white', fontSize: '2.5rem' }}></i>
              </CardHeader>

              <CardBody className="p-4 flex justify-center">
                <Typography variant="small" className="font-normal  font-yekan text-blue-gray-600">
                  دسته بندی ها
                </Typography>
                {/* <Typography variant="h4" color="blue-gray">
                                      {value}
                                    </Typography> */}
              </CardBody>
            </div>

            {
              <CardFooter className="border-t text-center flex justify-center border-blue-gray-50 p-4">
                {loading ?
                  <Spinner className="h-4 w-4 " /> :

                  dashboard.catas
                }
                
              </CardFooter>
            }
          </Card>

          <Card className='w-[20%]'>
            <div className="flex ">
              <CardHeader
                variant="gradient"
                color='green'
                className=" -mt-4 grid h-16 w-16 place-items-center"
              >
                {/* {icon} */}
                <i className="pi pi-github" style={{ color: 'white', fontSize: '2.5rem' }}></i>
              </CardHeader>

              <CardBody className="p-4 flex justify-center">
                <Typography variant="small" className="font-normal  font-yekan text-blue-gray-600">
                  پست ها
                </Typography>
                {/* <Typography variant="h4" color="blue-gray">
                                             {value}
                                         </Typography> */}
              </CardBody>
            </div>

            {
              <CardFooter className="border-t text-center flex justify-center border-blue-gray-50 p-4">
                {loading ?
                  <Spinner className="h-4 w-4 " /> :

                  dashboard.posts
                }
              </CardFooter>
            }
          </Card>

          <Card className='w-[20%]'>
            <div className="flex ">
              <CardHeader
                variant="gradient"
                color='pink'
                className=" -mt-4 grid h-16 w-16 place-items-center"
              >
                {/* {icon} */}
                <i className="pi pi-telegram" style={{ color: 'white', fontSize: '2.5rem' }}></i>
              </CardHeader>

              <CardBody className="p-4 flex justify-center">
                <Typography variant="small" className="font-normal  font-yekan text-blue-gray-600">
                  اخبار
                </Typography>

              </CardBody>
            </div>

            {
              <CardFooter className="border-t text-center flex justify-center border-blue-gray-50 p-4">
                {loading ?
                  <Spinner className="h-4 w-4 " /> :

                  dashboard.news
                }
              </CardFooter>
            }
          </Card>
        </div>
        {/* <div className='w-full flex justify-center mt-10 gap-16 '>
          <div className='w-[20%] px-1 relative bg-white rounded-lg flex flex-col gap-2 justify-center h-28 border-[3px] hover:border-[#0077b6] shadow-[0_5px_5px_-5px_rgba(0,0,0,0.3)]'>
            <div className='bg-gradient-to-r from-green-400 to-gray-500 absolute left-4 -top-7 px-4 py-2 rounded-lg shadow-[0_10px_60px_-15px_rgba(0,0,0,0.6)]'>
              <i className="pi pi-google" style={{ color: 'white', fontSize: '2.5rem' }}></i>
            </div>
            <p className='font-normal border-b-[1px] border-[#cccccc] text-lg text-[#555555]'>دانلودها</p>
            <span className='font-medium text-center text-base text-[#555555]'>491</span>
          </div>
          <div className='w-[20%] relative px-1 bg-white rounded-lg flex flex-col gap-2 justify-center h-28 border-[3px] hover:border-[#0077b6] shadow-[0_5px_5px_-5px_rgba(0,0,0,0.3)]'>
            <div className='absolute left-4 -top-7 bg-gradient-to-r from-red-400 to-gray-500 px-4 py-2 rounded-lg '>
              <i className="pi pi-github" style={{ color: 'white', fontSize: '2.5rem' }}></i>

            </div>
            <p className='font-normal border-b-[1px] border-[#cccccc] text-lg text-[#555555]'>کامنت ها</p>
            <span className='font-medium text-center text-base text-[#555555]'>788</span>
          </div>
          <div className='w-[20%] px-1 relative bg-white rounded-lg flex flex-col gap-2 justify-center h-28 border-[3px] hover:border-[#0077b6] shadow-[0_5px_5px_-5px_rgba(0,0,0,0.3)]'>
            <div className='absolute bg-gradient-to-r from-pink-500 to-blue-gray-400 left-4 -top-7 bg-[#A833B9] px-4 py-2 rounded-lg '>
              <i className="pi pi-linkedin" style={{ color: 'white', fontSize: '2.5rem' }}></i>
            </div>
            <p className='font-normal border-b-[1px] border-[#cccccc] text-lg text-[#555555]'>ارسال ها</p>
            <span className='font-medium text-center text-base text-[#555555]'>256</span>
          </div>
          <div className='w-[20%] px-1 relative bg-white rounded-lg flex flex-col gap-2 justify-center h-28 border-[3px] hover:border-[#0077b6] shadow-[0_5px_5px_-5px_rgba(0,0,0,0.3)]'>
            <div className='absolute bg-gradient-to-r from-deep-orange-500 to-brown-400 left-4 -top-7 bg-[#a23e48] px-4 py-2 rounded-lg '>
              <i className="pi pi-telegram" style={{ color: 'white', fontSize: '2.5rem' }}></i>
            </div>
            <p className='font-normal border-b-[1px] border-[#cccccc] text-lg text-[#555555]'>مخاطبان</p>
            <span className='font-medium text-center text-base text-[#555555]'>58</span>
          </div>
        </div> */}
        
      </div>


    </div>


  </>);
}

export default Dashboard;