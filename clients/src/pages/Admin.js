import React, { useState, useEffect } from "react";
import { Layout, Form, Input, Button, Breadcrumb, Select } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const { Content } = Layout;
const { Option } = Select;

const AddMedicinal = () => {
  const [groups, setGroups] = useState([]); // State để lưu trữ danh sách nhóm bệnh
  const [formData, setFormData] = useState({
    name: "",
    vietnameseName: "",
    courseName: "",
    family: "",
    utility: "",
    description: "",
    ecology: "",
    distribution: "",
    usedPart: "",
    imageUrl: "",
    diseaseGroupId: "", // Đây là ID của nhóm bệnh
    cc1 :"",
    cc2 :"",
  });

  useEffect(() => {
    // Fetch danh sách nhóm bệnh từ API khi component được render
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8080/api/disease/getall"
        );
        if (response.data.success) {
          // Lưu danh sách nhóm bệnh vào state
          setGroups(response.data.data);
        }
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy danh sách nhóm bệnh:", error);
      }
    };
    fetchGroups();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      diseaseGroupId: value, // Cập nhật ID của nhóm bệnh khi được chọn từ select
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imageUrl: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/medicinal/create",
        formData
      );
      console.log("Thêm mới thành công");
      toast.success("Created");
      setTimeout(() => {
        window.location.reload();
      }, 350);
    } catch (error) {
      console.error("Đã xảy ra lỗi khi thêm mới dược liệu:", error);
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
          <Breadcrumb.Item>Thêm mới dược liệu</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content" style={{ textAlign: "center" }}>
          <h1>Thêm mới dược liệu</h1>
          <Form
            style={{ maxWidth: "600px", margin: "0 auto" }}
            onFinish={handleSubmit}
          >
            {/* Trường select để chọn nhóm bệnh */}
            <Form.Item label="Nhóm bệnh" name="diseaseGroupId">
              <Select onChange={handleSelectChange}>
                {groups.map((group) => (
                  <Option key={group._id} value={group._id}>
                    {group.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {/* Các trường nhập liệu khác */}
            <Form.Item
              label="courseName"
              name="courseName"
              rules={[{ required: true }]}
            >
              <Input name="courseName" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Tên" name="name" rules={[{ required: true }]}>
              <Input name="name" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Tên tiếng Việt" name="vietnameseName">
              <Input name="vietnameseName" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Gia đình" name="family">
              <Input name="family" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Công dụng" name="utility">
              <Input name="utility" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
              <Input.TextArea name="description" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Sinh thái" name="ecology">
              <Input name="ecology" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Phân bố" name="distribution">
              <Input name="distribution" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Phần sử dụng" name="usedPart">
              <Input name="usedPart" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Đường dẫn hình ảnh" name="imageUrl">
              <Input type="file" name="imageUrl" onChange={handleImageChange} />
            </Form.Item>
            <Form.Item label="Thành phần hóa học" name="cc1">
              <Input  onChange={handleChange} name="cc1" />
            </Form.Item>
            <Form.Item label="Tính vị" name="cc2">
              <Input onChange={handleChange}  name="cc2" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Thêm mới
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default AddMedicinal;
