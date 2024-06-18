import { Button, Drawer, Form, Input, Pagination, Select, Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { toast } from "react-toastify";
const { Option } = Select;
const ManagerTree = () => {
  const [dataTree, setDataTree] = useState([]);
  const [searchParams] = useSearchParams();
  const idTree = searchParams.get("idTree");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(1);
  const [form] = Form.useForm();
  const [dataTreeId, setDataTreeId] = useState();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState();
  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };
  useEffect(() => {
    const handelFetch = async () => {
      const { data } = await axios.get(
        "http://localhost:8080/api/medicinal/getById/" + idTree
      );
      setDataTreeId(data.data);
    };
    if (idTree) {
      handelFetch();
    }
  }, [idTree]);
  const handelFetch = async () => {
    const { data } = await axios.get(
      "http://localhost:8080/api/disease/getAll"
    );
    setCategories(data.data);
    console.log(data, "c");
  };
  useEffect(() => {
    handelFetch();
  }, [currentPage, pageSize]);
  const fetchData = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/api/medicinal/getAll?page=${currentPage}&limit=${pageSize}`
    );
    setDataTree(data.data);
    setTotal(data.total);
    console.log(data);
  };
  console.log(dataTree, "dataTree");
  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);
  const onFinish = async (values) => {
    const valueEdit = {
      name: values?.name,
      description: values?.desc,
      diseaseGroupId: values?.nameB,
      courseName: values?.courseName,
      vietnameseName: values?.nameVn,
      family: values?.family,
      utility: values?.congdung,
      ecology: values?.sinhthai,
      distribution: values?.phanbo,
      usedPart: values?.psudung,
      imageUrl: formData,
      cc1 : values?.cc1,
      cc2 : values?.cc2
    };
    await axios.post(
      "http://localhost:8080/api/edit-tree/" + idTree,
      valueEdit
    );
    handelFetch();
    fetchData();
    onClose();
    toast.success("sửa thành công");
  };
  console.log(dataTreeId, "dataTreeId");
  idTree &&
    form.setFieldsValue({
      name: dataTreeId?.name,
      desc: dataTreeId?.description,
      nameB: dataTreeId?.diseaseGroupId,
      courseName: dataTreeId?.courseName,
      nameVn: dataTreeId?.vietnameseName,
      family: dataTreeId?.family,
      congdung: dataTreeId?.utility,
      sinhthai: dataTreeId?.ecology,
      phanbo: dataTreeId?.distribution,
      psudung: dataTreeId?.usedPart,
      cc1: dataTreeId?.cc1,
      cc2: dataTreeId?.cc2

    });
  const navigate = useNavigate();
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
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
  const onClose = () => {
    setOpen(false);
  };
  const dataSource = dataTree?.map((items, index) => ({
    key: items._id,
    stt: index + 1,
    name: items.name,
    imageUrl: items.imageUrl,
    status: items.status,
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        return (
          <>
            {status ? (
              <Tag color="green">Hoạt động</Tag>
            ) : (
              <Tag color="red">Đã ẩn</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Ảnh ",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (items) => {
        return <img style={{ width: "100px" }} src={items} />;
      },
    },
    {
      title: "Hành động",
      render: ({ key, status }) => {
        return (
          <div className="space-x-5">
            <Button
              onClick={async () => {
                if (window.confirm("bạn có chắc muốn xoá")) {
                  await axios.delete(
                    "http://localhost:8080/api/medicinal/" + key
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
            <Button
              onClick={() => {
                navigate({
                  search: createSearchParams({
                    idTree: key,
                  }).toString(),
                });
                showDrawer();
              }}
              style={{ backgroundColor: "blue", color: "white" }}
            >
              Sửa
            </Button>
            {status == true ? (
              <Button
                onClick={async () => {
                  const data = {
                    status: false,
                  };
                  if (window.confirm("bạn có chắc muốn ẩn")) {
                    await axios.post(
                      "http://localhost:8080/api/updated-medicinals/" + key,
                      data
                    );
                    setTimeout(() => {
                      fetchData();
                    }, 250);
                  }
                }}
                style={{ backgroundColor: "red", color: "white" }}
              >
                Ẩn
              </Button>
            ) : (
              <Button
                onClick={async () => {
                  const data = {
                    status: true,
                  };
                  if (window.confirm("bạn có chắc muốn duyệt")) {
                    await axios.post(
                      "http://localhost:8080/api/updated-medicinals/" + key,
                      data
                    );
                    setTimeout(() => {
                      fetchData();
                    }, 250);
                  }
                }}
                style={{ backgroundColor: "green", color: "white" }}
              >
                Duyệt
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Drawer width={776} title="Chi tiết cây" onClose={onClose} open={open}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: "700px" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="nameB"
            label="Nhóm bệnh"
            rules={[
              { required: true, message: "Danh mục bài viết là bắt buộc" },
            ]}
          >
            <Select placeholder="Danh mục bài viết" size="large">
              {categories.map((category) => (
                <Option value={category._id} key={category._id}>
                  <span className="text-sm capitalize">{category.name}</span>
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="courseName"
            name="courseName"
            rules={[
              { required: true, message: "Please input your courseName!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Please input your Tên!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Tên tiếng Việt"
            name="nameVn"
            rules={[
              { required: true, message: "Please input your Tên tiếng Việt!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Gia đình"
            name="family"
            rules={[{ required: true, message: "Please input your Gia đình!" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Công dụng"
            name="congdung"
            rules={[
              { required: true, message: "Please input your Công dụng!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="desc"
            rules={[{ required: true, message: "Please input your Mô tả!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Sinh thái"
            name="sinhthai"
            rules={[
              { required: true, message: "Please input your Sinh thái!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Phân bố"
            name="phanbo"
            rules={[{ required: true, message: "Please input your Phân bố!" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Phần sử dụng"
            name="psudung"
            rules={[
              { required: true, message: "Please input your Phần sử dụng!" },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="ảnh" name="image">
            <Input type="file" onChange={handleImageChange} />
          </Form.Item>

          <Form.Item label="Thành phần hóa học" name="cc1">
              <Input  name="cc1" />
            </Form.Item>
            <Form.Item label="Tính vị" name="cc2">
              <Input  name="cc2" />
            </Form.Item>
          <Form.Item>
            <div style={{ paddingLeft: "50px" }}>
              <img src={dataTreeId?.imageUrl} style={{ width: "70px" }} />
            </div>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
      <h2 style={{ padding: "10px" }}>Danh sách cây</h2>
      <Table dataSource={dataSource} columns={columns} pagination={false}/>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={handlePageChange} // Callback khi chuyển trang
        showSizeChanger={true} // Cho phép thay đổi kích thước trang
        onShowSizeChange={handlePageChange} // Callback khi thay đổi kích thước trang
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
      />
    </div>
  );
};

export default ManagerTree;
