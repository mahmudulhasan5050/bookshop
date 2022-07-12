import { Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Auth from './components/admin/Auth';
import AppBar from './components/AppBar';
import FormBook from './components/admin/FormBook';
import FormAuthor from './components/admin/FormAuther';
import BorrowBookForm from './pages/BorrowBookForm';

function App() {
  return (
    <div className='App'>
      <AppBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/formBook'
          element={
            <Auth>
              <FormBook />
            </Auth>
          }
        />
        <Route
          path='/formAuthor'
          element={
            <Auth>
              <FormAuthor />
            </Auth>
          }
        />
        <Route
          path='/profile/:userId'
          element={
            <Auth>
              <Profile />
            </Auth>
          }
        />
        <Route
          path='/borrow'
          element={
            <Auth>
              <BorrowBookForm />
            </Auth>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
