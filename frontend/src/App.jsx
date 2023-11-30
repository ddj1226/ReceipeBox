import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import CreateReceipe from './pages/CreateReceipe';
import DeleteReceipe from './pages/DeleteReceipe';
import ShowReceipe from './pages/ShowReceipe';
import EditReceipe from './pages/EditReceipe';

const App = () => {
  return (
    <Routes>
    <Route path ='/' element={<Home />} />
    <Route path ='/receipe/create' element={<CreateReceipe />} />
    <Route path ='/receipe/details/:id' element={<ShowReceipe />} />
    <Route path ='/receipe/edit/:id' element={<EditReceipe />} />
    <Route path ='/receipe/delete/:id' element={<DeleteReceipe />} />
    </Routes>
  )
}

export default App