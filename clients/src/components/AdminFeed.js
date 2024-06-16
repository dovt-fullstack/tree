import { Button, Drawer, Table, Checkbox, Form, Input, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";

const AdminFeed = () => {
  const [searchParams] = useSearchParams();
  const idUser = searchParams.get("id");
  const [form] = Form.useForm();
  const [dataTree, setDataTree] = useState([]);
  const [dataDetailsUser, setDataDetailsUser] = useState();
  const [formData, setFormData] = useState();

  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:8080/api/get-all-feeds");
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
  const userLocal = JSON.parse(localStorage.getItem("user"));

  idUser &&
    form.setFieldsValue({
      username: dataDetailsUser?.name,
      email: dataDetailsUser?.email,
      phone: dataDetailsUser?.phone,
      role: dataDetailsUser?.role,
    });
  console.log(dataTree, "dataTree");
  const dataSource = dataTree
    ?.filter((ic) => ic.status == true)
    .map((items, index) => ({
      key: items._id,
      stt: index + 1,
      name: items.name,
      email: items.image,
      phone: items.user?.name,
      role: items.status,
    }));
  const columns = [
    {
      title: "#",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tiêu đề",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh",
      dataIndex: "email",
      key: "email",
      render: (email) => {
        return <img src={email} style={{ width: "80px" }} />;
      },
    },
    {
      title: "Người đăng",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Trạng thái",
      dataIndex: "role",
      key: "role",
      render: (email) => {
        return (
          <div>
            {email ? (
              <Tag color="green">Đã duyệt</Tag>
            ) : (
              <Tag color="red">Chờ duyệt</Tag>
            )}
          </div>
        );
      },
    },
    {
      title: "Hành động",
      render: ({ key }) => {
        return (
          <div className="space-x-5">
            <Button
              onClick={async () => {
                if (window.confirm("bạn có chắc muốn xoá")) {
                  await axios.post(
                    "http://localhost:8080/api/remove-newFeed/" + key
                  );
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
            {/* <Button
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
            </Button> */}
            <Button
              onClick={async () => {
                const data = {
                  status: false,
                };
                if (window.confirm("bạn có chắc muốn ẩn")) {
                  await axios.post(
                    "http://localhost:8080/api/updated-newFeed/" + key,
                    data
                  );
                  setTimeout(() => {
                    fetchData();
                  }, 250);
                }
              }}
              style={{ backgroundColor: "orange", color: "white" }}
            >
              Ẩn bài đăng
            </Button>
          </div>
        );
      },
    },
  ];
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const onFinish = async (values) => {
    const dataCreate = {
      name: values.username,
      description: values.password,
      image: formData,
      status: true,
    };
    await axios.post(
      "http://localhost:8080/api/create-newFeed/" + userLocal.user._id,
      dataCreate
    );
    fetchData()
    onClose();
    toast.success("Tạo bài thành công , admin sẽ xem xét và duyệt bài của bạn");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
         <Drawer width={500} title="Tạo tin tức mới" onClose={onClose} open={open}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tiêu đề"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Ảnh" name="image">
            <Input type="file" onChange={handleImageChange} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'25px', padding:'20px'}}>
    <h2 style={{ padding: "10px" }}>Danh sách đã duyệt</h2>
      <Button style={{backgroundColor:'green',color:'white'}}  onClick={showDrawer}>Tạo mới tin</Button>
    </div>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default AdminFeed;
