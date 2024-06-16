import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu, Switch } from "antd";
const Dasboard = () => {
  const navigate = useNavigate();
  const items = [
    {
      key: "sub1",
      label: "Quản lý cây ",
      icon: <MailOutlined />,
      children: [
        {
          key: "1",
          label: (
            <p
              style={{ color: "black", fontWeight: "bold" }}
              onClick={() => navigate("/admin/add-tree")}
            >
              Thêm cây
            </p>
          ),
        },
        {
          key: "2",
          label: (
            <p
              style={{ color: "black", fontWeight: "bold" }}
              onClick={() => navigate("/admin/tree")}
            >
              Danh sách cây
            </p>
          ),
        },
      ],
    },
    {
      key: "sub2",
      label: "Thông tin user",
      icon: <AppstoreOutlined />,
      children: [
        {
          key: "5",
          label: (
            <p
              style={{ color: "black", fontWeight: "bold" }}
              onClick={() => navigate("/admin/user")}
            >
              Dánh sách user
            </p>
          ),
        },
      ],
    },
    {
      key: "sub3",
      label: "Quản lý tin tức",
      icon: <AppstoreOutlined />,
      children: [
        {
          key: "6",
          label: (
            <p
              style={{ color: "black", fontWeight: "bold" }}
              onClick={() => navigate("/admin/feeds")}
            >
              Dánh sách tin
            </p>
          ),
        },
        {
          key: "7",
          label: (
            <p
              style={{ color: "black", fontWeight: "bold" }}
              onClick={() => navigate("/admin/feeds-reject")}
            >
              Dánh sách chờ duyệt
            </p>
          ),
        },
      ],
    },
  ];
  const [current, setCurrent] = useState("1");
  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  return (
    <div style={{ display: "flex" }}>
      <div>
        <Menu
          onClick={onClick}
          style={{ width: 256, height: "1200px" }}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[current]}
          mode="inline"
          items={items}
        />
      </div>
      <div style={{ width: "100%" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dasboard;
