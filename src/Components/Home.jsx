import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Category from './Category';
import Dashboard from './Dashboard';
import Posts from './Posts';
// import Login from './Login';
import Header from './Header';


function Home() {
    return (<>

        <Header />
        
        {/* <Category/> */}

    </>);
}

export default Home;