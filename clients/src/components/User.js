import { Button, Drawer, Table, Checkbox, Form, Input } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
const User = () => {
  const [searchParams] = useSearchParams();
  const idUser = searchParams.get("id");
  const [form] = Form.useForm();
  const [dataTree, setDataTree] = useState([]);
  const [dataDetailsUser, setDataDetailsUser] = useState();
  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:8080/api/get-all-user");
    setDataTree(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const fetchDatails = async () => {
      const { data } = await axios.get(
        "http://localhost:8080/api/getuser/" + idUser
      );
      setDataDetailsUser(data);
    };
    if (idUser) {
      fetchDatails();
    }
  }, [idUser]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  console.log(dataDetailsUser, "dataDetailsUser");
  idUser &&
    form.setFieldsValue({
      username: dataDetailsUser?.name,
      email: dataDetailsUser?.email,
      phone: dataDetailsUser?.phone,
      role: dataDetailsUser?.role,
    });
  const dataSource = dataTree?.map((items, index) => ({
    key: items._id,
    stt: index + 1,
    name: items.name,
    email: items.email,
    phone: items.phone,
    role: items.role,
  }));
  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Hành động",
      render: ({ key }) => {
        return (
          <div className="space-x-5">
            <Button
              onClick={async () => {
                if (window.confirm("bạn có chắc muốn xoá")) {
                  await axios.post("http://localhost:8080/delete-user/" + key);
                  setTimeout(() => {
                    fetchData();
                  }, 250);
                }
              }}
              style={{ backgroundColor: "red", color: "white" }}
              className="bg-red-500"
            >
              Xoá
            </Button>
            <Button
              onClick={() => {
                navigate({
                  search: createSearchParams({
                    id: key,
                  }).toString(),
                });
                showDrawer();
              }}
              style={{ backgroundColor: "blue", color: "white" }}
            >
              Sửa
            </Button>
          </div>
        );
      },
    },
  ];
  const onFinish = async (values) => {
    try {
      const data = {
        name: values.username,
        email: values.email,
        phone: values.phone,
      };
      await axios.post("http://localhost:8080/api/edit-user/" + idUser, data);
      toast.success("Updated");
      onClose();
      setTimeout(() => {
        fetchData();
      }, 250);
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <div>
        <Drawer title="Basic Drawer" onClose={onClose} open={open}>
          <Form
            name="basic"
            form={form}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="phone"
              name="phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
        <h2 style={{ padding: "10px" }}>Danh sách user</h2>
        <Table dataSource={dataSource} columns={columns} />;
      </div>
    </div>
  );
};

export default User;
