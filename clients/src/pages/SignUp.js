import React, { useState } from "react";
import { Layout, Form, Input, Button, Breadcrumb, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Content } = Layout;

const Signup = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [redirect, setRedirect] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      const response = await fetch("http://127.0.0.1:8080/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (response.status === 201) {
        message.success("Đăng ký thành công");
        setRedirect(true);
        navigate("/login")
      } else {
        // Xử lý lỗi nếu cần
        message.success("Đăng ký không thành công");
        console.error("Đăng ký không thành công");
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
          <Breadcrumb.Item>
            <Link to="/">Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Đăng ký</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content" style={{ textAlign: "center" }}>
          <h1>Đăng ký</h1>
          <Form
            style={{ maxWidth: "300px", margin: "0 auto" }}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Tên"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input name="name" onChange={handleChange} />
            </Form.Item>

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
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
              ]}
            >
              <Input name="phone" onChange={handleChange} />
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
                Đăng ký
              </Button>
              <Button
                style={{ marginLeft: "20px" }}
                onClick={() => navigate("/login")}
                type="primary"
                htmlType="button"
              >
                Quay lại
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default Signup;
