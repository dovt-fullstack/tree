import React, { useState, useEffect } from "react";
import { Breadcrumb, Layout, Row, Col, Image, Pagination, Input } from "antd";
import { Link, useParams } from "react-router-dom";
import MedicinalApi from "../api/MedicinalApi";
const { Search } = Input;
const { Header, Content } = Layout;

const MedicinalWithDisease = () => {
  const { id } = useParams();
  const [medicinals, setMedicinals] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(1);

  useEffect(() => {
    const fetchMedicinals = async () => {
      try {
        const data = await MedicinalApi.getByDiseaseId(
          id,
          currentPage,
          pageSize
        );
        setMedicinals(data.data);
        setTotal(data.total);
      } catch (error) {
        console.error("Error fetching medicinals:", error);
      }
    };

    fetchMedicinals();
  }, [currentPage, pageSize]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <Layout className="layout">
      <Content
        style={{
          padding: "0 50px",
          marginTop: "25px",
          backgroundColor: "white",
          justifyContent: "center",
        }}
      >
        <Breadcrumb style={{ marginBottom: "16px" }}>
          <Breadcrumb.Item>
            <Link to="/">Trang chủ</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/list">Dược liệu theo bệnh</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Content>
      <Content
        style={{
          padding: "0 50px",
          marginTop: "25px",
          backgroundColor: "white",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Tất cả Dược Liệu</h1>
        <div className="site-layout-content">
          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 30]}>
            {medicinals.map((medicinal) => (
              <Col key={medicinal._id} xs={24} sm={12} md={8} lg={8}>
                <div style={{ textAlign: "center" }}>
                  <Image
                     style={{ width: "356px", height: "240px" }}
                     className="attachment-image-medium size-image-medium wp-post-image ls-is-cached lazyloaded"
                    src={medicinal.imageUrl}
                    alt={medicinal.name}
                  />
                  <Link to={`/medicinal/${medicinal._id}`}>
                    <p style={{ fontWeight: "bold" }}>{medicinal.name}</p>
                  </Link>
                </div>
              </Col>
            ))}
          </Row>
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
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
        </div>
      </Content>
    </Layout>
  );
};

export default MedicinalWithDisease;
