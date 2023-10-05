import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import addPostPlus from '../assets/add-post-icon-line-icon_707519-2569.avif'
import { Link } from 'react-router-dom'
import Sidebar from './sidebar';
// import { Button } from 'primereact/button';
// import { Dialog } from 'primereact/dialog';
// import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Input } from '@material-tailwind/react';
import { Skeleton } from 'primereact/skeleton';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'primereact/tooltip';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import { Select, Option } from "@material-tailwind/react";
import { Spinner } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";



function Posts() {

  const [loadingspiner, setLoadingspiner] = useState(false)
  const [selectcate, setSelectcate] = useState(null)
  const [openedit, setOpenedit] = React.useState(false);
  const handleOpenedit = () => setOpenedit(!openedit);
  const [idedit, setIdedit] = useState(null)
  const [editnamepost, setEditnamepost] = useState(null);
  const handleselectedit = (_id) => {
    setSelectcate(_id)
  }
  function handleeditnamepost(event) {
    setEditnamepost(event.target.value);
  }
  async function edititem() {
    setLoadingspiner(true);
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
    try {
      await axios(config).then(async (res) => {
        await fetchgetpost().then(() => { setOpenedit(!openedit) || setLoadingspiner(false) })
      })
    } catch (error) {
      console.log(error.toString());
      // Handle error
    }
  }
  const [opendelete, setOpendelete] = React.useState(false);
  const [iddelete, setIddelete] = useState(null)
  const handleOpendelete = () => setOpendelete(!opendelete);

  async function deletitem() {
    setLoadingspiner(true)

    const config = {
      method: "DELETE",
      url: "https://api.hexarz.com/v1/api/manage/blogadmin/blog/posts",
      headers: { api_key: window.localStorage.getItem('token') },
      params: {
        post_id: iddelete,

      }
    };
    try {
      await axios(config).then(async (res) => {
        await fetchgetpost().then(() => { handleOpendelete() || setLoadingspiner(false) })
      })

    } catch (error) {
      console.log(error.toString());
      // Handle error
    }

  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [postname, setPostname] = useState(null);
  function handlepostname(event) {
    setPostname(event.target.value);
  }
  const handleselectcatepost = (_id) => {
    setSelectcate(_id)
  }
  async function handlecreatepost() {
    setLoadingspiner(true)

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
    try {
      await axios(config).then(async (res) => {
        await fetchgetpost().then(() => { setOpen(!open) || setLoadingspiner(false) })
      })
    } catch (error) {
      console.log(error.toString());
      // Handle error
    }
  };

  const [loadingscalet, setLodingscalet] = useState(true);
  const [posts, setPosts] = useState([0, 1, 2, 3, 4, 5])
  const [postcateselect, setPostcateselect] = useState([]);

  const fetchpostid = async () => {
    const config = {
      method: "get",
      url: "https://api.hexarz.com/v1/api/manage/blogadmin/blog/catagories",
      headers: { api_key: window.localStorage.getItem('token') },
      params: {
      }
    };

    try {
      const response = await axios(config);

      setPostcateselect(response.data.data.catagories)

    } catch (error) {
      console.log(error.toString());
      // Handle error
    }
  };


  const [active, setActive] = React.useState(1);
  const [countPage , setCountpage] = useState(null)
  console.log(countPage)

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 0; i < countPage; i++) {
      pageNumbers.push(<IconButton {...getItemProps(i + 1)}>{i + 1}</IconButton>);
    }
    return pageNumbers;
  };

  const getItemProps = (index) =>
  ({
    variant: active === index ? "filled" : "text",
    color: "gray",
    onClick: () => setActive(index),

  });

  const next = () => {
    if (active === countPage) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  const fetchgetpost = async () => {
    const config = {
      method: "GET",
      url: "https://api.hexarz.com/v1/api/manage/blogadmin/blog/posts",
      headers: { api_key: window.localStorage.getItem('token') },
      params: {
        page: 1,
        limit: 10,
      }
    };

    try {
      const response = await axios(config);
      setPosts(response.data.data.Posts);
      setCountpage(Math.ceil(response.data.data.count/10))
      setLodingscalet(false)
    } catch (error) {
      console.log(error.toString());
      // Handle error
    }
  };

  useEffect(() => {

    fetchgetpost();
    fetchpostid();
  }, []);

  const [sidebarbtn, setSidebarbtn] = useState(false)
  function handleSidebar() {
    setSidebarbtn(!sidebarbtn)
  }

  return (<>
    <div className="bg-white w-full border-gray-200 dark:bg-gray-900 h-16 flex justify-between pl-5 items-center">
      <div className='w-2/12 pr-5'>
        <button onClick={handleSidebar}><i className="pi pi-align-right" style={{ fontSize: '2rem' }}></i></button>

      </div>
      <div className='w-10/12 flex justify-around items-center'>
        <div className='w-5/12'>
          <p className='font-bold text-lg bg-gradient-to-r from-[#333333] to-blue-500 bg-clip-text text-transparent'>پست ها</p>
        </div>
        <div className='w-4/12'>
          {/* <i className="pi pi-user  text-blue-500" style={{ fontSize: '2rem' }}></i> */}
        </div>

      </div>

    </div>

    <div className='flex items-center'>

      <Sidebar sidebarbtn={sidebarbtn} />

      <div className={`${sidebarbtn === true ? "w-full" : "w-10/12"} transition-all overflow-y-auto h-screen-scroll bg-[#EBEDEF]  flex flex-col gap-5`}>
        {/* <Button label="ایجاد پست جدید" icon="pi pi-plus-circle" onClick={() => setVisible(true)} className={`font-yekan w-fit mt-4 mr-4 rounded-lg flex justify-center items-center !text-white gap-2 `} /> */}
        <button onClick={handleOpen} className='w-36 mt-4 mr-4 font-bold text-base bg-green-500 flex justify-center items-center gap-1 text-white py-2 rounded-md' variant="gradient">
          پست جدید<i className="custom-target-icon pi pi-plus-circle p-text-secondary p-overlay-badge"
            style={{ color: 'white', fontSize: '1.3rem' }}></i>
        </button>

        <Dialog open={open} handler={handleOpen}>
          <DialogHeader className='font-yekan'>ایجاد پست</DialogHeader>
          <DialogBody className='flex flex-col gap-5 font-yekan' divider>
            <Input className='font-yekan' value={postname} onChange={handlepostname} label="نام پست" />
            <div className="flex w-72 flex-col font-yekan gap-6">
              <Select variant="static" label="دسته بندی">
                {
                  postcateselect.map(({ name, _id }) =>
                    <Option onClick={() => handleselectcatepost(_id)}>{name}</Option>
                  )
                }
              </Select>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span className='font-yekan text-sm font-medium'>انصراف</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handlecreatepost}>
              {loadingspiner ?
                <Spinner className="h-4 w-4" /> :
                <span className='font-yekan text-sm font-medium'>ایجاد پست</span>
              }
            </Button>
          </DialogFooter>
        </Dialog>

        {/* delete Dialog in body post */}
        <Dialog open={opendelete} handler={handleOpendelete}>
          <DialogHeader className='font-yekan flex justify-center'>آیا از حذف اطمینان دارید؟</DialogHeader>

          <DialogFooter className='flex justify-center'>
            <Button
              variant="text"
              color="red"
              onClick={handleOpendelete}
              className="mr-1"
            >
              <span className='font-yekan text-base'>خیر</span>
            </Button>
            <Button variant="gradient" color="green" onClick={deletitem}>
              {loadingspiner ?
                <Spinner className="h-4 w-4" />
                :
                <span className='font-yekan text-base'>بله</span>}
            </Button>
          </DialogFooter>
        </Dialog>

        {/* edit post tamplate */}

        <Dialog open={openedit} handler={handleOpenedit}>
          <DialogHeader className='font-yekan flex justify-center'>ویرایش پست</DialogHeader>

          <DialogBody className='flex flex-col gap-5 font-yekan' divider>
            <Input className='font-yekan' value={editnamepost} onChange={handleeditnamepost} label="نام پست جدید" />
            <div className="flex w-72 flex-col font-yekan gap-6">
              <Select variant="static" label="دسته بندی">
                {
                  postcateselect.map(({ name, _id }) =>
                    <Option onClick={() => handleselectcatepost(_id)}>{name}</Option>
                  )
                }
              </Select>
            </div>
          </DialogBody>

          <DialogFooter className='flex justify-center'>
            <Button
              variant="text"
              color="red"
              onClick={handleOpenedit}
              className="mr-1"
            >
              <span className='font-yekan text-base'>خیر</span>
            </Button>
            <Button variant="gradient" color="green" onClick={edititem}>
              {loadingspiner ?
                <Spinner className="h-4 w-4" />
                :
                <span className='font-yekan text-base'>بله</span>}
            </Button>
          </DialogFooter>
        </Dialog>

        <div className='flex items-center justify-center w-full '>
          <div className='flex flex-wrap gap-10 w-11/12 '>
            {
              posts.map(({ catagorie, title, banner, _id }, index) =>

                loadingscalet ?
                  (<div key={index} className='w-[30.54%] h-[450px] mt-8 relative bg-white rounded-lg flex justify-center '>
                    <Skeleton className='absolute w-[85%] rounded-xl -top-10' width='80%' height="20rem"></Skeleton>
                    <div className='h-[20%] w-full absolute px-6 flex gap-1 bottom-0'>
                      <div className='flex flex-col w-3/6 '>
                        <Skeleton width="8.0rem" height='1.6rem' className="mb-2"></Skeleton>
                        <Skeleton width="8.0rem" height='1.6rem' className="mb-2"></Skeleton>
                      </div>
                      <div className='flex w-3/6 justify-end items-center h-full '>
                        <Skeleton shape="circle" size="1.5rem" className="mr-2"></Skeleton>
                        <Skeleton shape="circle" size="1.5rem" className="mr-2"></Skeleton>
                        <Skeleton shape="circle" size="1.5rem" className="mr-2"></Skeleton>
                      </div>
                    </div>
                  </div>)
                  :
                  (<div key={index} className='w-[30.54%] h-[450px] mt-8 relative bg-white rounded-lg flex justify-center '>
                    <div className='absolute w-[85%] h-[85%] bg-black rounded-xl -top-10'>
                      <img src={banner} className='w-full h-full' alt="" />
                    </div>
                    <div className='h-[22%] w-full justify-between absolute px-4 flex gap-1 bottom-0'>
                      <div className='flex flex-col mt-3 gap-2 w-1/2'>
                        <p className='flex text-black gap-2 mr-3 font-semibold text-base '>نام:<span className='font-normal'>{title}</span></p>
                        <p className='flex text-black gap-2 mr-3 font-semibold flex-col text-base '>دسته بندی:
                          <span className='font-normal'>{catagorie}</span></p>
                      </div>
                      <div className='flex justify-end gap-2 mb-4 items-end w-1/2 '>
                        <Link to={`/home/posts/edit/${_id}`}>
                          <button className='w-8 h-8 flex justify-center items-center rounded-full transition duration-700 ease-in-out hover:bg-blue-gray-100 text-blue-500'>
                            <Tooltip target=".custom-target-icon" />
                            <i className="custom-target-icon pi pi-file-edit text-blue-500 p-text-secondary p-overlay-badge"
                              data-pr-tooltip="ویرایش"
                              data-pr-position="right"
                              data-pr-at="right+5 top"
                              data-pr-my="left center-2"
                              style={{ fontSize: '1.2rem' }}></i></button>
                        </Link>
                        <button onClick={() => handleOpenedit() || setIdedit(_id)} className='w-8 h-8 flex justify-center items-center rounded-full transition duration-700 ease-in-out hover:bg-blue-gray-100'>
                          <Tooltip target=".custom-target-icon" />
                          <i className="custom-target-icon pi pi-pencil p-text-secondary p-overlay-badge"
                            data-pr-tooltip="ویرایش "
                            data-pr-position="left"
                            data-pr-at="left+0 top"
                            data-pr-my="right center-2"
                            style={{ color: 'green', fontSize: '1.2rem' }}></i>
                        </button>
                        <button onClick={() => setIddelete(_id) || handleOpendelete()} className='w-8 h-8 flex justify-center items-center rounded-full transition duration-700 ease-in-out hover:bg-blue-gray-100'>
                          <Tooltip target=".custom-target-icon" />
                          <i className="custom-target-icon pi pi-trash p-text-secondary p-overlay-badge"
                            data-pr-tooltip="حذف"
                            data-pr-position="left"
                            data-pr-at="left+0 top"
                            data-pr-my="right center-2"
                            style={{ color: 'red', fontSize: '1.2rem' }}></i>
                        </button>
                      </div>
                    </div>
                  </div>)
              )
            }
          </div>
        </div>


        <div className="flex items-center justify-center gap-4">
          <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={prev}
            disabled={active === 1}
          >
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" /> Previous
          </Button>
          <div className="flex items-center gap-2 my-4">
            {getPageNumbers()}
          </div>
          <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={next}
            disabled={active === 5}
          >
            Next
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>


      </div>
    </div>
  </>);
}

export default Posts;