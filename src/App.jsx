import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import TamplatePost from './Components/TamplatePost'
import Login from './Components/Login'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import Home from './Components/Home'
import Category from './Components/Category'
import Posts from './Components/Posts'
import Dashboard from './Components/Dashboard'
import EditPost from './Components/EditPost'



function App() {


  
  return (
    <>
      {/* <TamplatePost /> */}


      <Routes >



        <Route path='/home/posts/edit/:id' Component={TamplatePost}/>
        <Route path='/home/posts/create' Component={TamplatePost}/>
        <Route path='/home/categories' Component={Category} />
        <Route path='/home/posts' Component={Posts} />
        <Route path='/home/dashboard' Component={Dashboard} />
        <Route path='/home' Component={Home} />
        <Route  exact path='/' Component={Login} />



        {/* <Route path='/' Component={Home}/> */}


      </Routes >



    </>
  )
}

export default App;