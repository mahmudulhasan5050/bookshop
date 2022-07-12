import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { AppState } from '../redux/store';
import { logout } from '../redux/auth/actions';

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const userInfo = useSelector((state: AppState) => state.auth);
  const isAuthenticate = userInfo.isAuthenticate;
  const user = userInfo.user;
  const isAdmin = user?.isAdmin;
console.log("userInfo",user?.isAdmin);
  const loginButton = () => {
    navigate('/login');
  };
  const logoutButton = () => {
    dispatch(logout());
    localStorage.removeItem('access_token');
    navigate('/')
  };
const profileButton = () =>{
  if(isAuthenticate && user){
    navigate(`/profile/${user._id}`)
  }
  else{
    navigate('/login')
  }
}
const formBookButton = () =>{
  if(isAuthenticate && user){
    navigate('/formBook')
  }
  else{
    navigate('/login')
  }
}
const formAuthorButton = () =>{
  if(isAuthenticate && user){
    navigate('/formAuthor')
  }
  else{
    navigate('/login')
  }
}

  return (
   
      <AppBar position='static'>
        <Toolbar>
          <Typography variant="h6" component="div" onClick={()=> navigate('/')}>
            LIBRARY
          </Typography>
          {isAuthenticate && (<Button variant="contained" onClick={profileButton}>Profile</Button>)}
          {isAdmin && (<><Button variant="contained" onClick={formBookButton}>Create Book</Button>
          <Button variant="contained" onClick={formAuthorButton}>Create Author</Button></>)}
          <div>
            {isAuthenticate ? (
              <div>
                <Typography>{user?.name}</Typography>
                <Button color='inherit' onClick={logoutButton}>
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <Button color='inherit' onClick={loginButton}>
                  Login
                </Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>

  );
}
