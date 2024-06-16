import React, { useState, useEffect } from "react";
import { Breadcrumb, Layout, Row, Col, Image } from "antd";
import { Link } from "react-router-dom";
import MedicinalApi from "../api/MedicinalApi";
import DiseaseGroupApi from "../api/DiseaseGroupApi";

const { Header, Content } = Layout;
const banCanBiet = [
  {
    img: "https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box2.jpg",
    name: "Danh lục cây thuốc",
  },
  {
    img: "https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box1.jpg",
    name: "Tra cứu cây thuốc",
  },
  {
    img: "https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box3.jpg",
    name: "Tra cứu theo bệnh",
  },
  {
    img: "https://tracuuduoclieu.vn/wp-content/uploads/2020/11/vi-thuoc-1.jpg",
    name: "Tra cứu vị thuốc",
  },
  {
    img: "https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box4.jpg",
    name: "Tra cứu bài thuốc",
  },
];

const DiseaseGroup = () => {
  const [medicinals, setMedicinals] = useState([]);
  const [diseaseGroup, setdiseaseGroup] = useState([]);

  useEffect(() => {
    const fetchMedicinals = async () => {
      try {
        const data = await DiseaseGroupApi.getAll();
        setdiseaseGroup(data.data);
      } catch (error) {
        console.error("Error fetching medicinals:", error);
      }
    };

    fetchMedicinals();
  }, []);

  return (
    <Layout className="layout">
      <Content
        style={{
          padding: "0 50px",
          marginTop: "25px",
          backgroundColor: "white",
          justifyContent: "center",
        }}
      ></Content>
      <Content
        style={{
          padding: "0 50px",
          marginTop: "25px",
          backgroundColor: "white",
        }}
      >
        <h1 style={{ textAlign: "center" }}>Dược Liệu theo bệnh</h1>
        <h3 style={{ textAlign: "center" }}>Tra cứu theo bệnh</h3>
        <div className="site-layout-content">
          <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 30]}>
            {diseaseGroup.map((disease) => (
              <Col key={disease._id} xs={24} sm={12} md={8} lg={8}>
                <div style={{ textAlign: "center" }}>
                  <Image
                    style={{ width: "356px", height: "240px" }}
                    className="attachment-image-medium size-image-medium wp-post-image ls-is-cached lazyloaded"
                    src={disease.imageUrl}
                    alt={disease.name}
                  />
                  <Link to={`/medicinalwithdisease/${disease._id}`}>
                    <h3 className="widget-item-title">{disease.name}</h3>
                  </Link>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
      <div id="content-knows">
        <div className="wrap">
          <section id="ads_widget-2" className="widget caia_ads_widget">
            <div className="widget-wrap">
              <h4 className="widget-title widgettitle">Bạn cần biết</h4>{" "}
              <div className="ads_content_widget" />{" "}
            </div>
          </section>
          <section id="image-upload-widget-3" className="widget image-upload">
            <div className="widget-wrap">
              <div className="mainposts">
                <a
                  href="https://tracuuduoclieu.vn/danh-luc-cay-thuoc/"
                  className="alignnone"
                >
                  <img
                    className=" ls-is-cached lazyloaded"
                    data-src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box2.jpg"
                    alt="box2"
                    src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box2.jpg"
                  />
                </a>
                <h2>
                  <a href="https://tracuuduoclieu.vn/danh-luc-cay-thuoc/">
                    Danh lục cây thuốc
                  </a>
                </h2>
              </div>
            </div>
          </section>
          <section id="image-upload-widget-2" className="widget image-upload">
            <div className="widget-wrap">
              <div className="mainposts">
                <a
                  href="https://tracuuduoclieu.vn/tra-cuu-duoc-lieu/"
                  className="alignnone"
                >
                  <img
                    className=" ls-is-cached lazyloaded"
                    data-src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box1.jpg"
                    alt="box1"
                    src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box1.jpg"
                  />
                </a>
                <h2>
                  <a href="https://tracuuduoclieu.vn/tra-cuu-duoc-lieu/">
                    Tra cứu cây thuốc
                  </a>
                </h2>
              </div>
            </div>
          </section>
          <section id="image-upload-widget-4" className="widget image-upload">
            <div className="widget-wrap">
              <div className="mainposts">
                <a
                  href="https://tracuuduoclieu.vn/tra-cuu-theo-benh/"
                  className="alignnone"
                >
                  <img
                    className=" lazyloaded"
                    data-src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box3.jpg"
                    alt="box3"
                    src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box3.jpg"
                  />
                </a>
                <h2>
                  <a href="https://tracuuduoclieu.vn/tra-cuu-theo-benh/">
                    Tra cứu theo bệnh
                  </a>
                </h2>
              </div>
            </div>
          </section>
          <section id="image-upload-widget-9" className="widget image-upload">
            <div className="widget-wrap">
              <div className="mainposts">
                <a
                  href="https://tracuuduoclieu.vn/tra-cuu-vi-thuoc"
                  className="alignnone"
                >
                  <img
                    className=" lazyloaded"
                    data-src="https://tracuuduoclieu.vn/wp-content/uploads/2020/11/vi-thuoc-1.jpg"
                    alt="vi-thuoc"
                    src="https://tracuuduoclieu.vn/wp-content/uploads/2020/11/vi-thuoc-1.jpg"
                  />
                </a>
                <h2>
                  <a href="https://tracuuduoclieu.vn/tra-cuu-vi-thuoc">
                    Tra cứu vị thuốc
                  </a>
                </h2>
              </div>
            </div>
          </section>
          <section id="image-upload-widget-5" className="widget image-upload">
            <div className="widget-wrap">
              <div className="mainposts">
                <a
                  href="https://tracuuduoclieu.vn/tra-cuu-bai-thuoc/"
                  className="alignnone"
                >
                  <img
                    className=" lazyloaded"
                    data-src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box4.jpg"
                    alt="box4"
                    src="https://tracuuduoclieu.vn/wp-content/uploads/2018/11/box4.jpg"
                  />
                </a>
                <h2>
                  <a href="https://tracuuduoclieu.vn/tra-cuu-bai-thuoc/">
                    Tra cứu bài thuốc
                  </a>
                </h2>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default DiseaseGroup;
