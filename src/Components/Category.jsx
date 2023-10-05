import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import { Link } from "react-router-dom"
import Sidebar from './sidebar';
import { DataTable } from 'primereact/datatable';
// import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Spinner } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
  Input
} from "@material-tailwind/react";
import moment from "moment-jalaali";
import GetCategory from "../api/GetCategory"
// import { CustomerService } from './service/CustomerService';
function Category() {
  // pageination body
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);
  const [openedit, setOpenedit] = React.useState(false);
  const handleOpenedit = () => setOpenedit(!openedit);
  const [idedit, setIdedit] = useState(null)
  const [editnamepost, setEditnamepost] = useState(null);
  const [editlogopost, setLogopost] = useState(null)
  function handleeditnamepost(event) {
    setEditnamepost(event.target.value);
  }

  function handleeditlogopost(event) {
    setLogopost(event.target.value);
  }

  async function edititem() {
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

    try {
      await axios(config).then(async (res) => {
        console.log("res:", res)
        await fetchListusers().then(() => { setOpenedit(!openedit) })
      })


    } catch (error) {
      console.log(error.toString());
      // Handle error
    }


  }






  const [opendelete, setOpendelete] = React.useState(false);

  const handleOpendelete = () => setOpendelete(!opendelete);

  const [iddelete, setIddelete] = useState(null)

  async function deletitem() {
    setLoadingspiner(true)

    const config = {
      method: "DELETE",
      url: "https://api.hexarz.com/v1/api/manage/blogadmin/blog/catagories",
      headers: { api_key: window.localStorage.getItem('token') },
      params: {
        cata_id: iddelete,

      }
    };

    try {
      await axios(config).then(async (res) => {
        await fetchListusers().then(() => { setOpendelete(!opendelete) || setLoadingspiner(false) })
      })

    } catch (error) {
      console.log(error.toString());
      // Handle error
    }

  }





  const [sidebarbtn, setSidebarbtn] = useState(false)

  function handleSidebar() {
    setSidebarbtn(!sidebarbtn)
  }



  const [loadingspiner, setLoadingspiner] = useState(false)
  const [postname, setPostname] = useState(null);
  const [catepost, setCatepost] = useState(null);






  async function handleClick() {
    setLoadingspiner(true)

    setCatepost(null);
    setPostname(null);


    const config = {
      method: "post",
      url: "https://api.hexarz.com/v1/api/manage/blogadmin/blog/catagories",
      headers: { api_key: window.localStorage.getItem('token') },
      data: {
        name: postname,
        logo: catepost,
      }
    };

    try {
      await axios(config).then(async (res) => {
        await fetchListusers().then(() => { setOpen(!open) || setLoadingspiner(false) })
      })


    } catch (error) {
      console.log(error.toString());
      // Handle error
    }

  };

  function handlepostname(event) {
    setPostname(event.target.value);
  }

  function handlepostcate(event) {
    setCatepost(event.target.value);
  }


  const [active, setActive] = React.useState(1);
  const [countPage , setCountpage] = useState(null)

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 0; i < countPage; i++) {
      pageNumbers.push(<IconButton {...getItemProps(i + 1)}>{i + 1}</IconButton>);
    }
    return pageNumbers;
  };





  console.log(countPage)
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


  const [responsed, setResponsed] = useState([]);
  const [loadingall, setLoadingall] = useState(false);
  console.log(loadingall)
  const fetchListusers = async () => {
    // const url = `https://api.hexarz.com/v1/api/manage/admin/users/list?page=${first}` ;
    const config = {
      method: "get",
      url: "https://api.hexarz.com/v1/api/manage/blogadmin/blog/catagories",
      headers: { api_key: window.localStorage.getItem('token') },
      params: {
        page: active,
        limit: 10,
      }
    };

    try {
      setLoadingall(true)
      const response = await axios(config);
      setResponsed(response.data.data.catagories)
      setCountpage(Math.ceil(response.data.data.count/10))
      setLoadingall(false)

    } catch (error) {
      console.log(error.toString());
      // Handle error
    }
  };


  useEffect(() => {

    fetchListusers();

    // GetCategory(active).then(res => {
    //   setResponsed(res.data.data.catagories)
    // }).catch(err => {
    //   console.log(err.toString());

    // })
  }, [active]);




  return (<>

    {/* <Header /> */}


    <div className="bg-white w-full border-gray-200 dark:bg-gray-900 h-16 flex justify-between pl-5 items-center">
      <div className='w-2/12 pr-5'>
        <button onClick={handleSidebar}><i className="pi pi-align-right" style={{ fontSize: '2rem' }}></i></button>

      </div>
      <div className='w-10/12 flex justify-between items-center'>
        <div className='w-5/12'>
          <p className='font-bold text-lg bg-gradient-to-r from-[#333333] to-blue-500 bg-clip-text text-transparent'>دسته بندی ها</p>
        </div>
        <div>
          {/* <i className="pi pi-user  text-blue-500" style={{ fontSize: '2rem' }}></i> */}
        </div>

      </div>

    </div>

    <div className='flex '>
      <Sidebar sidebarbtn={sidebarbtn} />

      <div className={`${sidebarbtn === true ? "w-full" : "w-10/12"} bg-[#EBEDEF] scrollbar transition-all overflow-y-auto h-screen-scroll`}>


        <button onClick={handleOpen} className='w-36 mt-4 mr-4 font-bold text-base bg-blue-500 flex justify-center items-center gap-1 text-white py-2 rounded-md' variant="gradient">
          دسته بندی جدید <i className="custom-target-icon pi pi-plus-circle p-text-secondary p-overlay-badge"
            style={{ color: 'white', fontSize: '1.3rem' }}></i>
        </button>

        <Dialog open={open} handler={handleOpen}>
          <DialogHeader className='font-yekan'>ایجاد پست</DialogHeader>
          <DialogBody className='flex flex-col gap-5 font-yekan' divider>
            <Input className='font-yekan' value={catepost} onChange={handlepostcate} label="نام پست" />
            <Input className='font-yekan' value={postname} onChange={handlepostname} label='دسته بندی' />
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
            <Button variant="gradient" className='w-28 flex justify-center' color="green" onClick={handleClick}>
              {loadingspiner ?
                <Spinner className="h-4 w-4" />
                :
                <span className='font-yekan text-sm font-medium'>ایجاد پست</span>}
            </Button>
          </DialogFooter>
        </Dialog>



        {/* Dialog 2 in body */}

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


        {/* edit dialog body step3 */}

        <Dialog open={openedit} handler={handleOpenedit}>
          <DialogHeader className='font-yekan flex justify-center'>ویرایش دسته  بندی</DialogHeader>

          <DialogBody className='flex flex-col gap-5 font-yekan font-bold' divider>
            <Input className='font-yekan' value={editnamepost} onChange={handleeditnamepost} label="نام پست" />
            <Input className='font-yekan' value={editlogopost} onChange={handleeditlogopost} label='دسته بندی' />
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




        {/* <DataTable className='flex justify-center' dir='ltr' value={data} tableStyle={{ minWidth: '50rem' }}>
                        <Column className='' field="fuck" dir='ltr' header="Code"></Column>
                        <Column className='' dir='ltr' field="name" header="Name"></Column>
                        <Column className='' dir='ltr' field="categoeis" header="Category"></Column>
                        <Column className='' dir='ltr' field="hello" header="Quantity"></Column>
                        </DataTable>
                      */}


        {/* <div className="card" dir='rtl'>
                    <DataTable dir='rtl' value={data} paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: '50rem' }}>
                    <Column className='classmargine' dir='rtl' field="name" header="نام" style={{ width: '25%' }}></Column>
                    <Column className='classmargine' dir='rtl' field="fuck" header="نام خانوادگی" style={{ width: '25%' }}></Column>
                    <Column className='classmargine' dir='rtl' field="categoeis" header="شرکت" style={{ width: '25%' }}></Column>
                    <Column className='classmargine' dir='rtl' field="hello" header="تاریخ" style={{ width: '25%' }}></Column>
                    <Column className='classmargine' dir='rtl' header="تاریخ" style={{ width: '25%' }}></Column>
                    </DataTable>
                  </div> */}


        <Card className="overflow-hidden scrollbar w-11/12 mt-5 mx-auto">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex bg-[#1e88e5] rounded-b-none items-center justify-between p-6"
          >
            <div >
              <Typography variant="h6" color="blue-gray" className="mb-1 font-bold font-yekan text-lg text-white">
                لیست دسته بندی ها
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >
              </Typography>
            </div>

          </CardHeader>






          <CardBody className="relative h-screen-cate px-0 pt-0 pb-2">
            {
              <table className="w-full min-w-[640px] table-auto">
                <thead className="bg-[#F6F7F8] rounded-t-lg">
                  <tr >
                    {["لوگو", "نام", "تاریخ ساخت", "آپشن ها"].map(
                      (el) => (
                        <th
                          key={el}
                          className="border-b font-yekan border-[#bbbbbb] py-3 px-6"
                        >
                          <Typography
                            variant="small"
                            className="text-[16px] font-yekan font-bold uppercase text-blue-gray-400"
                          >
                            {el}
                          </Typography>
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>

                  {
                    loadingall ?
                      <div className='flex justify-center w-full absolute h-full items-center'>

                        <Spinner className="h-16 w-16 left-0 text-gray-900/50" />
                      </div>
                      :
                      responsed.map(
                        ({ name, logo, createdAt, _id }, key) => {

                          const className = `py-3 px-5 ${key === responsed.length - 1
                            ? ""
                            : "border-b border-[#bbbbbb]"
                            }`;
                          return (
                            <tr key={key}>
                              <td className={className}>
                                <div className="flex items-center justify-center gap-4">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-bold font-yekan"
                                  >
                                    {logo}
                                  </Typography>
                                </div>
                              </td>
                              <td className={className}>
                                <div className="w-10/12 flex justify-center">

                                  {name}

                                </div>
                              </td>
                              <td className={className}>
                                <div className="w-10/12">
                                  <Typography
                                    variant="small"
                                    className="mb-1 text-center flex justify-center text-xs font-medium text-blue-gray-600"
                                  >
                                    {moment(createdAt).format('jYYYY/jMM/jDD hh:mm')}
                                  </Typography>

                                </div>
                              </td>

                              <td className={className}>
                                <div className="flex items-center justify-center gap-2">

                                  {/* <button onClick={() => handleOpendelete() || setIddelete(_id)} className="rounded-md text-white bg-red-500 w-16 font-medium p-2">حذف</button> */}
                                  <button onClick={() => handleOpenedit() || setIdedit(_id)} className='w-8 h-8 flex justify-center items-center rounded-full transition duration-700 ease-in-out hover:bg-blue-gray-100'>
                                    <i className="custom-target-icon pi pi-file-edit p-text-secondary p-overlay-badge"
                                      style={{ color: 'green', fontSize: '1.2rem' }}></i>
                                  </button>

                                  <button onClick={() => handleOpendelete() || setIddelete(_id)} className='w-8 h-8 flex justify-center items-center rounded-full transition duration-700 ease-in-out hover:bg-blue-gray-100'>
                                    <i className="custom-target-icon pi pi-trash p-text-secondary p-overlay-badge"
                                      style={{ color: 'red', fontSize: '1.2rem' }}></i>
                                  </button>
                                  {/* <button onClick={() => handleOpenedit() || setIdedit(_id)} className="rounded-md text-white bg-green-600 w-16 font-medium p-2">ویرایش</button> */}

                                  <div className="card flex flex-wrap gap-2 items-center justify-content-center">

                                  </div>

                                  {/* <button className="rounded-md text-white bg-[#E22E6D] w-16 font-medium p-2">بلاک</button>
                                  <button className="rounded-md text-white bg-[#53AD57] w-16 font-medium p-2">آنبلاک</button> */}
                                </div>
                              </td>



                            </tr>
                          )
                        })
                  }
                </tbody>
              </table>

            }
            <div dir="ltr" className="card">
              {/* <Paginator first={first} rows={rows} totalRecords={currentPage * 10} onPageChange={onPageChange} /> */}
            </div>

          </CardBody>

          <div className="flex gap-5 justify-center">
            {/* <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button> */}
            {/* <span>{currentPage}</span> */}
            {/* <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button> */}

          </div>
        </Card>






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

            {/* <IconButton {...getItemProps(1)}>1</IconButton>
            <IconButton {...getItemProps(2)}>2</IconButton>
            <IconButton {...getItemProps(3)}>3</IconButton>
            <IconButton {...getItemProps(4)}>4</IconButton>
            <IconButton {...getItemProps(5)}>5</IconButton> */}
           
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

export default Category;