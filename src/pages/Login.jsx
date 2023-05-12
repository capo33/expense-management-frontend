import React, { useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Spinner from "../components/Spinner/Spinner";
import { clearState, login } from "../redux/feature/auth/authSlice";

const Login = () => {
  const { user, isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearState());
  }, [user, dispatch]);

  //prevent for login user

 

  //from submit
  const submitHandler = async (values) => {
    try {
      dispatch(login({ userData: values, message, navigate }));
      // navigate("/");
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className='resgister-page '>
        {isLoading && <Spinner />}
        <Form layout='vertical' onFinish={submitHandler}>
          <h1>Login Form</h1>

          <Form.Item label='Email' name='email'>
            <Input type='email' />
          </Form.Item>
          <Form.Item label='Password' name='password'>
            <Input type='password' />
          </Form.Item>
          <div className='d-flex justify-content-between'>
            <Link to='/register'>Not a user ? Cleck Here to regsiter</Link>
            <button className='btn btn-primary'>Login</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
