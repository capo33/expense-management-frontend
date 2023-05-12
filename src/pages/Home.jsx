import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import Layout from "./../components/Layout/Layout";
import moment from "moment";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import {
  addTransection,
  clearState,
  deleteTransection,
  getAllTransections,
} from "./../redux/feature/transection/transectionSlice";

import Spinner from "./../components/Spinner/Spinner";

const { RangePicker } = DatePicker;

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedate] = useState([]);
  const [type, setType] = useState("all");

  const { isError, isSuccess, isLoading, transections } = useSelector(
    (state) => state.transection
  );
  const { user } = useSelector((state) => state.auth);
  console.log("user", user?.token);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getAllTransections({
        userId: user?._id,
        token: user?.token,
        message,
      })
    );
  }, [dispatch, user?.token, user?._id]);

  const handleFilter = (e) => {
    // const user = JSON.parse(localStorage.getItem("user"));
    // console.log("user", user);
    // const target = e.target;
    // const value = target.innerText;
    // console.log("value", value);
    // if (value === "all") {
    //   setAllTransection(allTransection);
    //   return;
    // }
    // const updatedItems = allTransection?.filter((item) => {
    //   return item.type === value;
    // });
    // console.log("updatedItems", updatedItems);
    // setAllTransection(updatedItems);
    // setType(value);
  };

  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
    },
  ];

  //getall transactions

  //useEffect Hook
  // const getAllTransactions = async () => {
  //   try {
  //     const user = JSON.parse(localStorage.getItem("user"));
  //     setLoading(true);
  //     const res = await axios.get("http://localhost:5000/api/v1/transections", {
  //       // userId: user.data._id,
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     });
  //     setLoading(false);
  //     setAllTransection(res.data.data);
  //   } catch (error) {
  //     console.log(error);
  //     message.error("Ftech Issue With Tranction");
  //   }
  // };
  // useEffect(() => {
  //   getAllTransactions();
  // }, []);

  // form handling
  const handleSubmit = async (transectionData) => {
    dispatch(
      addTransection({
        ...transectionData,
        token: user?.token,
        message,
      })
    );
    // try {
    //   const user = JSON.parse(localStorage.getItem("user"));
    //   console.log("user.data._id", user.data._id);
    //   setLoading(true);
    //   await axios.post(
    //     "http://localhost:5000/api/v1/transections",
    //     {
    //       ...values,
    //       userId: user.data._id,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${user.token}`,
    //       },
    //     }
    //   );
    //   getAllTransactions();
    //   setLoading(false);
    //   message.success("Transaction Added Successfully");
    //   setShowModal(false);
    // } catch (error) {
    //   setLoading(false);
    //   message.error(error.response.data.message);
    // }
  };

  return (
    // <Layout>

    // <h1>ok</h1>
    // </Layout>

    <Layout>
      {/* {isLoading && <Spinner />} */}
      <div className='filters'>
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value='7'>LAST 1 Week</Select.Option>
            <Select.Option value='30'>LAST 1 Month</Select.Option>
            <Select.Option value='365'>LAST 1 year</Select.Option>
            <Select.Option value='custom'>custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>
        <div>
          <h6>Select Type</h6>
          <div onClick={handleFilter}>all</div>
          <div onClick={handleFilter}>income</div>
          <div onClick={handleFilter}>expense</div>
          {/* <select value={type} onChange={(values) => setType(values)} >
            <option
              value='all'
              onClick={() => {
                setType("all");
                setAllTransection(allTransection.data);
              }}
            >
              all
            </option>
            <option value='income' onClick={handleFilter}>
              income
            </option>
            <option value='expense' onClick={handleFilter}>
              expense
            </option>

          </select> */}
          {/* <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option
              value='all'
              onClick={() => {
                setType("all");
                setAllTransection(allTransection.data);
              }}
            >
              ALL
            </Select.Option>
            <Select.Option
              value='income'
              onClick={handleFilter}
            >
              INCOME
            </Select.Option>
            <Select.Option value='expense' onClick={handleFilter}>
              EXPENSE
            </Select.Option>
          </Select> */}
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>
        <div>
          <button
            className='btn btn-primary'
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className='content'>
        <Table
          columns={columns}
          dataSource={transections}
          //  dataSource={allTransection}
          rowKey={(record) => record._id}
          pagination={false}
        />
      </div>

      <Modal
        title='Add Transection'
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form layout='vertical' onFinish={handleSubmit}>
          <Form.Item label='Amount' name='amount'>
            <Input type='text' />
          </Form.Item>
          <Form.Item label='type' name='type'>
            <Select>
              <Select.Option value='income'>Income</Select.Option>
              <Select.Option value='expense'>Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Category' name='category'>
            <Select>
              <Select.Option value='salary'>Salary</Select.Option>
              <Select.Option value='tip'>Tip</Select.Option>
              <Select.Option value='project'>Project</Select.Option>
              <Select.Option value='food'>Food</Select.Option>
              <Select.Option value='movie'>Movie</Select.Option>
              <Select.Option value='bills'>Bills</Select.Option>
              <Select.Option value='medical'>Medical</Select.Option>
              <Select.Option value='fee'>Fee</Select.Option>
              <Select.Option value='tax'>TAX</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label='Date' name='date'>
            <Input type='date' />
          </Form.Item>
          <Form.Item label='Refrence' name='refrence'>
            <Input type='text' />
          </Form.Item>
          <Form.Item label='Description' name='description'>
            <Input type='text' />
          </Form.Item>
          <div className='d-flex justify-content-end'>
            <button type='submit' className='btn btn-primary'>
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Home;
