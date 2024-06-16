import { Button, Drawer, Table, Checkbox, Form, Input, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

const AdminReject = () => {
  const [searchParams] = useSearchParams();
  const idUser = searchParams.get("id");
  const [form] = Form.useForm();
  const [dataTree, setDataTree] = useState([]);
  const [dataDetailsUser, setDataDetailsUser] = useState();
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
  idUser &&
    form.setFieldsValue({
      username: dataDetailsUser?.name,
      email: dataDetailsUser?.email,
      phone: dataDetailsUser?.phone,
      role: dataDetailsUser?.role,
    });
  console.log(dataTree, "dataTree");
  const dataSource = dataTree
    ?.filter((ic) => ic.status !== true)
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
                  status: true,
                };
                if (window.confirm("bạn có chắc muốn duyệt")) {
                  await axios.post(
                    "http://localhost:8080/api/updated-newFeed/" + key,
                    data
                  );
                  setTimeout(() => {
                    fetchData();
                  }, 250);
                }
              }}
              style={{ backgroundColor: "green", color: "white" }}
            >
              duyệt bài đăng
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <h2 style={{ padding: "10px" }}>Danh sách đã duyệt</h2>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};

export default AdminReject;
