import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import axios from "axios";

import Spinner from "../components/Spinner/Spinner";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        values
      );
       setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error(error.response.data.message );
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div className='resgister-page '>
        {loading && <Spinner />}
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
