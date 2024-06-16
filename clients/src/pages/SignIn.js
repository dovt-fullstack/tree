import React, { useState } from "react";
import { Layout, Form, Input, Button, Breadcrumb, message } from "antd";
import { Link } from "react-router-dom";
const { Content } = Layout;

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      const response = await fetch("http://127.0.0.1:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const userData = await response.json();
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem("user", JSON.stringify(userData));
        // Chuyển hướng đến trang sau khi đăng nhập thành công
        window.location.href = "/"; // Thay đổi "/dashboard" thành đường dẫn mong muốn
      } else {
        message.error("Đăng nhập không thành công");
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi:", error);
    }
  };

  return (
    <Layout className="layout">
      <Content
        style={{
          padding: "0 50px",
          marginTop: "25px",
          backgroundColor: "white",
        }}
      >
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Đăng nhập</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content" style={{ textAlign: "center" }}>
          <h1>Đăng nhập</h1>
          <Form
            style={{ maxWidth: "300px", margin: "0 auto" }}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập địa chỉ email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input name="email" onChange={handleChange} />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password name="password" onChange={handleChange} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>
              <Button type="" style={{ marginLeft: "15px" }}>
                <Link to="/signup">Đăng ký</Link>
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default Login;
