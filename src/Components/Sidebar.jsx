import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ sidebarbtn }) {


const locationWindow = window.location.pathname

  return (
    <>
      <div
        className={`${
          sidebarbtn === true ? 'w-[5%]' : 'w-2/12'
        } transition-all bg-white h-screen-scroll flex flex-col items-center pt-16 gap-6`}
      >
        <Link className="w-full flex justify-center" to="/home/dashboard">
          <button
            className={`${
              locationWindow === '/home/dashboard' ? 'text-blue-500' : ''
            } ${sidebarbtn ? "justify-center" : ""} w-10/12 transition hover:text-blue-500 rounded-lg py-2 flex gap-2 items-end`}
          >
            <i className="pi pi-home" style={{ fontSize: '2rem' }}></i> <span className={`${sidebarbtn === true ?"hidden" : ''}`}>داشبورد</span>
          </button>
        </Link>
        <Link className="w-full flex justify-center" to="/home/posts">
          <button
            className={`${
              locationWindow === '/home/posts' ? 'text-blue-500' : ''
            } ${sidebarbtn ? "justify-center" : ""} w-10/12 transition hover:text-blue-500 rounded-lg py-2 flex gap-2 items-end`}
          >
            <i className="pi pi-briefcase" style={{ fontSize: '2rem' }}></i> <span className={`${sidebarbtn === true ?"hidden" : ''}`}>پست ها</span>
          </button>
        </Link>
        <Link className="w-full flex justify-center" to="/home/categories">
          <button
            className={`${
              locationWindow === '/home/categories' ? 'text-blue-500' : ''
            } ${sidebarbtn ? "justify-center" : ""} w-10/12 transition hover:text-blue-500 rounded-lg py-2 flex gap-2 items-end`}
          >
            <i className="pi pi-microsoft" style={{ fontSize: '2rem' }}></i> <span className={`${sidebarbtn === true ?"hidden" : ''}`}>دسته بندی ها</span>
          </button>
        </Link>
      </div>
    </>
  );

}

export default Sidebar;