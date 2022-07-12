import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { User } from '../type/types';
import { loginSuccess } from '../redux/auth/actions';
import { googleLoginApi } from '../api-axios';
import {AccessTokenType} from '../type/types'


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const responseGoogle = async (response: any) => {
    const tokenId = response?.tokenId;
    const googleToken = { id_token: tokenId };
    const res = await googleLoginApi(googleToken);
    const { user, token } = res.data;

    if (res.status === 200) {
      navigate('/');
    }
    const accessToken = { user, token };
    localStorage.setItem('access_token', JSON.stringify(accessToken));

    dispatch(loginSuccess(user));
  };

  return (
    <div>
      <h1>Login</h1>
      <GoogleLogin
        clientId='1087861861596-vtstrr7nbu7ut3s1l5k9kpclgiq16gov.apps.googleusercontent.com'
        buttonText='Login'
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </div>
  );
};

export default Login;
